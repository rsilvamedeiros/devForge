import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('rejects an invalid order without queueing it', () => {
    const error = service.place({ symbol: 'PETR4', side: 'buy', quantity: 0, price: 10 });

    expect(error).toBe('Quantidade deve ser maior que zero.');
    expect(service.orders().length).toBe(0);
  });

  it('starts processing a valid order right away when the queue is idle', () => {
    const error = service.place({ symbol: 'PETR4', side: 'buy', quantity: 10, price: 38.4 });

    expect(error).toBeNull();
    expect(service.orders().length).toBe(1);
    expect(service.orders()[0].status).toBe('processing');
  });

  it('processes orders one at a time, in FIFO order', fakeAsync(() => {
    service.place({ symbol: 'PETR4', side: 'buy', quantity: 10, price: 38.4 });
    service.place({ symbol: 'VALE3', side: 'sell', quantity: 5, price: 61.1 });

    tick(1);
    const [first, second] = service.orders();
    expect(first.status).toBe('processing');
    expect(second.status).toBe('pending');

    tick(600);
    expect(first.status).toBe('filled');
    expect(second.status).toBe('processing');

    tick(600);
    expect(second.status).toBe('filled');
  }));
});
