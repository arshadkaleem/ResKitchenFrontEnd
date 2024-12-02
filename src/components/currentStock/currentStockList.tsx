'use client';
import React, { useState, useEffect } from 'react';
import { CurrentStockService } from '@/services/currentStock.service';
import type { CurrentStock } from '@/types/currentStock.type';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const CurrentStockList = () => {
  const [currentStocks, setCurrentStocks] = useState<CurrentStock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentStocks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await CurrentStockService.getCurrentStocks();
        console.log('Raw API response:', response); // Debug log

        const currentStockData = Array.isArray(response) 
          ? response 
          : response?.data 
          ? response.data 
          : [];

        console.log('Processed current stock data:', currentStockData); // Debug log
        setCurrentStocks(currentStockData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching current stocks');
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentStocks();
  }, []);

  if (isLoading) {
    return <div>Loading current stocks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Current Stock List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStocks.map((stock) => (
              <TableRow key={stock.currentStockId} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{stock.itemName}</TableCell>
                <TableCell>{stock.quantityInStock}</TableCell>
                <TableCell>{new Date(stock.lastUpdated).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CurrentStockList;
