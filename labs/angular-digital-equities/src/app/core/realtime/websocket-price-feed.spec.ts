import { TestBed } from '@angular/core/testing';
import { parsePriceTick, WebSocketPriceFeed } from './websocket-price-feed';

class FakeWebSocket {
  static instances: FakeWebSocket[] = [];

  readyState = 0;
  sent: string[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: ((event: unknown) => void) | null = null;
  onclose: ((event: { wasClean: boolean }) => void) | null = null;

  constructor(public url: string) {
    FakeWebSocket.instances.push(this);
  }

  send(data: string): void {
    this.sent.push(data);
  }

  close(): void {
    this.readyState = 3;
    this.onclose?.({ wasClean: true });
  }

  simulateOpen(): void {
    this.readyState = 1;
    this.onopen?.();
  }

  simulateMessage(data: unknown): void {
    this.onmessage?.({ data: JSON.stringify(data) });
  }
}

describe('parsePriceTick', () => {
  it('accepts a well-formed tick', () => {
    expect(parsePriceTick({ symbol: 'PETR4', price: 38.4 })).toEqual({
      symbol: 'PETR4',
      price: 38.4,
    });
  });

  it('rejects messages missing required fields', () => {
    expect(parsePriceTick({ symbol: 'PETR4' })).toBeNull();
    expect(parsePriceTick({ price: 38.4 })).toBeNull();
    expect(parsePriceTick('not an object')).toBeNull();
    expect(parsePriceTick(null)).toBeNull();
  });
});

describe('WebSocketPriceFeed', () => {
  let originalWebSocket: typeof WebSocket;

  beforeEach(() => {
    FakeWebSocket.instances = [];
    originalWebSocket = window.WebSocket;
    (window as unknown as { WebSocket: unknown }).WebSocket = FakeWebSocket;
  });

  afterEach(() => {
    (window as unknown as { WebSocket: unknown }).WebSocket = originalWebSocket;
  });

  it('subscribes with the requested symbols once the socket opens', () => {
    const feed = TestBed.inject(WebSocketPriceFeed);
    const subscription = feed.connect({ PETR4: 38.4, VALE3: 61.1 }).subscribe();

    const socket = FakeWebSocket.instances[0];
    socket.simulateOpen();

    expect(JSON.parse(socket.sent[0])).toEqual({
      type: 'subscribe',
      symbols: ['PETR4', 'VALE3'],
    });

    subscription.unsubscribe();
  });

  it('forwards well-formed ticks and drops unrecognized messages', () => {
    const feed = TestBed.inject(WebSocketPriceFeed);
    const ticks: unknown[] = [];
    const subscription = feed.connect({ PETR4: 38.4 }).subscribe(tick => ticks.push(tick));

    const socket = FakeWebSocket.instances[0];
    socket.simulateOpen();
    socket.simulateMessage({ symbol: 'PETR4', price: 39.1 });
    socket.simulateMessage({ noise: true });

    expect(ticks).toEqual([{ symbol: 'PETR4', price: 39.1 }]);

    subscription.unsubscribe();
  });

  it('closes the underlying socket when unsubscribed', () => {
    const feed = TestBed.inject(WebSocketPriceFeed);
    const subscription = feed.connect({ PETR4: 38.4 }).subscribe();

    const socket = FakeWebSocket.instances[0];
    socket.simulateOpen();
    subscription.unsubscribe();

    expect(socket.readyState).toBe(3);
  });
});
