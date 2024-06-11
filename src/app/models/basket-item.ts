export interface BasketItem {
  name: string;
  type: number;
  quantity: number;
  pricePerPatch?: number;
  sumPrice: number;
  category: number;
}
