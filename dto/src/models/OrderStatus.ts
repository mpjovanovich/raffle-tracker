export const ORDER_STATUS = {
  ISSUED: 'ISSUED',
  REDEEMED: 'REDEEMED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
