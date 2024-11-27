export interface StockPurchase {
    purchaseId: number;        // Primary key, auto-incremented
    vendorItemId: number;      // Foreign key referencing VendorItems table
    quantity: number;          // Decimal value for quantity purchased
    pricePerUnit: number;      // Decimal value for price per unit
    totalAmount: number;       // Decimal value for total amount
    purchaseDate: string;      // Date in 'YYYY-MM-DD' format
    createdAt: Date;           // DateTime, defaults to current date
  }
  