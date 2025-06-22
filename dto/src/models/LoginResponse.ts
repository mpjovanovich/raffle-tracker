import { AuthenticatedUser } from './AuthenticatedUser.js';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthenticatedUser;
}
