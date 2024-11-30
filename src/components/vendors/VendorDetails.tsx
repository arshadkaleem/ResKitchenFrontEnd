'use client';
import { useState, useEffect } from 'react';
import { VendorsService } from '@/services/vendors.service';
import type { Vendor } from '@/types/vendor.type';
import Link from 'next/link';
import Loader from '../Loader';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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
        <Button variant="link" asChild className="p-0">
          <Link href="/vendors" className="flex items-center text-primary hover:text-primary/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vendors
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{vendor.vendorName}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "Contact Person", value: vendor.contactPerson },
              { label: "Email", value: vendor.email },
              { label: "Phone", value: vendor.phone },
              { label: "Address", value: vendor.address },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
    </>
  )
}

export default VendorDetails