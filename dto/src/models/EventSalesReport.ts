export interface EventSalesReportContest {
  contestNumber: number;
  totalTicketCount: number;
  totalTicketDollarAmount: number;
  winningTicketCount: number;
  winningTicketDollarAmount: number;
  unclaimedWinningTicketCount: number;
  unclaimedWinningTicketDollarAmount: number;
  netTicketDollarAmount: number;
}

export interface EventSalesReport {
  eventName: string;
  ticketPrice: number;
  totalTicketDollarAmount: number;
  totalWinningTicketDollarAmount: number;
  totalUnclaimedWinningTicketDollarAmount: number;
  netTicketDollarAmount: number;
  contests: EventSalesReportContest[];
}
