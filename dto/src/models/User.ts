import { Role } from './Role.js';

export interface User {
  id: number;
  username: string;
  password?: string;
  email: string;
  verified: number; // 0 or 1
  roles?: Role[];
  token?: string;
  tokenExpiry?: string;
}
