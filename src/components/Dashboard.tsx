import React, { useState } from 'react';
import { TrendingUp, ShoppingBag, Users, Plus, ChevronRight, MoreHorizontal } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip } from 'recharts';
import { MOCK_ORDERS } from '../constants';
import { cn } from '../lib/utils';
import { View } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const weeklyData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 65 },
  { name: 'Wed', value: 55 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 95 },
  { name: 'Sat', value: 60 },
  { name: 'Sun', value: 75 },
];

const monthlyData = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1500 },
  { name: 'Mar', value: 1100 },
  { name: 'Apr', value: 1800 },
  { name: 'May', value: 2100 },
  { name: 'Jun', value: 1900 },
  { name: 'Jul', value: 2400 },
  { name: 'Aug', value: 2200 },
  { name: 'Sep', value: 2600 },
  { name: 'Oct', value: 2800 },
  { name: 'Nov', value: 3100 },
  { name: 'Dec', value: 3500 },
];

interface DashboardProps {
  setView: (view: View) => void;
}

export const Dashboard = ({ setView }: DashboardProps) => {
  const [period, setPeriod] = useState<'WEEKLY' | 'MONTHLY'>('WEEKLY');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const chartData = period === 'WEEKLY' ? weeklyData : monthlyData;

  const categories = [
    { name: 'Digital Assets', value: 42, color: 'bg-primary', strokeColor: 'text-primary', offset: 0 },
    { name: 'Physical Goods', value: 35, color: 'bg-secondary', strokeColor: 'text-secondary', offset: 110 },
    { name: 'Services', value: 23, color: 'bg-surface-container-high', strokeColor: 'text-surface-container-high', offset: 330 },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between overflow-hidden relative group hover:shadow-lg transition-all duration-500"
        >
          <div className="z-10">
            <p className="font-bold text-on-surface-variant tracking-wider uppercase text-[10px] mb-2">Total Sales</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary font-headline tracking-tighter group-hover:scale-105 transition-transform origin-left">$142,850.40</h2>
            <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12.4% from last month</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-all group"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShoppingBag className="text-on-secondary-container w-5 h-5" />
            </div>
            <p className="font-bold text-on-surface-variant tracking-wider uppercase text-[10px] mb-1">Active Orders</p>
            <h3 className="text-3xl font-bold text-on-surface font-headline">842</h3>
          </div>
          <div className="mt-4 h-1 w-full bg-outline-variant/30 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            ></motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-all group"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="text-tertiary w-5 h-5" />
            </div>
            <p className="font-bold text-on-surface-variant tracking-wider uppercase text-[10px] mb-1">Growth</p>
            <h3 className="text-3xl font-bold text-on-surface font-headline">2.4k</h3>
          </div>
          <div className="mt-4 flex items-center gap-2 text-tertiary font-semibold text-xs">
            <Plus className="w-3 h-3" />
            <span>148 new this week</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Sales Performance</h3>
              <p className="text-sm text-on-surface-variant">Daily revenue trends across all regions</p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-lg">
              {(['WEEKLY', 'MONTHLY'] as const).map((p) => (
                <button 
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-md",
                    period === p ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === chartData.length - 1 ? '#00488d' : '#00488d20'} 
                      className="hover:fill-primary transition-colors cursor-pointer"
                    />
                  ))}
                </Bar>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#727783' }}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-on-surface text-surface p-2 rounded-lg shadow-xl text-[10px] font-bold">
                          {payload[0].value} {period === 'WEEKLY' ? 'Orders' : 'USD'}
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-surface-container-lowest rounded-xl p-6 flex flex-col shadow-sm border border-outline-variant/10"
        >
          <h3 className="text-xl font-bold font-headline text-on-surface mb-6">Top Categories</h3>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-low" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="20"></circle>
                {categories.map((cat, i) => (
                  <motion.circle 
                    key={cat.name}
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ 
                      strokeDashoffset: 440 - (440 * cat.value / 100),
                      strokeWidth: hoveredCategory === cat.name ? 24 : 20
                    }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={cn(cat.strokeColor, "transition-all duration-300")}
                    cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" 
                    strokeDasharray="440" 
                    style={{ transform: `rotate(${cat.offset}deg)`, transformOrigin: 'center' }}
                    strokeWidth="20"
                  ></motion.circle>
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredCategory || 'total'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-2xl font-bold font-headline">
                      {hoveredCategory ? categories.find(c => c.name === hoveredCategory)?.value : '100'}%
                    </span>
                    <span className="text-[10px] font-bold text-outline uppercase tracking-widest">
                      {hoveredCategory || 'Total'}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {categories.map(cat => (
              <div 
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer",
                  hoveredCategory === cat.name ? "bg-surface-container-low" : "hover:bg-surface-container-low/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", cat.color)}></div>
                  <span className="text-xs font-medium text-on-surface">{cat.name}</span>
                </div>
                <span className="text-xs font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface-container-low rounded-2xl p-2 shadow-sm"
      >
        <div className="bg-surface rounded-xl overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline text-on-surface">Recent Orders</h3>
            <button 
              onClick={() => setView('sales')}
              className="text-xs font-black text-primary hover:underline transition-all flex items-center gap-1 uppercase tracking-widest"
            >
              View All Orders
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-outline-variant/10">
                  <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-[0.1em]">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-[0.1em]">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-[0.1em]">Product</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-[0.1em]">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-[0.1em]">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {MOCK_ORDERS.map((order) => (
                  <tr 
                    key={order.id} 
                    className={cn(
                      "hover:bg-surface-container-low/50 transition-colors group",
                      activeOrderId === order.id && "bg-primary/5"
                    )}
                  >
                    <td className="px-6 py-5 text-sm font-bold text-primary">{order.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {order.customerAvatar ? (
                          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                            <img className="w-full h-full object-cover" src={order.customerAvatar} alt={order.customerName} referrerPolicy="no-referrer" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-on-primary-fixed">
                            {order.customerInitial}
                          </div>
                        )}
                        <span className="text-sm font-semibold text-on-surface">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-on-surface-variant">{order.productName}</td>
                    <td className="px-6 py-5 text-sm font-bold text-on-surface">${order.amount.toFixed(2)}</td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        order.status === 'Processing' && "bg-secondary-container text-on-secondary-container",
                        order.status === 'Shipped' && "bg-primary-fixed text-on-primary-fixed-variant",
                        order.status === 'Delivered' && "bg-slate-200 text-slate-600"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right relative">
                      <button 
                        onClick={() => setActiveOrderId(activeOrderId === order.id ? null : order.id)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          activeOrderId === order.id ? "bg-primary/10 text-primary" : "text-outline hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {activeOrderId === order.id && (
                        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-50 w-32 bg-white rounded-lg shadow-xl border border-outline-variant/15 py-1 animate-in fade-in zoom-in duration-200">
                          <button className="w-full px-3 py-2 text-left text-[10px] font-bold text-on-surface hover:bg-surface-container-low transition-colors">Details</button>
                          <button className="w-full px-3 py-2 text-left text-[10px] font-bold text-on-surface hover:bg-surface-container-low transition-colors">Invoice</button>
                          <button className="w-full px-3 py-2 text-left text-[10px] font-bold text-error hover:bg-error/5 transition-colors">Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
