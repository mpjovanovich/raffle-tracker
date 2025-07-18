import { getTicketCounts } from '@/sql/getEventTicketCounts.js';
import { PrismaClient } from '@prisma/client';
import { EventSalesReport } from '@raffle-tracker/dto';
import { EventService } from './EventService.js';

export class ReportService {
  constructor(private prisma: PrismaClient) {}

  async eventSalesReport(eventId: number): Promise<EventSalesReport> {
    const eventService = new EventService(this.prisma);
    const event = await eventService.getById(eventId);

    let eventSalesReport: EventSalesReport = {
      eventName: event.name,
      ticketPrice: event.ticketPrice,
      totalTicketDollarAmount: 0,
      totalWinningTicketDollarAmount: 0,
      totalUnclaimedWinningTicketDollarAmount: 0,
      netTicketDollarAmount: 0,
      contests: [],
    };

    const ticketCounts = await getTicketCounts(this.prisma, eventId);
    eventSalesReport.contests = ticketCounts.map(ticketCount => ({
      contestNumber: ticketCount.contest_number,
      totalTicketCount: ticketCount.total_ticket_count,
      totalTicketDollarAmount:
        ticketCount.total_ticket_count * event.ticketPrice,
      winningTicketCount: ticketCount.winning_ticket_count,
      winningTicketDollarAmount:
        ticketCount.winning_ticket_count * event.ticketPrice,
      unclaimedWinningTicketCount: ticketCount.unclaimed_winning_ticket_count,
      unclaimedWinningTicketDollarAmount:
        ticketCount.unclaimed_winning_ticket_count * event.ticketPrice,
      netTicketDollarAmount:
        ticketCount.total_ticket_count * event.ticketPrice -
        ticketCount.winning_ticket_count * event.ticketPrice,
    }));

    eventSalesReport.totalTicketDollarAmount = eventSalesReport.contests.reduce(
      (acc, contest) => acc + contest.totalTicketDollarAmount,
      0
    );

    eventSalesReport.totalWinningTicketDollarAmount =
      eventSalesReport.contests.reduce(
        (acc, contest) => acc + contest.winningTicketDollarAmount,
        0
      );

    eventSalesReport.totalUnclaimedWinningTicketDollarAmount =
      eventSalesReport.contests.reduce(
        (acc, contest) => acc + contest.unclaimedWinningTicketDollarAmount,
        0
      );

    eventSalesReport.netTicketDollarAmount =
      eventSalesReport.totalTicketDollarAmount -
      eventSalesReport.totalWinningTicketDollarAmount;

    return eventSalesReport;
  }
}
