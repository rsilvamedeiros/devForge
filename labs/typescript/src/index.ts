import { Order } from './domain/order.js';
import { Message } from './messaging/message.js';
import { InMemoryQueue } from './messaging/queue.js';
import { InMemoryIdempotencyStore } from './processing/idempotency-store.js';
import { OrderProcessor } from './processing/order-processor.js';

const main = new InMemoryQueue<Message<Order>>();
const retry = new InMemoryQueue<Message<Order>>();
const deadLetter = new InMemoryQueue<Message<Order>>();
const idempotency = new InMemoryIdempotencyStore();

main.enqueue({
  id: 'message-1',
  attempts: 0,
  occurredAt: new Date(),
  payload: { id: 'order-1', accountId: 'demo', symbol: 'PETR4', side: 'buy', quantity: 100, price: 38.42, status: 'pending' },
});

const processor = new OrderProcessor(main, retry, deadLetter, idempotency, async order => {
  console.log(`Executing ${order.side} ${order.quantity} ${order.symbol}`);
});

console.log(`Result: ${await processor.processNext()}`);
