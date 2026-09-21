import { Queue } from './queue';

describe('Queue', () => {
  it('starts empty', () => {
    const queue = new Queue<number>();

    expect(queue.isEmpty()).toBe(true);
    expect(queue.size).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  it('dequeues items in FIFO order', () => {
    const queue = new Queue<string>();

    queue.enqueue('first');
    queue.enqueue('second');
    queue.enqueue('third');

    expect(queue.dequeue()).toBe('first');
    expect(queue.dequeue()).toBe('second');
    expect(queue.dequeue()).toBe('third');
    expect(queue.dequeue()).toBeUndefined();
  });

  it('peek returns the front item without removing it', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.size).toBe(2);
  });

  it('tracks size as items are enqueued and dequeued', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);

    queue.dequeue();
    expect(queue.size).toBe(1);
    expect(queue.isEmpty()).toBe(false);

    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);
  });
});
