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
    // Generate products from all available images in root directory
    const imageProducts: ProductImage[] = [];
    
    // Product categories and names for variety
    const categories = ['clothing', 'accessories', 'home', 'art', 'electronics', 'jewelry', 'footwear'];
    const productTypes = [
      'Premium Custom T-Shirt', 'Designer Hoodie', 'Artisan Coffee Mug', 'Custom Baseball Cap',
      'Luxury Watch', 'Designer Jacket', 'Handcrafted Cutting Board', 'Original Abstract Art',
      'Premium Sneakers', 'Leather Wallet', 'Wireless Headphones', 'Designer Sunglasses',
      'Custom Phone Case', 'Premium Backpack', 'Artisan Jewelry', 'Vintage Poster',
      'Ceramic Vase', 'Wooden Sculpture', 'Metal Wall Art', 'Glass Ornament',
      'Fabric Cushion', 'Leather Bag', 'Crystal Pendant', 'Bamboo Utensils',
      'Stone Coaster', 'Silk Scarf', 'Bronze Figurine', 'Porcelain Plate',
      'Canvas Print', 'Wooden Frame', 'Metal Bookmark', 'Glass Paperweight',
      'Fabric Notebook', 'Leather Journal', 'Crystal Keychain', 'Bamboo Phone Stand',
      'Stone Paperweight', 'Silk Tie', 'Bronze Medal', 'Porcelain Cup',
      'Canvas Bag', 'Wooden Box', 'Metal Pin', 'Glass Bottle',
      'Fabric Pillow', 'Leather Belt', 'Crystal Necklace', 'Bamboo Cutting Board',
      'Stone Sculpture', 'Silk Dress', 'Bronze Statue', 'Porcelain Vase',
      'Canvas Painting', 'Wooden Clock', 'Metal Sign', 'Glass Ornament',
      'Fabric Blanket', 'Leather Shoes', 'Crystal Ring', 'Bamboo Lamp',
      'Stone Tile', 'Silk Blouse', 'Bronze Coin', 'Porcelain Bowl',
      'Canvas Tote', 'Wooden Spoon', 'Metal Charm', 'Glass Candle',
      'Fabric Curtain', 'Leather Gloves', 'Crystal Earrings', 'Bamboo Tray',
      'Stone Pendant', 'Silk Scarf', 'Bronze Trophy', 'Porcelain Mug'
    ];

    // Generate products for images 40-115
    for (let i = 40; i <= 115; i++) {
      const productIndex = i - 40;
      if (productIndex < productTypes.length) {
        imageProducts.push({
          id: i,
          name: productTypes[productIndex],
          image: `/IMG-20250618-WA${String(i).padStart(4, '0')}.jpg`,
          category: categories[productIndex % categories.length],
          price: Math.round((Math.random() * 1000 + 50) * 100) / 100,
          description: `Premium quality ${productTypes[productIndex].toLowerCase()} crafted with attention to detail`
        });
      }
    }
    setProducts(imageProducts);
  }, []);

  return { products };
};