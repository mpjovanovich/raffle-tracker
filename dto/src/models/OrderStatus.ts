export const ORDER_STATUS = {
  CANCELLED: 'CANCELLED',
  ISSUED: 'ISSUED',
  REDEEMED: 'REDEEMED',
  REFUNDED: 'REFUNDED',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
