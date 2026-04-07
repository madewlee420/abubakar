import React, { useState, useRef } from 'react';
import { ArrowLeft, Heart, ChevronDown, Package, ShoppingCart, BarChart, Users, Settings, Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const AddProduct = () => {
  const [previewImage, setPreviewImage] = useState<string>("https://lh3.googleusercontent.com/aida-public/AB6AXuC3XlaYQ6K65tqHkPn_tW5Ts4tVVXaGCZujAcOd0dYWejTBPO8mMfAxdtZc3v2lfgyjizdIe8C-A-XREEBydjNkvLLo7I6GfvCTs8HPZ17BS4AtyeH5v2Wo7WKCaXSO4uX6CQYKjk7W4D6m0scRIruANTW5smTyIm9ebaHHQ8YK97dw7ah1XOz3yj2-lfAD4KC9Y2cmbGKI9jmddOtYzLHen0AXGBqwlJVAIAeJZMZe-x-zmACPhokLj3E1VAJvTLnvgobMAYrB8vw");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column: Input Form */}
        <div className="flex-1 space-y-8">
          <section>
            <h2 className="text-2xl font-extrabold text-on-surface mb-6 tracking-tight">General Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-2">Product Name</label>
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium placeholder:text-outline/50 outline-none" 
                  placeholder="e.g. Minimalist Chronograph" 
                  type="text"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-2">Product Image</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video bg-surface-container-highest rounded-2xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-surface-container-high transition-all group relative overflow-hidden"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {previewImage.includes('blob') ? (
                    <>
                      <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                          <Upload className="w-6 h-6" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-outline/40 mb-3 group-hover:text-primary transition-colors">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-on-surface-variant">Click to upload or drag and drop</p>
                      <p className="text-[10px] text-outline/60 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-2">Category</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 appearance-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium outline-none">
                      <option>Watchwear</option>
                      <option>Electronics</option>
                      <option>Apparel</option>
                      <option>Home Decor</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline w-4 h-4" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-2">Collection</label>
                  <input 
                    className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium outline-none" 
                    placeholder="Autumn 24" 
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-on-surface mb-6 tracking-tight">Inventory & Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-2">Base Price ($)</label>
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium outline-none" 
                  placeholder="0.00" 
                  type="number"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-2">Stock Quantity</label>
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium outline-none" 
                  placeholder="0" 
                  type="number"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-on-surface mb-6 tracking-tight">Product Description</h2>
            <textarea 
              className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium outline-none" 
              placeholder="Crafted with precision, this minimalist timepiece..." 
              rows={5}
            ></textarea>
          </section>
        </div>

        {/* Right Column: Storefront Preview */}
        <div className="lg:w-[400px]">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Storefront Preview</h2>
              <span className="bg-primary-fixed text-on-primary-fixed text-[10px] px-3 py-1 rounded-full font-bold uppercase">Live View</span>
            </div>
            
            <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-2xl shadow-on-surface/5 group border border-outline-variant/10">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={previewImage} 
                  alt="Product Preview"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/80 backdrop-blur-md text-primary font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">New Arrival</span>
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-tertiary font-bold uppercase tracking-widest mb-1">Watchwear</p>
                    <h3 className="text-xl font-bold text-on-surface leading-tight">Minimalist Chronograph</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-primary">$249</p>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">
                  Experience the pinnacle of functional design. Engineered for those who value time and texture in equal measure.
                </p>
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm tracking-tight hover:opacity-90 transition-all">
                    Add to Bag
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-xl hover:bg-surface-container-high transition-colors">
                    <Heart className="w-5 h-5 text-on-surface-variant" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Est. Conversion</p>
                <p className="text-xl font-bold text-primary">4.2%</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Visibility</p>
                <p className="text-xl font-bold text-tertiary">High</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
