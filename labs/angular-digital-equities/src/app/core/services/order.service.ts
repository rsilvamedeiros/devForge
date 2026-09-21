import { Injectable, signal } from '@angular/core';
import { createOrder, Order, OrderSide } from '../models/order.model';
import { Queue } from '../queue/queue';

const PROCESSING_LATENCY_MS = 600;

export interface PlaceOrderInput {
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly queue = new Queue<Order>();
  private readonly _orders = signal<Order[]>([]);
  private isProcessing = false;

  readonly orders = this._orders.asReadonly();

  place(input: PlaceOrderInput): string | null {
    const order = createOrder(
      input.side,
      crypto.randomUUID(),
      input.symbol,
      input.quantity,
      input.price
    );

    const error = order.validate();
    if (error) {
      return error;
    }

    this._orders.update(orders => [...orders, order]);
    this.queue.enqueue(order);
    this.processNext();
    return null;
  }

  private processNext(): void {
    if (this.isProcessing || this.queue.isEmpty()) {
      return;
    }

    const order = this.queue.dequeue();
    if (!order) {
      return;
    }

    this.isProcessing = true;
    order.status = 'processing';
    this.touch();

    setTimeout(() => {
      order.status = 'filled';
      this.touch();
      this.isProcessing = false;
      this.processNext();
    }, PROCESSING_LATENCY_MS);
  }

  private touch(): void {
    this._orders.update(orders => [...orders]);
  }
}
