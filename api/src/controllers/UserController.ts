import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { CreateUserRequest } from '@raffle-tracker/dto';
import { Request, Response } from 'express';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(prisma);
  }

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const request: CreateUserRequest = req.body;
    const user = await this.userService.createUser(request);
    res.status(200).json(new APIResponse(200, user));
  });
}

const userController = new UserController();
export default userController;
