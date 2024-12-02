'use client';
import React, { useState, useEffect } from 'react';
import { StockConsumptionsService } from '@/services/stockConsumption.service';
import type { StockConsumption } from '@/types/stockConsumption.type';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const StockConsumptionList = () => {
  const [stockConsumptions, setStockConsumptions] = useState<StockConsumption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStockConsumptions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await StockConsumptionsService.getStockConsumptions();
        console.log('Raw API response:', response); // Debug log

        const stockConsumptionData = Array.isArray(response) 
          ? response 
          : response?.data 
          ? response.data 
          : [];

        console.log('Processed stock consumption data:', stockConsumptionData); // Debug log
        setStockConsumptions(stockConsumptionData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching stock consumptions');
      } finally {
        setIsLoading(false);
      }
    };

    loadStockConsumptions();
  }, []);

  if (isLoading) {
    return <div>Loading stock consumptions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Stock Consumption List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity Consumed</TableHead>
              <TableHead>Consumption Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockConsumptions.map((consumption) => (
              <TableRow key={consumption.consumptionId} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{consumption.itemName}</TableCell>
                <TableCell>{consumption.quantityUsed}</TableCell>
                <TableCell>{new Date(consumption.consumptionDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default StockConsumptionList;
