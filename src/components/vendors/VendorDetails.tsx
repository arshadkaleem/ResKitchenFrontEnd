'use client';
import { useState, useEffect } from 'react';
import { VendorsService } from '@/services/vendors.service';
import type { Vendor } from '@/types/vendor.type';
import Link from 'next/link';
import Loader from '../Loader';


    interface VendorDetailsProps {
        vendorId: number;
      }
const VendorDetails = ({ vendorId }: VendorDetailsProps) => {

    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      loadVendor();
    }, [vendorId]);


    const loadVendor = async () => {
      console.log('Loading vendor with ID:', vendorId);
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await VendorsService.getVendorById(vendorId);
        console.log('Raw API response:', response);              
        
        
        if (response?.data) {
          setVendor(response.data);
        }
       
        
        

      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching vendor');
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      return <Loader />;
    }
  
    if (error) {
      return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    if (!vendor) {
      return <div className="text-center p-4">Vendor not found</div>;
    }

  return (
    <>
    <div className="p-4 max-w-2xl mx-auto">
        <div className="mb-4">
          <Link href="/vendors" className="text-blue-500 hover:text-blue-700">
            ← Back to Vendors
          </Link>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">{vendor.vendorName}</h1>
          
          <div className="space-y-3">
            <div>
              <label className="font-semibold">Contact Person:</label>
              <p>{vendor.contactPerson}</p>
            </div>
            
            <div>
              <label className="font-semibold">Email:</label>
              <p>{vendor.email}</p>
            </div>
            
            <div>
              <label className="font-semibold">Phone:</label>
              <p>{vendor.phone}</p>
            </div>
            
            <div>
              <label className="font-semibold">Address:</label>
              <p>{vendor.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorDetails