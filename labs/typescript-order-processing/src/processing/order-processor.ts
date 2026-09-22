import { Order, validateOrder } from '../domain/order.js';
import { Message, retry } from '../messaging/message.js';
import { Queue } from '../messaging/queue.js';
import { IdempotencyStore } from './idempotency-store.js';

export type ExecutionGateway = (order: Order) => Promise<void>;

export type ProcessingResult =
  | 'empty'
  | 'processed'
  | 'duplicate'
  | 'scheduled-retry'
  | 'dead-lettered';

export class OrderProcessor {
  constructor(
    private readonly mainQueue: Queue<Message<Order>>,
    private readonly retryQueue: Queue<Message<Order>>,
    private readonly deadLetterQueue: Queue<Message<Order>>,
    private readonly idempotencyStore: IdempotencyStore,
    private readonly execute: ExecutionGateway,
    private readonly maxAttempts = 3
  ) {}

  async processNext(): Promise<ProcessingResult> {
    const message = this.mainQueue.dequeue() ?? this.retryQueue.dequeue();
    if (!message) return 'empty';
    if (this.idempotencyStore.has(message.id)) return 'duplicate';

    try {
      validateOrder(message.payload);
      await this.execute(message.payload);
      message.payload.status = 'filled';
      this.idempotencyStore.markProcessed(message.id);
      return 'processed';
    } catch {
      const nextAttempt = retry(message);
      if (nextAttempt.attempts >= this.maxAttempts) {
        this.deadLetterQueue.enqueue(nextAttempt);
        return 'dead-lettered';
      }
      this.retryQueue.enqueue(nextAttempt);
      return 'scheduled-retry';
    }
  }
}
