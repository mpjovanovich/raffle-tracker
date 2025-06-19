import { PrismaClient, User } from '.prisma/client';
import { TOKEN_TYPE, TokenType } from '@/types/TokenType.js';
import {
  generateToken,
  hashPassword,
  TokenPayload,
  verifyPassword,
  verifyToken,
} from '@/utils/authUtility.js';
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
    const decoded = (await verifyToken(token)) as TokenPayload;
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

      const token = await generateToken(user.id, TOKEN_TYPE.AUTH);
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
    tokenType: TokenType
  ): Promise<User> {
    const user = await this.fetchUserByToken(token);
    const newToken = await generateToken(user.id, tokenType);
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { token: newToken },
    });
    return updatedUser;
  }

  public async login(
    username: string,
    password: string
  ): Promise<{ user: UserDTO; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new Error('User not found');
    if (!user.password) throw new Error('User password not set');
    if (!user.verified) throw new Error('User not verified');

    // TODO: not sure of the cleanest way to handle bad credentials.
    // May need custom error type.
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const authToken = await generateToken(user.id, TOKEN_TYPE.AUTH);
    const refreshToken = await generateToken(user.id, TOKEN_TYPE.REFRESH);
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { token: refreshToken },
    });

    return {
      user: UserService.toDTO(updatedUser),
      token: authToken,
    };
  }

  public async refreshTokens(
    token: string
  ): Promise<{ user: User; token: string }> {
    let user = await this.fetchUserByToken(token);

    const authToken = await generateToken(user.id, TOKEN_TYPE.AUTH);
    user = await this.exchangeToken(token, TOKEN_TYPE.REFRESH);

    return {
      user: user,
      token: authToken,
    };
  }

  // This is meant to be called for create new user and reset password functionality
  public async resetPassword(
    token: string,
    password: string
  ): Promise<UserDTO> {
    const user = await this.fetchUserByToken(token);
    const newToken = await generateToken(user.id, TOKEN_TYPE.AUTH);
    const hashedPassword = await hashPassword(password);

    // User goes to verified status after password reset
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { token: newToken, password: hashedPassword, verified: true },
    });
    return UserService.toDTO(updatedUser);
  }
}
