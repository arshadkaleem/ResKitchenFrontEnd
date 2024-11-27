'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VendorsService } from '@/services/vendors.service';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const vendorSchema = z.object({
  vendorName: z.string().min(5, 'Vendor Name must be at least 5 characters'),
  contactPerson: z.string().min(5, 'Contact Person must be at least 5 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().nullable(),
  address: z.string().nullable(),
});

type VendorFormData = z.infer<typeof vendorSchema>;

export default function VendorForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      vendorName: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (data: VendorFormData) => {
    try {
      setIsSubmitting(true);
      await VendorsService.createVendor({
        ...data,
        vendorId: 0,
        createdAt: new Date(),
      });
      router.push('/vendors');
    } catch (error) {
      console.error('Failed to create vendor:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Failed to create vendor. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <Link href="/vendors" className="text-blue-500 hover:text-blue-700">
          ← Back to Vendors
        </Link>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
          <h1 className="text-2xl font-bold">Create New Vendor</h1>

          <FormField
            control={form.control}
            name="vendorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field}  value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field}  value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Link href="/vendors">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Vendor'}
            </Button>
          </div>

          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        </form>
      </Form>
    </div>
  );
}

