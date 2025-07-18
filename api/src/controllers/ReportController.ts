import { prisma } from '@/db.js';
import { ReportService } from '@/services/ReportService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { Request, Response } from 'express';

class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService(prisma);
  }

  getRevenueReport = asyncHandler(async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.eventId);
    if (isNaN(eventId)) {
      throw new Error(`Invalid ID format: ${req.params.eventId}`);
    }

    const revenueReport = await this.reportService.revenueReport(eventId);
    res.status(200).json(new APIResponse(200, revenueReport));
  });
}

export default new ReportController();
