import { PrismaClient, User } from '.prisma/client';
import { ResetUserRequest } from '@/types/ResetUserRequest.js';
import { TOKEN_TYPE } from '@/types/TokenType.js';
import {
  generateAuthToken,
  generateResetToken,
  generateTokenId,
  hashPassword,
  verifyPassword,
  verifyResetToken,
} from '@/utils/authUtility.js';
import {
  AuthenticatedUser,
  CreateUserRequest,
  LoginResponse,
  ROLE,
  Role,
  User as UserDTO,
} from '@raffle-tracker/dto';
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
      refreshTokenId: user.refreshTokenId ?? undefined,
      verificationTokenId: user.verificationTokenId ?? undefined,
    };
  }

  protected static toPrisma(user: UserDTO): User {
    return {
      id: user.id,
      username: user.username,
      password: user.password ?? null,
      email: user.email,
      verified: user.verified === 1,
      refreshTokenId: user.refreshTokenId ?? null,
      verificationTokenId: user.verificationTokenId ?? null,
    };
  }

  public static toAuthenticatedUser(user: UserDTO): AuthenticatedUser {
    return {
      id: user.id,
      username: user.username,
      roles: user.roles,
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

      const verificationTokenId = await generateTokenId();
      user = await tx.user.update({
        where: { id: user.id },
        data: { verificationTokenId },
      });

      return user;
    });

    return UserService.toDTO(createdUser);
  }

  // public async exchangeToken(
  //   token: string,
  //   tokenType: TokenType
  // ): Promise<UserDTO> {
  //   const user = await this.fetchUserByToken(token);
  //   const authenticatedUser = UserService.toAuthenticatedUser(user);
  //   const newToken = await generateAccessToken(authenticatedUser, tokenType);
  //   const updatedUser = await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: { verificationTokenId: newToken },
  //   });
  //   return UserService.toDTO(updatedUser);
  // }

  // public async fetchUserByToken(token: string): Promise<UserDTO> {
  //   const decoded = (await verifyToken(token)) as AuthenticatedUser;
  //   const userId = decoded.id;

  //   const user = await this.prisma.user.findFirst({
  //     where: { id: userId, token },
  //   });
  //   if (!user) throw new Error('User not found');
  //   return UserService.toDTO(user);
  // }

  public async fetchUserWithRoles(userId: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true },
    });
    if (!user) throw new Error('User not found');
    return {
      ...UserService.toDTO(user),
      roles: (user.roles.map(role => role.name) as Role[]) ?? [],
    };
  }

  public async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
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

    // Get user data and convert to authenticated user
    const authenticatedUser = UserService.toAuthenticatedUser(
      await this.fetchUserWithRoles(user.id)
    );

    // Generate auth token with user data
    const authToken = await generateAuthToken(
      authenticatedUser,
      TOKEN_TYPE.AUTH
    );

    // Create refresh token id and update user
    const refreshTokenId = await generateTokenId();
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenId },
    });

    // Generate refresh token with user data
    const refreshToken = await generateResetToken(
      { userId: user.id, token: refreshTokenId },
      TOKEN_TYPE.REFRESH
    );

    return {
      accessToken: authToken,
      refreshToken: refreshToken,
    };
  }

  public async logout(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenId: null, verificationTokenId: null },
    });
  }

  // public async refreshTokens(
  //   token: string
  // ): Promise<{ user: UserDTO; token: string }> {
  //   let user = await this.fetchUserByToken(token);

  //   const authenticatedUser = UserService.toAuthenticatedUser(user);
  //   const authToken = await generateAccessToken(
  //     authenticatedUser,
  //     TOKEN_TYPE.AUTH
  //   );
  //   user = await this.exchangeToken(token, TOKEN_TYPE.REFRESH);

  //   return {
  //     user: user,
  //     token: authToken,
  //   };
  // }

  // // This is meant to be called for create new user and reset password functionality
  // public async resetPassword(
  //   token: string,
  //   password: string
  // ): Promise<UserDTO> {
  //   const user = await this.fetchUserByToken(token);
  //   const authenticatedUser = UserService.toAuthenticatedUser(user);
  //   const newToken = await generateAccessToken(
  //     authenticatedUser,
  //     TOKEN_TYPE.AUTH
  //   );
  //   const hashedPassword = await hashPassword(password);

  //   // User goes to verified status after password reset
  //   const updatedUser = await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: { token: newToken, password: hashedPassword, verified: true },
  //   });
  //   return UserService.toDTO(updatedUser);
  // }

  public async resetPassword(
    token: string,
    password: string
  ): Promise<UserDTO> {
    const decoded = (await verifyResetToken(token)) as ResetUserRequest;
    const userId = decoded.userId;
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        verificationTokenId: decoded.token,
      },
    });

    if (!user) throw new Error('User not found');
    if (user.verified)
      // TODO: Logging
      throw new Error('Please request a new password reset.');

    const hashedPassword = await hashPassword(password);
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        verified: true,
        verificationTokenId: null,
      },
    });

    return UserService.toDTO(updatedUser);
  }
}
