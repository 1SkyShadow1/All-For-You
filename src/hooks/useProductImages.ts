import { useState, useEffect } from 'react';

interface ProductImage {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

export const useProductImages = () => {
  const [products, setProducts] = useState<ProductImage[]>([]);

  useEffect(() => {
    // Map the actual images from the root directory to products
    const imageProducts: ProductImage[] = [
      {
        id: 1,
        name: "Premium Custom T-Shirt",
        image: "/IMG-20250618-WA0040.jpg",
        category: "clothing",
        price: 299.99,
        description: "High-quality custom t-shirt with premium materials"
      },
      {
        id: 2,
        name: "Designer Hoodie",
        image: "/IMG-20250618-WA0041.jpg",
        category: "clothing",
        price: 599.99,
        description: "Comfortable designer hoodie for all seasons"
      },
      {
        id: 3,
        name: "Artisan Coffee Mug",
        image: "/IMG-20250618-WA0042.jpg",
        category: "accessories",
        price: 149.99,
        description: "Handcrafted ceramic mug for coffee lovers"
      },
      {
        id: 4,
        name: "Custom Baseball Cap",
        image: "/IMG-20250618-WA0043.jpg",
        category: "accessories",
        price: 199.99,
        description: "Stylish baseball cap with custom embroidery"
      },
      {
        id: 5,
        name: "Luxury Watch",
        image: "/IMG-20250618-WA0044.jpg",
        category: "accessories",
        price: 1299.99,
        description: "Premium timepiece with elegant design"
      },
      {
        id: 6,
        name: "Designer Jacket",
        image: "/IMG-20250618-WA0045.jpg",
        category: "clothing",
        price: 899.99,
        description: "Fashionable jacket for modern lifestyle"
      },
      {
        id: 7,
        name: "Handcrafted Cutting Board",
        image: "/IMG-20250618-WA0046.jpg",
        category: "home",
        price: 499.99,
        description: "Premium wooden cutting board for kitchen"
      },
      {
        id: 8,
        name: "Original Abstract Art",
        image: "/IMG-20250618-WA0047.jpg",
        category: "art",
        price: 899.99,
        description: "Unique abstract artwork for home decoration"
      },
      {
        id: 9,
        name: "Premium Sneakers",
        image: "/IMG-20250618-WA0048.jpg",
        category: "footwear",
        price: 799.99,
        description: "Comfortable and stylish premium sneakers"
      },
      {
        id: 10,
        name: "Leather Wallet",
        image: "/IMG-20250618-WA0049.jpg",
        category: "accessories",
        price: 249.99,
        description: "Genuine leather wallet with multiple compartments"
      },
      {
        id: 11,
        name: "Wireless Headphones",
        image: "/IMG-20250618-WA0050.jpg",
        category: "electronics",
        price: 399.99,
        description: "High-quality wireless headphones with noise cancellation"
      },
      {
        id: 12,
        name: "Designer Sunglasses",
        image: "/IMG-20250618-WA0051.jpg",
        category: "accessories",
        price: 349.99,
        description: "Stylish sunglasses with UV protection"
      },
      {
        id: 13,
        name: "Custom Phone Case",
        image: "/IMG-20250618-WA0052.jpg",
        category: "electronics",
        price: 79.99,
        description: "Protective phone case with custom design"
      },
      {
        id: 14,
        name: "Premium Backpack",
        image: "/IMG-20250618-WA0053.jpg",
        category: "accessories",
        price: 449.99,
        description: "Durable backpack for travel and daily use"
      },
      {
        id: 15,
        name: "Artisan Jewelry",
        image: "/IMG-20250618-WA0054.jpg",
        category: "jewelry",
        price: 599.99,
        description: "Handcrafted jewelry with unique design"
      }
    ];

    setProducts(imageProducts);
  }, []);

  return { products };
};