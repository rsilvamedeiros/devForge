import { Asset } from '../models/asset.model';

export const MOCK_ASSETS: Asset[] = [
  { id: '1', symbol: 'PETR4', name: 'Petrobras PN', sector: 'Energia', price: 38.42, previousClose: 37.9, volume: 42_500_000, active: true },
  { id: '2', symbol: 'VALE3', name: 'Vale ON', sector: 'Mineração', price: 61.15, previousClose: 61.8, volume: 31_200_000, active: true },
  { id: '3', symbol: 'ITUB4', name: 'Itaú Unibanco PN', sector: 'Financeiro', price: 34.87, previousClose: 34.5, volume: 28_900_000, active: true },
  { id: '4', symbol: 'BBDC4', name: 'Bradesco PN', sector: 'Financeiro', price: 14.22, previousClose: 14.4, volume: 25_600_000, active: true },
  { id: '5', symbol: 'ABEV3', name: 'Ambev ON', sector: 'Consumo', price: 12.65, previousClose: 12.5, volume: 18_300_000, active: true },
  { id: '6', symbol: 'WEGE3', name: 'WEG ON', sector: 'Industrial', price: 40.33, previousClose: 39.9, volume: 9_800_000, active: true },
  { id: '7', symbol: 'MGLU3', name: 'Magazine Luiza ON', sector: 'Varejo', price: 8.91, previousClose: 9.4, volume: 51_000_000, active: true },
  { id: '8', symbol: 'B3SA3', name: 'B3 ON', sector: 'Financeiro', price: 11.78, previousClose: 11.6, volume: 22_100_000, active: true },
  { id: '9', symbol: 'RENT3', name: 'Localiza ON', sector: 'Consumo', price: 46.02, previousClose: 46.9, volume: 6_400_000, active: true },
  { id: '10', symbol: 'LREN3', name: 'Lojas Renner ON', sector: 'Varejo', price: 17.35, previousClose: 17.1, volume: 12_700_000, active: true },
  { id: '11', symbol: 'SUZB3', name: 'Suzano ON', sector: 'Mineração', price: 52.4, previousClose: 53.1, volume: 5_900_000, active: false },
  { id: '12', symbol: 'GGBR4', name: 'Gerdau PN', sector: 'Industrial', price: 18.6, previousClose: 18.2, volume: 14_500_000, active: true },
];
