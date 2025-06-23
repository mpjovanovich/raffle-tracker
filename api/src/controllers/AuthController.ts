import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { Request, Response } from 'express';

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(prisma);
  }

  login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // const loginResponse: LoginResponse = await this.userService.login(
    //   username,
    //   password
    // );
    // res.status(200).json(new APIResponse(200, loginResponse));
    res.status(200).json(new APIResponse(200, null, 'Logged in.'));
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      throw new Error(`Invalid ID format: ${req.params.userId}`);
    }
    await this.userService.logout(userId);
    res.status(200).json(new APIResponse(200, null, 'Logged out.'));
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token;
    const { password } = req.body;
    const user = await this.userService.resetPassword(token, password);
    // We could log the user in here, but for now we'll have to tell the user to login with new creds.
    res.status(200).json(new APIResponse(200, user, 'User verified.'));
  });
}

const authController = new AuthController();
export default authController;
