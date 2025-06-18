export const ROLE = {
  ADMIN: 'ADMIN',
  CASHIER: 'CASHIER',
  EVENT_MANAGER: 'EVENT_MANAGER',
  SELLER: 'SELLER',
  VIEWER: 'VIEWER',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
