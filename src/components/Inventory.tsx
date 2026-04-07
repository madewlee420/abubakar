import React, { useState } from 'react';
import { Search, Bell, Package, AlertTriangle, BellRing, Wallet, Filter, Edit, ChevronLeft, ChevronRight, TrendingUp as TrendingUpIcon, X, CheckCircle2, Loader2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Low Stock' | 'Out of Stock' | 'Warehouse A'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [restockingId, setRestockingId] = useState<string | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'Low Stock') matchesFilter = product.status === 'Low Stock';
    if (activeFilter === 'Out of Stock') matchesFilter = product.status === 'Out of Stock';
    if (activeFilter === 'Warehouse A') matchesFilter = product.location.includes('WH-Alpha');

    return matchesSearch && matchesFilter;
  });

  const handleRestock = (id: string) => {
    setRestockingId(id);
    setTimeout(() => {
      setRestockingId(null);
    }, 1500);
  };

  const stats = [
    { label: 'Total SKUs', value: '1,482', icon: Package, color: 'text-primary', bg: 'bg-blue-50', trend: '+12', border: 'hover:border-primary/30' },
    { label: 'Out of Stock', value: '24', icon: AlertTriangle, color: 'text-error', bg: 'bg-red-50', badge: 'Action Required', border: 'hover:border-error/30' },
    { label: 'Low Stock Alerts', value: '86', icon: BellRing, color: 'text-tertiary', bg: 'bg-orange-50', badge: 'Low Inventory', border: 'hover:border-tertiary/30' },
    { label: 'Inventory Value', value: '$412.8k', icon: Wallet, color: 'text-secondary', bg: 'bg-slate-100', badge: 'Current Value', border: 'hover:border-secondary/30' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
      {/* Summary Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-6 rounded-2xl bg-white border border-outline-variant/15 shadow-sm group transition-all cursor-default",
              stat.border
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.trend ? (
                <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-lg flex items-center gap-1">
                  <TrendingUpIcon className="w-3 h-3" />
                  {stat.trend}
                </span>
              ) : (
                <span className={cn("text-[10px] font-black uppercase tracking-tighter", stat.color === 'text-secondary' ? 'text-slate-500' : stat.color)}>
                  {stat.badge}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-label">{stat.label}</p>
            <h2 className="text-3xl font-extrabold text-on-surface font-headline mt-1">{stat.value}</h2>
          </motion.div>
        ))}
      </section>

      {/* Controls */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-5 rounded-2xl border border-outline-variant/15 shadow-sm"
      >
        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/20 rounded-xl pl-11 py-3 text-sm transition-all outline-none" 
            placeholder="Search by name, category, or SKU..." 
            type="text"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
          {(['All', 'Low Stock', 'Out of Stock', 'Warehouse A'] as const).map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                activeFilter === filter 
                  ? "bg-primary text-white shadow-sm shadow-primary/20" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {filter === 'All' ? 'All Items' : filter}
            </button>
          ))}
          <button className="px-3 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </motion.section>

      {/* Inventory Table */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl overflow-hidden border border-outline-variant/15 shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50/80 border-b border-outline-variant/15">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest w-[40%]">Product Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center w-[15%]">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center w-[15%]">Location</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center w-[10%]">Stock</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right w-[20%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
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
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm border border-slate-200/50 relative group-hover:scale-105 transition-transform">
                          <img 
                            className={cn("w-full h-full object-cover", product.status === 'Out of Stock' && "opacity-60 grayscale")} 
                            src={product.image} 
                            alt={product.name}
                            referrerPolicy="no-referrer"
                          />
                          {product.status === 'Out of Stock' && (
                            <div className="absolute inset-0 bg-error/10 flex items-center justify-center">
                              <span className="text-error font-bold text-xs">X</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-on-surface font-headline leading-tight">{product.name}</h3>
                          <p className="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-tight">SKU: {product.sku}</p>
                          <p className={cn(
                            "text-[10px] font-bold mt-1 inline-flex items-center gap-1",
                            product.status === 'In Stock' ? "text-primary opacity-70" : 
                            product.status === 'Low Stock' ? "text-tertiary" : "text-error"
                          )}>
                            <span className={cn("w-1 h-1 rounded-full", 
                              product.status === 'In Stock' ? "bg-primary" : 
                              product.status === 'Low Stock' ? "bg-tertiary" : "bg-error"
                            )}></span> 
                            {product.updatedAt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                        product.status === 'In Stock' && "bg-blue-50 text-blue-700 border-blue-100",
                        product.status === 'Low Stock' && "bg-orange-50 text-tertiary border-orange-100",
                        product.status === 'Out of Stock' && "bg-red-50 text-error border-red-100"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">{product.location}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={cn(
                        "text-sm font-extrabold",
                        product.status === 'In Stock' && "text-on-surface",
                        product.status === 'Low Stock' && "text-tertiary",
                        product.status === 'Out of Stock' && "text-error"
                      )}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end items-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleRestock(product.id)}
                          disabled={restockingId === product.id}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-wider min-w-[100px] flex items-center justify-center gap-2",
                            product.status === 'Out of Stock' 
                              ? "bg-primary text-white hover:bg-primary-container shadow-sm shadow-primary/20"
                              : "border-2 border-primary/10 text-primary hover:bg-primary hover:text-white",
                            restockingId === product.id && "opacity-70 cursor-not-allowed"
                          )}
                        >
                          {restockingId === product.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Processing
                            </>
                          ) : product.status === 'Out of Stock' ? (
                            'Order Now'
                          ) : (
                            'Restock'
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                        <Search className="w-10 h-10" />
                        <p className="text-sm font-bold uppercase tracking-widest">No matching inventory items</p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Showing <span className="text-on-surface">1 - {filteredProducts.length}</span> of 1,482 items</p>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-outline-variant/20 text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black shadow-sm transition-all",
                  currentPage === page 
                    ? "bg-primary text-white shadow-primary/20" 
                    : "bg-white border border-outline-variant/20 text-slate-600 text-xs font-bold hover:bg-slate-100"
                )}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
              disabled={currentPage === 3}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-outline-variant/20 text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
