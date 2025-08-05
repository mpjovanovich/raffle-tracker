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

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.createUser(username, password);
    res.status(200).json(new APIResponse(200, user));
  });

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

  toggleRole = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const roleId = parseInt(req.params.roleId);
    if (isNaN(userId) || isNaN(roleId)) {
      throw new Error(
        `Invalid ID format: ${req.params.userId} or ${req.params.roleId}`
      );
    }

    const user = await this.userService.toggleRole(userId, roleId);
    res.status(200).json(new APIResponse(200, user));
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.body);
    res.status(200).json(new APIResponse(200, user));
  });
}

const userController = new UserController();
export default userController;
