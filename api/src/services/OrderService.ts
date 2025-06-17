import { Order, PrismaClient } from '.prisma/client';
import {
  ORDER_STATUS,
  Order as OrderDTO,
  OrderStatus,
  Ticket as TicketDTO,
  UpdateOrderResponse,
} from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';
import { TicketService } from './TicketService.js';

export class OrderService extends BaseService<Order, OrderDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'order');
  }

  public static toDTO(ticket: Order): OrderDTO {
    return {
      id: ticket.id,
      createdDttm: ticket.created_dttm.toISOString(),
      status: ticket.status as OrderStatus,
    };
  }

  protected static toPrisma(ticket: OrderDTO): Order {
    return {
      id: ticket.id,
      created_dttm: new Date(ticket.createdDttm),
      status: ticket.status as OrderStatus,
    };
  }

  public static formatOrderNumber(orderId: number): string {
    // Five digit limit was in per client requirements.
    // If we ever hit this we'll just have to pad with more zeroes - shouldn't break anything.
    if (orderId > 99999) {
      throw new Error(
        `Order ID has exceeded 5 digits. Please contact an administrator.`
      );
    }

    return orderId.toString().padStart(5, '0');
  }

  private async cancelOrder(orderId: number): Promise<string[]> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    let orderDTO: OrderDTO = OrderService.toDTO(order);
    orderDTO.status = ORDER_STATUS.CANCELLED;

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: ORDER_STATUS.CANCELLED },
    });

    const ticketRefs = (await this.getTicketsByOrderId(orderId)).map(ticket =>
      TicketService.formatRef(ticket.id)
    );

    return ticketRefs;
  }

  private async refundOrder(orderId: number): Promise<string[]> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    let orderDTO: OrderDTO = OrderService.toDTO(order);
    orderDTO.status = ORDER_STATUS.REFUNDED;

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: ORDER_STATUS.REFUNDED },
    });

    const ticketRefs = (await this.getTicketsByOrderId(orderId)).map(ticket =>
      TicketService.formatRef(ticket.id)
    );

    return ticketRefs;
  }

  private async redeemOrder(orderId: number): Promise<string[]> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    const ticketRefs = (await this.getWinningTicketByOrderId(orderId)).map(
      ticket => TicketService.formatRef(ticket.id)
    );

    let orderDTO: OrderDTO = OrderService.toDTO(order);
    orderDTO.status = ORDER_STATUS.REDEEMED;

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: ORDER_STATUS.REDEEMED },
    });

    return ticketRefs;
  }

  private async getTicketsByOrderId(orderId: number): Promise<TicketDTO[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: { order_id: orderId },
    });
    return tickets.map(TicketService.toDTO);
  }

  private async getWinningTicketByOrderId(
    orderId: number
  ): Promise<TicketDTO[]> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        ticket: {
          include: {
            horse: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    const winningTickets = order.ticket.filter(ticket => ticket.horse.winner);

    return winningTickets.map(TicketService.toDTO);
  }

  public async updateStatus(
    id: number,
    status: OrderStatus
  ): Promise<UpdateOrderResponse> {
    let refs: string[] = [];
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new Error(`Order not found: ${OrderService.formatOrderNumber(id)}`);
    }
    if (order.status !== ORDER_STATUS.ISSUED) {
      throw new Error(`Order already in ${order.status} status`);
    }

    switch (status) {
      case ORDER_STATUS.CANCELLED:
        refs = await this.cancelOrder(id);
        break;
      case ORDER_STATUS.REFUNDED:
        refs = await this.refundOrder(id);
        break;
      case ORDER_STATUS.REDEEMED:
        refs = await this.redeemOrder(id);
        break;
      default:
        throw new Error(`Invalid status: ${status}`);
    }

    return {
      refs,
    };
  }
}
