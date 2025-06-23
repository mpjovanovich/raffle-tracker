import { config } from '@/config/config.js';
import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';
import { TOKEN_TYPE } from '@/types/TokenType.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { generateResetToken } from '@/utils/authUtility.js';
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
          config.jwtVerifyTokenExpiresIn.toString()
        ),
        user.email
      );
    }

    res
      .status(200)
      .json(
        new APIResponse(200, null, 'User created. Confirmation email sent.')
      );
  });
}

const userController = new UserController();
export default userController;
