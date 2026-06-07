import { Listing } from '@/modules/vendor/types';

export const mockCategories = [
  'All',
  'Rice',
  'Soups',
  'Grills',
  'Snacks',
  'Seafood',
  'Beans',
  'Specials',
];

export const mockListings: Listing[] = [
  {
    id: 'lst-001',
    name: 'Jollof Rice',
    category: 'Rice',
    price: 4200,
    stock: 12,
    sold: 340,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-002',
    name: 'Suya Combo',
    category: 'Grills',
    price: 3500,
    stock: 8,
    sold: 215,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-003',
    name: 'Atonke + Ewedu',
    category: 'Soups',
    price: 2800,
    stock: 5,
    sold: 128,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-004',
    name: 'Roundtail + Egusi',
    category: 'Soups',
    price: 3200,
    stock: 3,
    sold: 89,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-005',
    name: 'Pepper Soup',
    category: 'Soups',
    price: 2500,
    stock: 0,
    sold: 201,
    status: 'Out of Stock',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-006',
    name: 'Egusi Soup + Rice',
    category: 'Soups',
    price: 3900,
    stock: 9,
    sold: 267,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-007',
    name: 'Fried Catfish',
    category: 'Seafood',
    price: 5500,
    stock: 6,
    sold: 74,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-008',
    name: 'Moi Moi',
    category: 'Beans',
    price: 800,
    stock: 30,
    sold: 410,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-009',
    name: 'Puff Puff',
    category: 'Snacks',
    price: 500,
    stock: 50,
    sold: 620,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-010',
    name: 'Ofada Special',
    category: 'Specials',
    price: 4800,
    stock: 4,
    sold: 55,
    status: 'Draft',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-011',
    name: 'Akara',
    category: 'Beans',
    price: 600,
    stock: 0,
    sold: 300,
    status: 'Out of Stock',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
  {
    id: 'lst-012',
    name: 'Basmati Rice',
    category: 'Rice',
    price: 3800,
    stock: 15,
    sold: 180,
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1653981608672-aea09b857b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBqb2xsb2YlMjByaWNlfGVufDB8fDB8fHww',
  },
];
