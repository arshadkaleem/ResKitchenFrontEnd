import { ApiService } from './api.service';
import type { StockPurchase } from '@/types/stockPurchases.type';



  export class StockPurchasesService {
    private static endpoint = '/StockPurchase';
  
    static async getStockPurchases() {
      return await ApiService.get<StockPurchase[]>(this.endpoint);
    }
  
    static async getStockPurchaseById(id: number) {
      return await ApiService.get<StockPurchase>(`${this.endpoint}/${id}`);
    }
  
    static async createStockPurchase(stockPurchaseData: Omit<StockPurchase, 'id'>) {
      return await ApiService.post<StockPurchase>(this.endpoint, stockPurchaseData);
    }
  }