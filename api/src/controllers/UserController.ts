import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { User } from '@raffle-tracker/dto';
import { Request, Response } from 'express';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(prisma);
  }

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userRequest: User = req.body;
    const user = await this.userService.createUser(userRequest);
    res.status(200).json(new APIResponse(200, user));
  });

  getAllForList = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.userService.getAllForList();
    res.status(200).json(new APIResponse(200, items));
  });
}

const userController = new UserController();
export default userController;
