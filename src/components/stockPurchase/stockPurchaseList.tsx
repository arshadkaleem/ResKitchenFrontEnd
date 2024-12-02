'use client';
import React, { useState, useEffect } from 'react';
import { StockPurchasesService } from '@/services/stockPurchase.service';
import type { StockPurchase } from '@/types/stockPurchases.type';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const StockPurchaseList = () => {
  const [stockPurchases, setStockPurchases] = useState<StockPurchase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStockPurchases = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await StockPurchasesService.getStockPurchases();
        console.log('Raw API response:', response); // Debug log

        const stockPurchaseData = Array.isArray(response) 
          ? response 
          : response?.data 
          ? response.data 
          : [];

        console.log('Processed stock purchase data:', stockPurchaseData); // Debug log
        setStockPurchases(stockPurchaseData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching stock purchases');
      } finally {
        setIsLoading(false);
      }
    };

    loadStockPurchases();
  }, []);

  if (isLoading) {
    return <div>Loading stock purchases...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Stock Purchase List</h1>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Purchase Date</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity </TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockPurchases.map((purchase) => (
              <TableRow key={purchase.purchaseId} className="hover:bg-muted/50 cursor-pointer">
                <TableCell>{new Date(purchase.purchaseDate).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{purchase.vendorName}</TableCell>
                <TableCell>{purchase.itemName}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>{purchase.pricePerUnit}</TableCell>
                <TableCell>{purchase.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default StockPurchaseList;
