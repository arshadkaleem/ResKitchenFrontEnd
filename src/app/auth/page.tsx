'use client';

import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

interface LoginFormValues {
  username: string
  password: string
}

export default function Login() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    // Handle login logic here
    console.log('Login data:', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full p-8">
        <div className="flex justify-center mb-6">
          <Image src="/assets/logo.png" alt="Logo" width={150} height={150} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-white border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password"
                      className="bg-white border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-teal-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-teal-500 text-white hover:bg-teal-600">
              Login
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}

