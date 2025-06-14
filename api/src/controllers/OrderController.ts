import { OrderService } from '@/services/OrderService.js';
import { ORDER_STATUS, UpdateOrderRequest } from '@raffle-tracker/dto';
import { Request, Response } from 'express';
import { prisma } from '../db.js';
import { APIResponse } from '../utils/APIResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService(prisma);
  }

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const updateOrderRequest: UpdateOrderRequest = req.body;
    if (isNaN(updateOrderRequest.orderId)) {
      throw new Error(`Invalid ID format: ${updateOrderRequest.orderId}`);
    }
    if (!Object.values(ORDER_STATUS).includes(updateOrderRequest.status)) {
      throw new Error(`Invalid status: ${updateOrderRequest.status}`);
    }
    const tickets = await this.orderService.updateStatus(
      updateOrderRequest.orderId,
      updateOrderRequest.status
    );
    res.status(200).json(new APIResponse(200, tickets));
  });
}

const orderController = new OrderController();
export default orderController;
