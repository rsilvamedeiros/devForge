export type OrderSide = 'buy' | 'sell';
export type OrderStatus = 'pending' | 'processing' | 'filled' | 'rejected';

const FEE_RATE = 0.005;

export abstract class Order {
  status: OrderStatus = 'pending';
  readonly createdAt: Date = new Date();

  constructor(
    readonly id: string,
    readonly symbol: string,
    readonly quantity: number,
    readonly price: number
  ) {}

  abstract get side(): OrderSide;
  abstract get netTotal(): number;

  get grossTotal(): number {
    return this.quantity * this.price;
  }

  validate(): string | null {
    if (this.quantity <= 0) {
      return 'Quantidade deve ser maior que zero.';
    }
    if (this.price <= 0) {
      return 'Preço deve ser maior que zero.';
    }
    return null;
  }
}

export class BuyOrder extends Order {
  override get side(): OrderSide {
    return 'buy';
  }

  override get netTotal(): number {
    return this.grossTotal * (1 + FEE_RATE);
  }
}

export class SellOrder extends Order {
  override get side(): OrderSide {
    return 'sell';
  }

  override get netTotal(): number {
    return this.grossTotal * (1 - FEE_RATE);
  }
}

export function createOrder(
  side: OrderSide,
  id: string,
  symbol: string,
  quantity: number,
  price: number
): Order {
  return side === 'buy'
    ? new BuyOrder(id, symbol, quantity, price)
    : new SellOrder(id, symbol, quantity, price);
}
