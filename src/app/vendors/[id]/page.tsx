import VendorDetails from '@/components/vendors/VendorDetails'
import React from 'react'

interface VendorPageProps {
    params: {
      id: string;
    };  }
  
  export default async  function VendorPage({ params }: VendorPageProps) {
    const {id} = await params;    
    return <VendorDetails vendorId={parseInt(id)} />;
  }


