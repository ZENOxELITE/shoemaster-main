// This file contains constants and utility functions for product data
// that can be used across the application

export const PRODUCT_CATEGORIES = [
  { id: 'running', name: 'Running Shoes', description: 'Performance footwear for runners' },
  { id: 'lifestyle', name: 'Lifestyle Sneakers', description: 'Casual comfort meets street style' },
  { id: 'training', name: 'Training Shoes', description: 'Built for intense workouts and fitness' },
] as const;

export const PRODUCT_SIZES = ['7', '8', '9', '10', '11', '12'] as const;

export const PRODUCT_COLORS = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Orange', 'Brown'] as const;

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
] as const;

// export function formatPrice(price: string | number): string {
//   const numPrice = typeof price === 'string' ? parseFloat(price) : price;
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(numPrice);
// }

export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}
export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
