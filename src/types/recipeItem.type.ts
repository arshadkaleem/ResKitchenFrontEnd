export interface RecipeItem {
    recipeItemId: number; // Primary key, auto-incremented
    recipeId: number;     // Foreign key referencing Recipes table
    itemId: number;       // Foreign key referencing Items table
    quantityPerPortion: number; // Decimal value with two decimal places
  }
    