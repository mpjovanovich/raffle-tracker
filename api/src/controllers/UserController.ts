import { prisma } from '@/db.js';
import { UserService } from '@/services/UserService.js';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(prisma);
  }

  // createUsers = asyncHandler(async (req: Request, res: Response) => {
  //   const requests: CreateUsersRequest[] = req.body;
  //   const items = await this.userService.createUsers(requests);
  //   res.status(200).json(new APIResponse(200, items));
  // });
}

const userController = new UserController();
export default userController;
