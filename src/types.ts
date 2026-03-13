export type UserRole = 'customer' | 'seller' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  documentId: string;
  phoneNumber?: string;
  createdAt: any;
}

export interface Sale {
  id: string;
  sellerId: string;
  customerId?: string;
  amount: number;
  cost: number;
  status: 'pending' | 'completed' | 'cancelled';
  productName: string;
  createdAt: any;
}
