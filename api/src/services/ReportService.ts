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
      contests: [],
    };

    const ticketCounts = await getTicketCounts(this.prisma, eventId);
    eventSalesReport.contests = ticketCounts.map(ticketCount => ({
      contestNumber: ticketCount.contest_number,
      totalTicketCount: ticketCount.total_ticket_count,
      winningTicketCount: ticketCount.winning_ticket_count,
      winningTicketDollarAmount:
        ticketCount.winning_ticket_count * event.ticketPrice,
      unclaimedWinningTicketCount: ticketCount.unclaimed_winning_ticket_count,
      unclaimedWinningTicketDollarAmount:
        ticketCount.unclaimed_winning_ticket_count * event.ticketPrice,
    }));

    return eventSalesReport;
  }
}
