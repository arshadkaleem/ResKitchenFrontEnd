import { ApiService } from './api.service';
import type { CurrentStock } from '@/types/currentStock.type';



  export class CurrentStockService {
    private static endpoint = '/CurrentStock';
  
    static async getCurrentStocks() {
      return await ApiService.get<CurrentStock[]>(this.endpoint);
    }
  
    static async getCurrentStockById(id: number) {
      return await ApiService.get<CurrentStock>(`${this.endpoint}/${id}`);
    }
  
    static async createCurrentStock(currentStockData: Omit<CurrentStock, 'id'>) {
      return await ApiService.post<CurrentStock>(this.endpoint, currentStockData);
    }
  }