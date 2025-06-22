import { config } from '@/config/config.js';
import { NextFunction, Request, Response, Router } from 'express';

/*
If this file gets large enough we can add a controller and/or split it up.
*/
const router = Router();

// Dev-only middleware to ensure this only runs in development
router.use((req: Request, res: Response, next: NextFunction) => {
  if (config.nodeEnv !== 'development') {
    res.status(404).json({ error: 'Not Found' });
    return;
  }
  next();
});

// // Set temp token for user by ID
// router.route('/users/:id/setTempToken').get(
//   asyncHandler(async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.id);

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });
//     if (!user) {
//       res.status(404).json(new APIResponse(404, null, 'User not found'));
//       return;
//     }

//     const newToken = await generateToken(user.id, TOKEN_TYPE.TEMP);
//     const updatedUser = await prisma.user.update({
//       where: { id: user.id },
//       data: { token: newToken },
//     });

//     res.status(200).json(
//       new APIResponse(200, {
//         token: updatedUser.token,
//         userId: updatedUser.id,
//         username: updatedUser.username,
//       })
//     );
//   })
// );

export default router;
