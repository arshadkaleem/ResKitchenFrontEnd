import { ApiService } from './api.service';
import type { Recipe } from '@/types/recipe.type';



  export class RecipesService {
    private static endpoint = '/Recipe';
  
    static async getRecipes() {
      return await ApiService.get<Recipe[]>(this.endpoint);
    }
  
    static async getRecipeById(id: number) {
      return await ApiService.get<Recipe>(`${this.endpoint}/${id}`);
    }
  
    static async createRecipe(recipeData: Omit<Recipe, 'id'>) {
      return await ApiService.post<Recipe>(this.endpoint, recipeData);
    }
  }