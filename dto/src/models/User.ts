import { Role } from './Role.js';

export interface User {
  id: number;
  username: string;
  active: number; // 0 or 1
  latestLoginDate?: string;
  failedLoginAttempts?: number;
  lockedUntil?: string;
  roles?: Role[];
}
