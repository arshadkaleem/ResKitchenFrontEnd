export interface VendorItem {
    vendorItemId: number;      // Primary key, auto-incremented
    vendorId: number;          // Foreign key referencing the Vendors table
    itemId: number;            // Foreign key referencing the Items table
    pricePerUnit: number;      // Decimal value for price per unit
    isActive?: boolean;        // Nullable field, true if active
    lastUpdated?: Date;        // Nullable DateTime for the last update
  }
  