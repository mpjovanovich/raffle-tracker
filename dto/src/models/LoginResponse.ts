import { User } from './User.js';

export interface LoginResponse {
  accessToken: string;
  user: User;
}
