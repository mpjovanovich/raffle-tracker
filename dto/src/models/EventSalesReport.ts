export interface EventSalesReportContest {
  contestNumber: number;
  totalTicketCount: number;
  winningTicketCount: number;
  winningTicketDollarAmount: number;
  unclaimedWinningTicketCount: number;
  unclaimedWinningTicketDollarAmount: number;
}

export interface EventSalesReport {
  eventName: string;
  ticketPrice: number;
  contests: EventSalesReportContest[];
}
