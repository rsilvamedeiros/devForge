export type OrderSide = 'buy' | 'sell';
export type OrderStatus = 'pending' | 'filled';

export interface Order {
  readonly id: string;
  readonly accountId: string;
  readonly symbol: string;
  readonly side: OrderSide;
  readonly quantity: number;
  readonly price: number;
  status: OrderStatus;
}

export function validateOrder(order: Order): void {
  if (order.quantity <= 0) throw new Error('Quantity must be greater than zero.');
  if (order.price <= 0) throw new Error('Price must be greater than zero.');
  if (!order.symbol.trim()) throw new Error('Symbol is required.');
}
