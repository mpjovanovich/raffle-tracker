import { Role } from './Role.js';

export interface AuthenticatedUser {
  id: number;
  username: string;
  roles?: Role[];
}
