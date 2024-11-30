import { ApiService } from './api.service';
import type { StockConsumption } from '@/types/stockConsumption.type';



  export class StockConsumptionsService {
    private static endpoint = '/StockConsumption';
  
    static async getStockConsumptions() {
      return await ApiService.get<StockConsumption[]>(this.endpoint);
    }
  
    static async getStockConsumptionById(id: number) {
      return await ApiService.get<StockConsumption>(`${this.endpoint}/${id}`);
    }
  
    static async createStockConsumption(stockConsumptionData: Omit<StockConsumption, 'id'>) {
      return await ApiService.post<StockConsumption>(this.endpoint, stockConsumptionData);
    }
  }