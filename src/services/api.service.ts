import { apiClient } from '@/lib/axios';
import { ApiResponse } from '@/types/api.types';

export class ApiService {
  static async get<T>(endpoint: string) {
    try {
      const response = await apiClient.get<ApiResponse<T>>(endpoint);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async post<T>(endpoint: string, data: any) {
    try {
      const response = await apiClient.post<ApiResponse<T>>(endpoint, data);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async put<T>(endpoint: string, data: any) {
    try {
      const response = await apiClient.put<ApiResponse<T>>(endpoint, data);
      return response ;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async delete<T>(endpoint: string) {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private static handleError(error: any) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server');
    } else {
      // Other errors
      throw new Error('Error setting up request');
    }
  }
}