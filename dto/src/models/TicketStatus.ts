export const TICKET_STATUSES = [
  'ISSUED',
  'REDEEMED',
  'REFUNDED',
  'CANCELLED',
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];
