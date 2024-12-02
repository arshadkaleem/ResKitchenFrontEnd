// src/services/types.ts

export interface CurrentStock {
  currentStockId: number;
  itemId: number;
  itemName: string;
  quantityInStock: number;
  lastUpdated: string;
}
