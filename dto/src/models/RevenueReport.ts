export interface RevenueReportContest {
  contestNumber: number;
  totalTicketCount: number;
  totalTicketDollarAmount: number;
  winningTicketCount: number;
  winningTicketDollarAmount: number;
  unclaimedWinningTicketCount: number;
  unclaimedWinningTicketDollarAmount: number;
  netTicketDollarAmount: number;
}

export interface RevenueReport {
  eventName: string;
  ticketPrice: number;
  totalTicketDollarAmount: number;
  totalWinningTicketDollarAmount: number;
  totalUnclaimedWinningTicketDollarAmount: number;
  netTicketDollarAmount: number;
  contests: RevenueReportContest[];
}
