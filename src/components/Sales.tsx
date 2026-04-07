import React, { useRef, useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, TrendingUp, AlertTriangle, Upload, FileText, CheckCircle2, Loader2, X, Edit2, Copy, Archive, Trash2, ExternalLink } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Sales = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  
  // New interaction states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'Today' | '7D' | '30D'>('30D');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Simulated data for different periods
  const periodStats = {
    'Today': { revenue: '$4,280', units: '38', ticket: '$112', growth: '+2.1%' },
    '7D': { revenue: '$32,150', units: '284', ticket: '$113', growth: '+5.4%' },
    '30D': { revenue: '$142,840', units: '1,204', ticket: '$118', growth: '+12.4%' }
  };

  const stats = periodStats[selectedPeriod];

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenuId(null);
      setIsFilterOpen(false);
    };
    if (activeMenuId || isFilterOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeMenuId, isFilterOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file.name);
    }
  };

  const simulateUpload = (name: string) => {
    setFileName(name);
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 2000);
  };

  const resetUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadStatus('idle');
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFilterOpen(!isFilterOpen);
  };

  // Filter products
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">Product Sales</h1>
          <p className="text-sm text-on-surface-variant font-medium">Monitoring business performance and inventory health.</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex bg-surface-container-high/50 p-1 rounded-xl w-fit border border-outline-variant/10"
        >
          {(['Today', '7D', '30D'] as const).map((p) => (
            <button 
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={cn(
                "px-5 py-2 text-[10px] font-bold font-headline uppercase tracking-widest transition-all rounded-lg",
                selectedPeriod === p ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-primary"
              )}
            >
              {p}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary p-7 rounded-2xl flex flex-col justify-between text-white shadow-md relative overflow-hidden group"
        >
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Total {selectedPeriod} Revenue</p>
            <AnimatePresence mode="wait">
              <motion.h3 
                key={stats.revenue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-4xl font-extrabold tracking-tighter"
              >
                {stats.revenue}
              </motion.h3>
            </AnimatePresence>
            <div className="mt-4 inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>{stats.growth} vs LY</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-7 rounded-2xl border border-outline-variant/15 shadow-sm"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Active Units</p>
          <AnimatePresence mode="wait">
            <motion.h3 
              key={stats.units}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-4xl font-extrabold tracking-tight text-on-surface"
            >
              {stats.units}
            </motion.h3>
          </AnimatePresence>
          <div className="mt-4 flex items-center gap-2 text-tertiary">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[11px] font-bold">12 Items Low Stock</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-7 rounded-2xl border border-outline-variant/15 shadow-sm"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Avg. Ticket</p>
          <AnimatePresence mode="wait">
            <motion.h3 
              key={stats.ticket}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-4xl font-extrabold tracking-tight text-on-surface"
            >
              {stats.ticket}
            </motion.h3>
          </AnimatePresence>
          <div className="mt-5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Upload Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => uploadStatus === 'idle' && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-primary'); }}
        onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-primary'); }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('border-primary');
          const file = e.dataTransfer.files?.[0];
          if (file) simulateUpload(file.name);
        }}
        className={cn(
          "bg-white p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center space-y-4 transition-all cursor-pointer",
          uploadStatus === 'idle' ? "border-outline-variant/30 group hover:border-primary/40" : "border-primary/20 bg-primary/5"
        )}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".csv,.xlsx,.xls"
          onChange={handleFileSelect}
        />

        <AnimatePresence mode="wait">
          {uploadStatus === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-on-surface">Bulk Upload Products</h4>
                <p className="text-sm text-slate-500 max-w-md mx-auto">Drag and drop your CSV or Excel file here to import multiple products at once. Supports .csv, .xlsx, and .xls formats.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors">Select File</button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Download Template
                </button>
              </div>
            </motion.div>
          )}

          {uploadStatus === 'uploading' && (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-4 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-on-surface">Uploading {fileName}...</h4>
                <p className="text-sm text-slate-500">Processing your product data. This will only take a moment.</p>
              </div>
              <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-primary animate-[upload-progress_2s_ease-in-out]"></div>
              </div>
            </motion.div>
          )}

          {uploadStatus === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-4 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-on-surface">Upload Successful!</h4>
                <p className="text-sm text-slate-500">Successfully imported products from <span className="font-bold text-on-surface">{fileName}</span>.</p>
              </div>
              <button 
                onClick={resetUpload}
                className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 mx-auto"
              >
                <X className="w-4 h-4" />
                Clear & Upload Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-outline-variant/15 rounded-xl py-3.5 pl-12 pr-6 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 outline-none text-sm font-medium text-on-surface placeholder:text-slate-400 transition-all shadow-sm" 
            placeholder="Search product, SKU, or category..." 
            type="text"
          />
        </div>
        <div className="relative">
          <button 
            onClick={toggleFilter}
            className={cn(
              "flex items-center justify-center gap-2 bg-white text-on-surface border border-outline-variant/15 font-bold px-6 py-3.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm",
              isFilterOpen && "bg-slate-50 border-primary/30"
            )}
          >
            <Filter className="w-4 h-4" />
            <span className="font-headline uppercase tracking-widest text-[10px]">Filter: {selectedCategory}</span>
          </button>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-outline-variant/15 py-2 z-50 origin-top-right"
              >
                <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</p>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-xs font-bold transition-colors",
                      selectedCategory === cat ? "text-primary bg-primary/5" : "text-on-surface hover:bg-slate-50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl border border-outline-variant/15 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-outline-variant/10">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Product Details</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Sales Vol.</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Revenue</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">Stock Level</th>
                <th className="px-8 py-5 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                          <img 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                            src={product.image} 
                            alt={product.name}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{product.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-headline font-extrabold text-base text-on-surface">{product.salesVol}</p>
                      <p className={cn(
                        "text-[10px] font-bold uppercase mt-0.5",
                        (product.growth || 0) >= 0 ? "text-primary" : "text-tertiary"
                      )}>
                        {(product.growth || 0) >= 0 ? '+' : ''}{product.growth}%
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-headline font-extrabold text-base text-on-surface">${product.revenue?.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={cn(
                        "inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                        product.status === 'Low Stock' ? "bg-red-50 text-error gap-1 items-center" : "bg-slate-100 text-slate-600"
                      )}>
                        {product.status === 'Low Stock' && <AlertTriangle className="w-3 h-3" />}
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right relative">
                      <button 
                        onClick={(e) => toggleMenu(e, product.id)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          activeMenuId === product.id ? "bg-primary/10 text-primary" : "text-slate-300 hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>

                      <AnimatePresence>
                        {activeMenuId === product.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, x: 10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 10 }}
                            className="absolute right-8 top-1/2 -translate-y-1/2 z-50 w-48 bg-white rounded-xl shadow-xl border border-outline-variant/15 py-2 origin-right"
                          >
                            <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-on-surface hover:bg-slate-50 transition-colors flex items-center gap-3">
                              <Edit2 className="w-4 h-4 text-primary" />
                              Edit Details
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-on-surface hover:bg-slate-50 transition-colors flex items-center gap-3">
                              <Copy className="w-4 h-4 text-secondary" />
                              Duplicate SKU
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-on-surface hover:bg-slate-50 transition-colors flex items-center gap-3">
                              <ExternalLink className="w-4 h-4 text-blue-500" />
                              View on Store
                            </button>
                            <div className="my-1 border-t border-outline-variant/10"></div>
                            <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-on-surface hover:bg-slate-50 transition-colors flex items-center gap-3">
                              <Archive className="w-4 h-4 text-orange-500" />
                              Archive Product
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-error hover:bg-red-50 transition-colors flex items-center gap-3">
                              <Trash2 className="w-4 h-4" />
                              Delete Forever
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                )) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                        <Search className="w-10 h-10" />
                        <p className="text-sm font-bold uppercase tracking-widest">No products found</p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 flex items-center justify-between border-t border-outline-variant/10 bg-slate-50/50">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Page {currentPage} of 12</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-outline-variant/15 text-on-surface disabled:opacity-30 shadow-sm transition-all hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(12, prev + 1))}
              disabled={currentPage === 12}
              className="p-2 rounded-lg bg-white border border-outline-variant/15 text-on-surface disabled:opacity-30 shadow-sm transition-all hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
