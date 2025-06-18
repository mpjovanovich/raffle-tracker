import { prisma } from '@/db.js';
import { OrderService } from '@/services/OrderService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { ORDER_STATUS, OrderStatus } from '@raffle-tracker/dto';
import { Request, Response } from 'express';

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService(prisma);
  }

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId);
    const status: OrderStatus = req.body.status;
    if (isNaN(orderId)) {
      throw new Error(`Invalid ID format: ${orderId}`);
    }
    if (!Object.values(ORDER_STATUS).includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    const tickets = await this.orderService.updateStatus(orderId, status);
    res.status(200).json(new APIResponse(200, tickets));
  });
}

const orderController = new OrderController();
export default orderController;
