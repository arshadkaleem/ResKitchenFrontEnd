
'use client';
import React from 'react'

import { useState, useEffect } from 'react';
import { VendorsService } from '@/services/vendors.service';
import type { Vendor } from '@/types/vendor.type';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';


const VendorList = () => {

    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadVendors = async () => {
          try {
    
            setIsLoading(true);
            setError(null);
    
            const response = await VendorsService.getVendors();
            console.log('Raw API response:', response); // Debug log
           
            const vendorData = Array.isArray(response) 
              ? response 
              : response?.data 
              ? response.data 
              : [];
            
            console.log('Processed vendor data:', vendorData); // Debug log
            setVendors(vendorData);
    
           
          } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred while fetching users');
          } finally {
            setIsLoading(false);
          }
        };
    
        loadVendors();
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
      <h1 className="text-2xl font-bold mb-4">Vendor List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Contact Person</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.vendorId} className="hover:bg-muted/50 cursor-pointer">
              <Link href={`/vendors/${vendor.vendorId}`} className="contents">
                <TableCell className="font-medium">{vendor.vendorName}</TableCell>
                <TableCell>{vendor.contactPerson}</TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </>
  )
}

export default VendorList