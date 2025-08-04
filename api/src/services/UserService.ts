import { verifyPassword } from '@/utils/passwordUtility.js';
import { PrismaClient, User } from '@prisma/client';
import { generateAuthToken, TOKEN_TYPE } from '@raffle-tracker/auth';
import {
  AuthenticatedUser,
  LoginResponse,
  Role as RoleDTO,
  User as UserDTO,
  UserListItem,
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
      active: user.active ? 1 : 0,
      latestLoginDate: user.latestLoginDate?.toISOString().split('T')[0],
      failedLoginAttempts: user.failedLoginAttempts,
      lockedUntil: user.lockedUntil?.toISOString().split('T')[0],
    };
  }

  protected static toPrisma(user: UserDTO, password: string): User {
    return {
      id: user.id,
      username: user.username,
      password: password,
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

  public async addRoleToUser(userId: number, roleId: number): Promise<UserDTO> {
    await this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });

    return await this.fetchUserWithRoles(userId);
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

  // To be replaced with upsert
  // public async createUser(
  //   username: string,
  //   password: string
  // ): Promise<UserDTO> {
  //   if (!username || !password) {
  //     throw new Error('Username and password are required');
  //   }

  //   if (await this.checkUserExists(this.prisma, username)) {
  //     throw new Error('Username already in use');
  //   }

  //   if (username.length < 5 || username.length > 20) {
  //     throw new Error('Username must be between 5 and 20 characters long');
  //   }

  //   const createdUser = await this.prisma.$transaction(async tx => {
  //     let user = await tx.user.create({
  //       data: {
  //         username: username,
  //         password: await hashPassword(password),
  //         active: true,
  //       },
  //     });

  //     const viewerRole = await tx.role.findUnique({
  //       where: { name: 'VIEWER' },
  //     });

  //     if (!viewerRole) {
  //       throw new Error('VIEWER role not found in database');
  //     }

  //     await tx.userRole.create({
  //       data: {
  //         userId: user.id,
  //         roleId: viewerRole.id,
  //       },
  //     });

  //     return user;
  //   });

  //   return UserService.toDTO(createdUser);
  // }

  public async fetchUserWithRoles(userId: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } },
    });
    if (!user) throw new Error('User not found');

    return {
      ...UserService.toDTO(user),
      roles: user.roles.map(userRole => userRole.role.name) as RoleDTO[],
    };
  }

  public async getAllForList(): Promise<UserListItem[]> {
    let users = await super.getAll();
    return users.map(user => ({
      id: user.id,
      username: user.username,
    }));
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
}
