import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { Request, Response } from 'express';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(prisma);
  }

  addRoleToUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      throw new Error(`Invalid ID format: ${req.params.userId}`);
    }

    const roleId = parseInt(req.body.roleId);
    if (isNaN(roleId)) {
      throw new Error(`Invalid roleId format: ${req.body.roleId}`);
    }

    const user = await this.userService.addRoleToUser(userId, roleId);
    res.status(200).json(new APIResponse(200, user));
  });

  // To be replaced with upserts
  // createUser = asyncHandler(async (req: Request, res: Response) => {
  //   const { username, password } = req.body;
  //   const user = await this.userService.createUser(username, password);
  //   res.status(200).json(new APIResponse(200, user));
  // });

  getAllForList = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.userService.getAllForList();
    res.status(200).json(new APIResponse(200, items));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      throw new Error(`Invalid ID format: ${req.params.userId}`);
    }

    const user = await this.userService.fetchUserWithRoles(userId);
    res.status(200).json(new APIResponse(200, user));
  });
}

const userController = new UserController();
export default userController;
