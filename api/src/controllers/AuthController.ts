import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { LoginResponse } from '@raffle-tracker/dto';
import { Request, Response } from 'express';

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(prisma);
  }

  login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const loginResponse: LoginResponse = await this.userService.login(
      username,
      password
    );
    res.status(200).json(new APIResponse(200, loginResponse));
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      throw new Error(`Invalid ID format: ${req.params.userId}`);
    }
    await this.userService.logout(userId);
    res.status(200).json(new APIResponse(200, null, 'Logged out.'));
  });
}

const authController = new AuthController();
export default authController;
