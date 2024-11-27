
<div className="p-4 max-w-2xl mx-auto">
  <div className="mb-4">
    <Link href="/vendors" className="text-blue-500 hover:text-blue-700">
      ← Back to Vendors
    </Link>
  </div>

  <Form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold mb-6">Create New Vendor</h1>

    {error && (
      <FormMessage className="mb-4 p-4 bg-red-50 text-red-500 rounded">
        {error}
      </FormMessage>
    )}

    <div className="space-y-4">
      <FormItem>
        <FormLabel>Vendor Name *</FormLabel>
        <Input
          type="text"
          name="vendorName"
          value={formData.vendorName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormItem>

      <FormItem>
        <FormLabel>Contact Person *</FormLabel>
        <Input
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormItem>

      <FormItem>
        <FormLabel>Email *</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormItem>

      <FormItem>
        <FormLabel>Phone</FormLabel>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormItem>

      <FormItem>
        <FormLabel>Address</FormLabel>
        <TextArea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormItem>

      <div className="flex justify-end space-x-4">
        <Link
          href="/vendors"
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 ${
            isSubmitting ? 'cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Vendor'}
        </Button>
      </div>
    </div>
  </Form>
</div>
