import { TicketService } from '@/services/TicketService.js';
import { CreateTicketsRequest } from '@raffle-tracker/dto';
import { Request, Response } from 'express';
import { prisma } from '../db.js';
import { APIResponse } from '../utils/APIResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService(prisma);
  }

  createTickets = asyncHandler(async (req: Request, res: Response) => {
    const requests: CreateTicketsRequest[] = req.body;
    const items = await this.ticketService.createTickets(requests);
    res.status(200).json(new APIResponse(200, items));
  });
}

const ticketController = new TicketController();
export default ticketController;
