import { PrismaClient, User } from '.prisma/client';
import { generateToken, verifyToken } from '@/utils/authUtility.js';
import { CreateUserRequest, ROLE, User as UserDTO } from '@raffle-tracker/dto';
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
      tokenExpiry: user.token_expiry?.toISOString() ?? undefined, // Probably going away, don't think we need this.
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
      token_expiry: user.tokenExpiry ? new Date(user.tokenExpiry) : null, // Probably going away, don't think we need this.
    };
  }

  private async checkUserExists(
    tx: PrismaClient,
    username: string,
    email: string
  ): Promise<boolean> {
    let existingUser = await tx.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return true;
    }
    existingUser = await tx.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return true;
    }
    return false;
  }

  private async fetchUserByToken(token: string): Promise<User> {
    const decoded = await verifyToken(token);
    const userId = parseInt(decoded.userId);

    const user = await this.prisma.user.findFirst({
      where: { id: userId, token },
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  private isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(email);
  }

  public async createUser(userRequest: CreateUserRequest): Promise<UserDTO> {
    if (!userRequest.username || !userRequest.email) {
      throw new Error('Username and email are required');
    }

    if (
      await this.checkUserExists(
        this.prisma,
        userRequest.username,
        userRequest.email
      )
    ) {
      throw new Error('Username or email already in use');
    }

    if (!this.isValidEmail(userRequest.email)) {
      throw new Error('Invalid email format');
    }

    const createdUser = await this.prisma.$transaction(async tx => {
      let user = await tx.user.create({
        data: {
          username: userRequest.username,
          email: userRequest.email,
          verified: false,
          roles: {
            connect: [
              {
                name: ROLE.VIEWER,
              },
            ],
          },
        },
      });
      const token = await generateToken(user.id, 'auth');
      user = await tx.user.update({
        where: { id: user.id },
        data: { token },
      });
      return user;
    });
    return UserService.toDTO(createdUser);
  }

  public async exchangeToken(
    token: string,
    tokenType: string
  ): Promise<UserDTO> {
    const user = await this.fetchUserByToken(token);
    const newToken = await generateToken(user.id, tokenType);
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { token: newToken },
    });
    return UserService.toDTO(updatedUser);
  }
}
