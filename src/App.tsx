/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar, BottomNav, TopBar } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Sales } from './components/Sales';
import { AddProduct } from './components/AddProduct';
import { Settings } from './components/Settings';
import { View } from './types';
import { Plus } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard setView={setView} />;
      case 'inventory':
        return <Inventory />;
      case 'sales':
        return <Sales />;
      case 'add-product':
        return <AddProduct />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'dashboard':
        return 'The Precision Architect';
      case 'inventory':
        return 'Inventory Management';
      case 'sales':
        return 'Product Sales';
      case 'add-product':
        return 'Add Product';
      case 'settings':
        return 'Account Settings';
      default:
        return 'The Precision Architect';
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 flex flex-col relative min-h-screen">
        <TopBar title={getTitle()} />
        
        <div className={cn(
          "flex-1",
          view === 'add-product' ? "p-6 md:p-10 lg:p-12" : ""
        )}>
          {renderView()}
        </div>

        {/* Spacer for mobile bottom nav */}
        <div className="h-24 md:hidden"></div>

        {/* FAB (Only on Dashboard) */}
        {view === 'dashboard' && (
          <button 
            onClick={() => setView('add-product')}
            className="fixed right-6 bottom-24 md:bottom-8 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white shadow-xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}

        <BottomNav currentView={view} setView={setView} />
      </main>
    </div>
  );
}
