import { describe, expect, it, vi } from 'vitest';
import { Order } from '../src/domain/order.js';
import { Message } from '../src/messaging/message.js';
import { InMemoryQueue } from '../src/messaging/queue.js';
import { InMemoryIdempotencyStore } from '../src/processing/idempotency-store.js';
import { OrderProcessor } from '../src/processing/order-processor.js';

function message(id = 'message-1'): Message<Order> {
  return {
    id,
    attempts: 0,
    occurredAt: new Date(),
    payload: { id: 'order-1', accountId: 'demo', symbol: 'PETR4', side: 'buy', quantity: 10, price: 38, status: 'pending' },
  };
}

function setup(execute = vi.fn(async () => undefined), maxAttempts = 3) {
  const main = new InMemoryQueue<Message<Order>>();
  const retry = new InMemoryQueue<Message<Order>>();
  const deadLetter = new InMemoryQueue<Message<Order>>();
  const store = new InMemoryIdempotencyStore();
  const processor = new OrderProcessor(main, retry, deadLetter, store, execute, maxAttempts);
  return { main, retry, deadLetter, store, processor, execute };
}

describe('OrderProcessor', () => {
  it('processes orders in FIFO order', async () => {
    const context = setup();
    context.main.enqueue(message('first'));
    context.main.enqueue(message('second'));

    await context.processor.processNext();
    await context.processor.processNext();

    expect(context.execute).toHaveBeenCalledTimes(2);
    expect(context.store.has('first')).toBe(true);
    expect(context.store.has('second')).toBe(true);
  });

  it('ignores a message already processed', async () => {
    const context = setup();
    context.store.markProcessed('duplicate');
    context.main.enqueue(message('duplicate'));

    expect(await context.processor.processNext()).toBe('duplicate');
    expect(context.execute).not.toHaveBeenCalled();
  });

  it('schedules transient failures for retry', async () => {
    const context = setup(vi.fn().mockRejectedValueOnce(new Error('timeout')).mockResolvedValue(undefined));
    context.main.enqueue(message());

    expect(await context.processor.processNext()).toBe('scheduled-retry');
    expect(context.retry.size).toBe(1);
    expect(await context.processor.processNext()).toBe('processed');
  });

  it('moves poison messages to the dead-letter queue', async () => {
    const context = setup(vi.fn().mockRejectedValue(new Error('unavailable')), 2);
    context.main.enqueue(message());

    expect(await context.processor.processNext()).toBe('scheduled-retry');
    expect(await context.processor.processNext()).toBe('dead-lettered');
    expect(context.deadLetter.size).toBe(1);
  });
});
