export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  collection: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Processing' | 'Shipped' | 'Delivered';
  location: string;
  image: string;
  updatedAt: string;
  salesVol?: number;
  revenue?: number;
  growth?: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerInitial: string;
  customerAvatar?: string;
  productName: string;
  amount: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

export type View = 'dashboard' | 'inventory' | 'sales' | 'add-product' | 'settings';
