import { OrderStatus } from './OrderStatus.js';

export interface UpdateOrderRequest {
  orderId: number;
  status: OrderStatus;
}
