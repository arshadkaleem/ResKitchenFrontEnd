'use client';
import React, { useState, useEffect } from 'react';
import { ItemsService } from '@/services/items.service';
import type { Item } from '@/types/item.type';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await ItemsService.getItems();
        console.log('Raw API response:', response); // Debug log

        const itemData = Array.isArray(response) 
          ? response 
          : response?.data 
          ? response.data 
          : [];

        console.log('Processed item data:', itemData); // Debug log
        setItems(itemData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching items');
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);


  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Item List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Item Description</TableHead>
              <TableHead>Unit Of Measurement</TableHead>
              <TableHead>Min Stock Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {items.map((item) => (
  <TableRow 
    key={item.itemId} // Ensure this is a unique identifier
    className="hover:bg-muted/50 cursor-pointer"
     // Alternative to Link if needed
  >
    <TableCell className="font-medium">{item.itemName}</TableCell>
    <TableCell>{item.itemDescription}</TableCell>
    <TableCell>{item.unitOfMeasurement}</TableCell>
    <TableCell>{item.minimumStockLevel}</TableCell>
  </TableRow>
))}
          </TableBody>
        </Table>
      </div>
    </>
  );
  
};

export default ItemList;
