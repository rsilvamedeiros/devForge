export interface Asset {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  previousClose: number;
  volume: number;
  active: boolean;
}

export function changePercent(asset: Asset): number {
  return ((asset.price - asset.previousClose) / asset.previousClose) * 100;
}
