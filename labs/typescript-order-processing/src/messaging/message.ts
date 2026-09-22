export interface Message<T> {
  readonly id: string;
  readonly payload: T;
  readonly occurredAt: Date;
  readonly attempts: number;
}

export function retry<T>(message: Message<T>): Message<T> {
  return { ...message, attempts: message.attempts + 1 };
}
