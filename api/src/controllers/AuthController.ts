import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { sendEmail } from '@/utils/mailer.js';
import { createValidationEmail } from '@/utils/mailFormatUtility.js';
import {
  generateResetToken,
  getExpiresIn,
  TOKEN_TYPE,
} from '@raffle-tracker/auth';
import { config } from '@raffle-tracker/config';
import { LoginResponse, SignupRequest } from '@raffle-tracker/dto';
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

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token;
    const { password } = req.body;
    const user = await this.userService.resetPassword(token, password);
    // We could log the user in here, but for now we'll have to tell the user to login with new creds.
    res.status(200).json(new APIResponse(200, user, 'User verified.'));
  });

  signup = asyncHandler(async (req: Request, res: Response) => {
    const request: SignupRequest = req.body;
    const user = await this.userService.createUser(
      request.email,
      request.username
    );

    // The reset token will be used to look up the user.
    // It operates like a temporary password.
    const urlToken = await generateResetToken(
      { userId: user.id, token: user.verificationTokenId! },
      TOKEN_TYPE.VERIFY
    );
    const validateUrl = `${request.validateUrl}/${urlToken}`;

    if (!config.emailDisabled) {
      await sendEmail(
        'Confirm your email',
        createValidationEmail(
          validateUrl,
          getExpiresIn(TOKEN_TYPE.VERIFY).jwtExpiresIn!.toString()
        ),
        user.email
      );
    }

    res
      .status(200)
      .json(
        new APIResponse(
          200,
          null,
          'User created. A confirmation email has been sent to your email address.'
        )
      );
  });
}

const authController = new AuthController();
export default authController;
