import { User } from '@raffle-tracker/dto';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export {};
