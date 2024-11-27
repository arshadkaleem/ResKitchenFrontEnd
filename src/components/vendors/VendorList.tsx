
'use client';
import React from 'react'

import { useState, useEffect } from 'react';
import { VendorsService } from '@/services/vendors.service';
import type { Vendor } from '@/types/vendor.type';
import Link from 'next/link';


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
      <div className="space-y-4">
        {vendors.map((vendor) => (  
<>
    <Link href={{ pathname: `/vendors/${vendor.vendorId}`}}>
            <div key={vendor.vendorId} className="border p-4 rounded-lg">
                <h2 className="font-semibold">{vendor.vendorName}</h2>
            <p className="text-gray-600">{vendor.contactPerson}</p>
          </div>
          </Link>
</>


          
         
        ))}
      </div>
    </div>
    </>
  )
}

export default VendorList