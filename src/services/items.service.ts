import { ApiService } from './api.service';
import type { Item } from '@/types/item.type';



  export class ItemsService {
    private static endpoint = '/Item';
  
    static async getItems() {
      return await ApiService.get<Item[]>(this.endpoint);
    }
  
    static async getItemById(id: number) {
      return await ApiService.get<Item>(`${this.endpoint}/${id}`);
    }
  
    static async createItem (itemData: Omit<Item, 'id'>) {
      return await ApiService.post<Item>(this.endpoint, itemData);
    }
  }