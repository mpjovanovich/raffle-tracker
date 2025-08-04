import { Role } from './Role.js';

export interface User {
  id: number;
  username: string;
  active: boolean;
  latestLoginDate?: string;
  failedLoginAttempts?: number;
  lockedUntil?: string;
  roles?: Role[];
}
