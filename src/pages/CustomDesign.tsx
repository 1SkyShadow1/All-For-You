
import { useState, useRef } from 'react';
import { Upload, Download, Palette, Type, Image as ImageIcon, Undo, Redo } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAdmin } from '../contexts/AdminContext';

const CustomDesign = () => {
  const { products } = useAdmin();
  const [selectedProduct, setSelectedProduct] = useState(1); // Use product ID as number
  const [selectedColor, setSelectedColor] = useState('black');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState('Your Text Here');
  const [textColor, setTextColor] = useState('#fbbf24');
  const [textSize, setTextSize] = useState(24);
  const [goldFoil, setGoldFoil] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the first few products from AdminContext for customization
  const customizableProducts = products.filter(p => p.isCustomizable).slice(0, 3).map(p => ({
    id: p.id,
    name: p.name,
    image: p.image,
    price: p.price
  }));

  // Fallback to default products if none are customizable
  const displayProducts = customizableProducts.length > 0 ? customizableProducts : [
    { id: 1, name: 'Custom T-Shirt', image: '/products/tshirt-1.jpg', price: 299.99 },
    { id: 2, name: 'Travel Mug', image: '/products/mug-1.jpg', price: 149.99 },
    { id: 3, name: 'Baseball Cap', image: '/products/cap-1.jpg', price: 199.99 }
  ];

  const colors = [
    { name: 'black', hex: '#000000' },
    { name: 'white', hex: '#ffffff' },
    { name: 'navy', hex: '#1e3a8a' },
    { name: 'red', hex: '#dc2626' },
    { name: 'gold', hex: '#fbbf24' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentProduct = displayProducts.find(p => p.id === selectedProduct);

  return (
    <div className="min-h-screen bg-premium-black">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-foil">
            Custom Design Studio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create your unique design with our advanced customization tools. Upload images, add text, and see your creation come to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Design Tools */}
          <div className="lg:col-span-1 space-y-6">
            {/* Product Selection */}
            <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Palette className="mr-2 text-gold-400" size={20} />
                Select Product
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {displayProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      selectedProduct === product.id
                        ? 'border-gold-400 bg-gold-400/10'
                        : 'border-gray-600 hover:border-gold-400/50'
                    }`}
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    <div className="text-left">
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-gold-400 text-sm">R{product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
              <h3 className="text-white font-semibold mb-4">Base Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      selectedColor === color.name ? 'border-gold-400' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <ImageIcon className="mr-2 text-gold-400" size={20} />
                Upload Image
              </h3>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gold-400/30 rounded-lg p-8 text-center hover:border-gold-400 transition-colors"
              >
                <Upload className="mx-auto mb-2 text-gold-400" size={24} />
                <p className="text-gray-300">Click to upload image</p>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Text Customization */}
            <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Type className="mr-2 text-gold-400" size={20} />
                Add Text
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-premium-black border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-gold-400 focus:outline-none"
                  placeholder="Enter your text"
                />
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Text Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10 rounded-lg border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Text Size: {textSize}px</label>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={goldFoil}
                    onChange={(e) => setGoldFoil(e.target.checked)}
                    className="rounded border-gray-600"
                  />
                  <span className="text-gray-300">Gold Foil Effect (+R50)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="bg-rich-black rounded-xl p-8 border border-gold-600/20 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-xl">Live Preview</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gold-400 hover:bg-gold-400/10 rounded">
                    <Undo size={20} />
                  </button>
                  <button className="p-2 text-gold-400 hover:bg-gold-400/10 rounded">
                    <Redo size={20} />
                  </button>
                  <button className="p-2 text-gold-400 hover:bg-gold-400/10 rounded">
                    <Download size={20} />
                  </button>
                </div>
              </div>

              {/* Product Preview */}
              <div className="relative bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                <div className="relative">
                  <img
                    src={currentProduct?.image}
                    alt={currentProduct?.name}
                    className="max-w-full max-h-full object-contain"
                    style={{ filter: selectedColor !== 'white' ? 'brightness(0.8)' : 'none' }}
                  />
                  
                  {/* Custom Text Overlay */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
                    style={{
                      color: textColor,
                      fontSize: `${textSize}px`,
                      fontWeight: 'bold',
                      textShadow: goldFoil ? '0 0 10px rgba(251, 191, 36, 0.8)' : 'none'
                    }}
                  >
                    {customText}
                  </div>

                  {/* Uploaded Image Overlay */}
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Custom design"
                      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-24 h-24 object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6 p-4 bg-premium-black rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold">Custom {currentProduct?.name}</p>
                    <p className="text-gray-400 text-sm">
                      Base price + customization {goldFoil ? '+ Gold foil' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gold-400">
                      R{((currentProduct?.price || 0) + (goldFoil ? 50 : 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <button className="w-full btn-gold mt-4">
                  Add Custom Design to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomDesign;
