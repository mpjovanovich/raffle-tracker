export const TICKET_STATUSES = ['ISSUED', 'REDEEMED', 'REFUNDED'] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];
