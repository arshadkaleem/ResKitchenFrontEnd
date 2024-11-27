import { ApiService } from './api.service';
import type { Vendor } from '@/types/vendor.type';



  export class VendorsService {
    private static endpoint = '/Vendor';
  
    static async getVendors() {
      return await ApiService.get<Vendor[]>(this.endpoint);
    }
  
    static async getVendorById(id: number) {
      return await ApiService.get<Vendor>(`${this.endpoint}/${id}`);
    }
  
    static async createVendor(vendorData: Omit<Vendor, 'id'>) {
      return await ApiService.post<Vendor>(this.endpoint, vendorData);
    }
  }