import { ApiService } from './api.service';
import type { RecipeItem } from '@/types/recipeItem.type';



  export class RecipesService {
    private static endpoint = '/RecipeItem';
  
    static async getRecipeItems() {
      return await ApiService.get<RecipeItem[]>(this.endpoint);
    }
  
    static async getRecipeItemById(id: number) {
      return await ApiService.get<RecipeItem>(`${this.endpoint}/${id}`);
    }
  
    static async createRecipeItem(recipeItemData: Omit<RecipeItem, 'id'>) {
      return await ApiService.post<RecipeItem>(this.endpoint, recipeItemData);
    }
  }