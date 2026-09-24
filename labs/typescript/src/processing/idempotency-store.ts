export interface IdempotencyStore {
  has(messageId: string): boolean;
  markProcessed(messageId: string): void;
}

export class InMemoryIdempotencyStore implements IdempotencyStore {
  private readonly processed = new Set<string>();

  has(messageId: string): boolean {
    return this.processed.has(messageId);
  }

  markProcessed(messageId: string): void {
    this.processed.add(messageId);
  }
}
