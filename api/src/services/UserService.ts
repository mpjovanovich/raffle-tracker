import { PrismaClient, User } from '.prisma/client';
import { User as UserDTO } from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';

export class UserService extends BaseService<User, UserDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'user');
  }

  public static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      password: user.password ?? undefined,
      email: user.email,
      verified: user.verified ? 1 : 0,
      token: user.token ?? undefined,
      tokenExpiry: user.token_expiry?.toISOString() ?? undefined,
    };
  }

  protected static toPrisma(user: UserDTO): User {
    return {
      id: user.id,
      username: user.username,
      password: user.password ?? null,
      email: user.email,
      verified: user.verified === 1,
      token: user.token ?? null,
      token_expiry: user.tokenExpiry ? new Date(user.tokenExpiry) : null,
    };
  }
}
