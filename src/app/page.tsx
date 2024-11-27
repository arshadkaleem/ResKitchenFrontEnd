'use client';
import { useState, useEffect } from 'react';
import { VendorsService } from '@/services/vendors.service';
import type { Vendor } from '@/types/vendor.type';
import Loader from '@/components/Loader';

export default function Home() {

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
    <main>
     <Loader />
    </main>
  );
}
