export interface Vendor {
    vendorId: number;
    vendorName: string;
    contactPerson: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    createdAt: Date;
}