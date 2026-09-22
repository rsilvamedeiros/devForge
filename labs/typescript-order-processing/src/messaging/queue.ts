export interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  readonly size: number;
}

export class InMemoryQueue<T> implements Queue<T> {
  private readonly items: T[] = [];

  get size(): number {
    return this.items.length;
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}
