export interface StockConsumption {
    consumptionId: number;      // Primary key, auto-incremented
    itemId: number;             // Foreign key referencing Items table
    itemName: string;           // Name of the item consumed
    quantityUsed: number;       // Decimal value with two decimal places
    consumptionDate: string;    // Date in 'YYYY-MM-DD' format
    notes?: string;             // Nullable field for additional notes
    createdAt: Date;            // DateTime, defaults to current date
  }
  