import { Product, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Velocity Elite Runner',
    sku: 'SHOE-2024-VLR',
    category: 'Footwear',
    collection: 'Spring 24',
    price: 1240,
    stock: 142,
    status: 'In Stock',
    location: 'WH-Alpha-B42',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTqlhXQUlXSzp8g-EyfFYyxlEqJ0nWkB79OsoBiCiZZKy5YQ2Uf15nY6w1dOJOrAEKPm5Gr8y-fZfIlns1hlrDOpJaEeXkwudHZS148PTRbAIB4YXnOj93f5ZxFRSx4mUlOoM9NMpq1xqgup6Ho2SVWa7H7NtrL2gzZgenwKz5qP41cifbfwQZyVedd4GyOOPvJ5oaad26sMyaZ4TRxGnOBvlEGl_q_KmwHVnPeb9W40tMO_OG30VDxU9tD50MrgGSeiwyw5oXGbs',
    updatedAt: '2h ago',
    salesVol: 248,
    revenue: 24552,
    growth: 5.2
  },
  {
    id: '2',
    name: 'Chronos Minimalist Watch',
    sku: 'WTCH-CH-99',
    category: 'Watchwear',
    collection: 'Autumn 24',
    price: 599,
    stock: 0,
    status: 'Out of Stock',
    location: 'WH-Beta-A01',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACGFr-mjx0Awtq4nIPbPBGfwQX1vhAdJ3wFiE1YlyOU_5_fuK7Lp3SVlF_lO56BoaHm5uIcntSNmfUjfnir0vfOp70mmJY4US5YFTTfJRN0qi9B0euJ4apXhLWgyXDptkq5uZAvHGJFvaEJIVszGbKQxhNwQBSiUcDtgaiFK-42WKuJkel3dHd8X7Y7AVnY85s8Ebqh2g_VSpjQniRzxRnxb1XYeapIEgB8sUdkaqWTiyIVX3Jwd_VekWo4yxUIgydRJJNGulzU_g',
    updatedAt: 'Oct 12 Out',
    salesVol: 102,
    revenue: 30600,
    growth: -2.4
  },
  {
    id: '3',
    name: 'Sonic Pro Headphones',
    sku: 'AUDI-SP-X',
    category: 'Electronics',
    collection: 'Pro Series',
    price: 299,
    stock: 12,
    status: 'Low Stock',
    location: 'WH-Alpha-C15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyAgsMX_qcdTkYSZ7IbCdTs6CnBsJqwZGPBtm4nYHiJBC5l31qb3Hr3QvvqbZZmIpz8MFvZclqa2bkhEHXzZZ4LkaotK2yQ1_dJh8-XIJhL52iKejXHEsVfNjXDnc4Nc0Tpva6H5Y8k3BiUKYcBhECz7hTMS8S8qM_VrA9vkhRL66p0-2__2gb_T_CzoNe6h9eCfYXlJwhOXkLakZQ-OFb2GuXX6SnRigOoSJtRluYhcxMY7KODFDx6HkK3JUnIn_BOb2zOHC2kIs',
    updatedAt: 'Threshold Reached',
    salesVol: 612,
    revenue: 58140,
    growth: 18.0
  },
  {
    id: '4',
    name: 'Nomad Leather Pack',
    sku: 'BAGS-NOM-L',
    category: 'Apparel',
    collection: 'Travel 24',
    price: 450,
    stock: 54,
    status: 'In Stock',
    location: 'WH-Gamma-F02',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw-7ecaCtzgoOPjTqMrP1ZK7dHSpQxkcvWo0S0Sxkp78fu39d_5bcXAXDG-rDog5x-PMlL2KHAExaElOTVIMV6M4ZZmwve0zNdKv9FKFRpCS8dRU47sMVbz1jALfWbFFXCjqHpXeK4KlRsQWAflBqPBGjmyVIYcZ9A82TSpEwXUUrKs_emEMiDNFgvIo_3fzmPaCP6JeCaFiTjb5rgYaTx-igvhEKBYry3bfV1rn68Mp2-7ppdjO-I4i-SZwo_nZT_oNMQPi0GW5g',
    updatedAt: '4d ago',
    salesVol: 156,
    revenue: 70200,
    growth: 12.5
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '#ORD-8821',
    customerName: 'Julianne Deaton',
    customerInitial: 'JD',
    productName: 'Architecture Pro Kit',
    amount: 1240.00,
    status: 'Processing',
    date: '2024-04-07'
  },
  {
    id: '#ORD-8819',
    customerName: 'Marcus Thorne',
    customerInitial: 'MT',
    customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzNFtgcD6HCp_09R32DrzAH9bf3-C-OpmKmrwsxv7PJeIGCcIkvq_szqcjS7_TAR8XpzUJbIrHzVFqSjZsRRh7kyo_xFBH_h83xdihJcMVSsYQpQblebRM3SemUbPRwGbh70tV7Z0gvHn8B-7auXyHoCHH7LmRtu7r1uxDjI5et5OJi0hrNG-lB2ZS7FL95Cf6nPU7UQ8IBTJZ5wHOKU3EmQD0CtUOkTXFM02zfanSQokT5hPWdKsAu_bgJXHlCTeLy0GocCl2JRU',
    productName: 'V-Ray Render Pack',
    amount: 599.00,
    status: 'Shipped',
    date: '2024-04-07'
  },
  {
    id: '#ORD-8815',
    customerName: 'Sarah Reiley',
    customerInitial: 'SR',
    productName: 'Lumina Studio Desk',
    amount: 2450.00,
    status: 'Delivered',
    date: '2024-04-06'
  }
];
