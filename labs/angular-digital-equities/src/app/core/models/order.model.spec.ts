import { createOrder } from './order.model';

describe('Order', () => {
  it('adds a fee on top of the gross total for buy orders', () => {
    const order = createOrder('buy', '1', 'PETR4', 100, 10);

    expect(order.grossTotal).toBe(1000);
    expect(order.netTotal).toBeCloseTo(1005);
  });

  it('deducts a fee from the gross total for sell orders', () => {
    const order = createOrder('sell', '1', 'PETR4', 100, 10);

    expect(order.grossTotal).toBe(1000);
    expect(order.netTotal).toBeCloseTo(995);
  });

  it('rejects a non-positive quantity', () => {
    const order = createOrder('buy', '1', 'PETR4', 0, 10);
    expect(order.validate()).toBe('Quantidade deve ser maior que zero.');
  });

  it('rejects a non-positive price', () => {
    const order = createOrder('buy', '1', 'PETR4', 10, 0);
    expect(order.validate()).toBe('Preço deve ser maior que zero.');
  });

  it('accepts a valid order', () => {
    const order = createOrder('sell', '1', 'PETR4', 10, 5);
    expect(order.validate()).toBeNull();
  });

  it('starts as pending', () => {
    const order = createOrder('buy', '1', 'PETR4', 10, 5);
    expect(order.status).toBe('pending');
  });
});
