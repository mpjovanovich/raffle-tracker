import { verifyPassword } from '@/utils/passwordUtility.js';
import { PrismaClient, Role, User } from '@prisma/client';
import { generateAuthToken, TOKEN_TYPE } from '@raffle-tracker/auth';
import {
  AuthenticatedUser,
  LoginResponse,
  Role as RoleDTO,
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
      password: user.password,
      active: user.active ? 1 : 0,
      latestLoginDate: user.latestLoginDate?.toISOString().split('T')[0],
      failedLoginAttempts: user.failedLoginAttempts,
      lockedUntil: user.lockedUntil?.toISOString().split('T')[0],
    };
  }

  protected static toPrisma(user: UserDTO): User {
    return {
      id: user.id,
      username: user.username,
      password: user.password ?? null,
      active: user.active === 1,
      latestLoginDate: user.latestLoginDate
        ? new Date(user.latestLoginDate)
        : null,
      failedLoginAttempts: user.failedLoginAttempts,
      lockedUntil: user.lockedUntil ? new Date(user.lockedUntil) : null,
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
    username: string
  ): Promise<boolean> {
    let existingUser = await tx.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return true;
    }
    return false;
  }

  public async createUser(
    username: string,
    password: string
  ): Promise<UserDTO> {
    // if (!username || !password) {
    //   throw new Error('Username and password are required');
    // }

    // if (await this.checkUserExists(this.prisma, username)) {
    //   throw new Error('Username already in use');
    // }

    // if (username.length < 5 || username.length > 20) {
    //   throw new Error('Username must be between 5 and 20 characters long');
    // }

    // if (!this.isValidEmail(email)) {
    //   throw new Error('Invalid email format');
    // }

    // const createdUser = await this.prisma.$transaction(async tx => {
    //   let user = await tx.user.create({
    //     data: {
    //       username,
    //       email,
    //       verified: false,
    //       roles: {
    //         connect: [
    //           {
    //             name: ROLE.VIEWER,
    //           },
    //         ],
    //       },
    //     },
    //   });

    //   const verificationTokenId = await generateTokenId();
    //   user = await tx.user.update({
    //     where: { id: user.id },
    //     data: { verificationTokenId },
    //   });

    //   return user;
    // });

    // return UserService.toDTO(createdUser);
    // Dummy return for now
    return {
      id: 1,
      username: username,
      password: password,
      active: 1,
      latestLoginDate: new Date().toISOString().split('T')[0],
      failedLoginAttempts: 0,
    };
  }

  public async fetchUserWithRoles(userId: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true },
    });
    if (!user) throw new Error('User not found');
    return {
      ...UserService.toDTO(user),
      roles: user.roles.map((role: Role) => role.name) as RoleDTO[],
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

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    // // Get user data and convert to authenticated user
    const authenticatedUser = UserService.toAuthenticatedUser(
      await this.fetchUserWithRoles(user.id)
    );

    // Generate auth token with user data
    const authToken = await generateAuthToken(
      authenticatedUser,
      TOKEN_TYPE.AUTH
    );

    return {
      accessToken: authToken,
    };
  }

  // public async resetPassword(
  //   token: string,
  //   password: string
  // ): Promise<UserDTO> {
  //   const decoded = (await verifyResetToken(token)) as ResetUserRequest;
  //   const userId = decoded.userId;
  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       id: userId,
  //       verificationTokenId: decoded.token,
  //     },
  //   });

  //   if (!user) throw new Error('User not found');
  //   if (user.verified)
  //     // TODO: Logging
  //     throw new Error('Please request a new password reset.');

  //   const hashedPassword = await hashPassword(password);
  //   const updatedUser = await this.prisma.user.update({
  //     where: { id: userId },
  //     data: {
  //       password: hashedPassword,
  //       verified: true,
  //       verificationTokenId: null,
  //     },
  //   });

  //   return UserService.toDTO(updatedUser);
  // }
}
