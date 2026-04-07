import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Layers, 
  Settings, 
  Search, 
  Bell,
  TrendingUp,
  ShoppingBag,
  Users,
  Plus,
  ArrowLeft,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  AlertTriangle,
  Wallet,
  Menu,
  Heart,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { View } from '../types';

// --- Shared Components ---

export const Sidebar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Products', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Layers },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant/20 bg-slate-100 dark:bg-slate-950 py-8 px-4 sticky top-0">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
          <Package className="text-white w-4 h-4" />
        </div>
        <span className="font-black text-blue-800 dark:text-blue-200 text-xl tracking-tight">Architect</span>
      </div>
      
      <div className="flex items-center gap-4 mb-10 px-2">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH0uC-t65pf1HtsfwIGvw5WIdqTYwt0ZVDmSsP_oob2VdQ0jHe7iAh6f57nZTuVOM_gKUG3hnA47DgQNh9cZSftFRzUWcuUU_Vyl7tzA8Pi0FzJfJTme2W499NeNvDa-38cF8ZpPwLPMyP91aGl_TExWZCaKvNGFQG7Pm-FfhXa3IXN5e1OZ8MKVqBUNWkFRZvMkYMmIRMloIbhpAu9mfygNvRLx-lRB8RkUtAbDM4xmFhJEXADQ-EQuIk8mhp2MF8X3TZTw2lQsg" 
            alt="Admin"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <p className="font-headline uppercase tracking-widest text-[10px] text-slate-500">Admin</p>
          <p className="font-bold text-on-surface text-sm">Digital Curator</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg duration-200 font-headline uppercase tracking-widest text-xs",
              currentView === item.id 
                ? "text-blue-700 dark:text-blue-400 font-bold bg-slate-200 dark:bg-slate-800/60" 
                : "text-slate-600 dark:text-slate-400 font-medium hover:translate-x-1"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export const BottomNav = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Sales', icon: TrendingUp },
    { id: 'sales', label: 'Items', icon: Package },
    { id: 'inventory', label: 'Stock', icon: Layers },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)] rounded-t-2xl">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as View)}
          className={cn(
            "flex flex-col items-center justify-center rounded-xl px-3 py-1.5 active:scale-90 transition-transform",
            currentView === item.id 
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" 
              : "text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="font-sans text-[10px] font-bold tracking-normal mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export const TopBar = ({ title }: { title: string }) => {
  return (
    <header className="w-full top-0 sticky z-40 bg-slate-50 dark:bg-slate-900 shadow-sm dark:shadow-none flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <button className="p-2 text-blue-700 dark:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors active:scale-95 duration-150">
          <Search className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-blue-900 dark:text-blue-100 font-headline tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-blue-700 dark:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors active:scale-95 duration-150">
          <Bell className="w-5 h-5" />
        </button>
        <div className="md:hidden w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDwDQWlitXfwRlVLsVmZ4Emdu4xMEQ6GyDjM16aJ03I2YbVmRW9j_qQjMnIFqTMrIvvo4DIRNR2RH2q79kKumdRbzTNTW1a-kIM4C_qRHPBuAcOvVWCBvBl3k1v2Sl61taV3PMVlLg3oFCSKnLr8cGKnsIfu6evr-PsJwWzwXFG8oQoivQh8mk3V8rZ2e61aegLafFi0dp0DRP6N8YbAi35yj0CiPEhK6ZBIpPPxT2i2lJCnj_ddMYXDhLBjeXmaHsxQ78AKhJZ3k" 
            alt="Avatar"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};
