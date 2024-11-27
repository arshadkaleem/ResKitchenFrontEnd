export interface Recipe {
    recipeId: number; // Primary key, auto-incremented
    recipeName: string; // Name of the recipe, up to 100 characters
    recipeDescription?: string | null; // Description of the recipe, optional (nullable in database)
    createdAt?: Date; // Default value is the current date/time if not provided
  }
  