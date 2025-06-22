import { config } from '@/config/config.js';
import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { TOKEN_TYPE } from '@/types/TokenType.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { sendEmail } from '@/utils/mailer.js';
import { createValidationEmail } from '@/utils/mailFormatUtility.js';
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
    const validateUrl = `${request.validateUrl}/${user.token}`;

    if (!config.emailDisabled) {
      await sendEmail(
        'Confirm your email',
        createValidationEmail(
          validateUrl,
          config.jwtVerifyTokenExpiresIn.toString()
        ),
        user.email
      );
    }

    res
      .status(200)
      .json(new APIResponse(200, 'User created. Confirmation email sent.'));
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const loginResponse = await this.userService.login(username, password);
    res.cookie('refreshToken', loginResponse.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // Should match JWT_REFRESH_EXPIRES_IN
    });
    res
      .status(200)
      .json(new APIResponse(200, { authToken: loginResponse.authToken }));
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token;
    const password = req.body.password;
    const user = await this.userService.resetPassword(token, password);

    // TODO: login user

    // TODO: ???
    res.status(200).json(new APIResponse(200, 'Password reset.'));
  });

  setTempToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token;
    const user = await this.userService.exchangeToken(token, TOKEN_TYPE.TEMP);
    res.status(200).json(new APIResponse(200, { token: user.token }));
  });
}

const userController = new UserController();
export default userController;
