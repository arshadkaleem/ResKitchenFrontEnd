export interface Item {
    itemId: number;
    itemName: string;
    itemDescription: string | null;
    unitOfMeasurement: string;
    minimumStockLevel: number;
    createdAt: Date;
  }