import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Moon, 
  Sun, 
  Shield, 
  CreditCard, 
  LogOut, 
  Trash2, 
  ChevronRight, 
  Check,
  Smartphone,
  Mail,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type SettingsSection = 'profile' | 'notifications' | 'security' | 'preferences' | 'billing';

export const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 space-y-2">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">Settings</h1>
            <p className="text-sm text-slate-500 font-medium">Manage your account and app experience.</p>
          </div>
          
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as SettingsSection)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                  activeSection === item.id 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-outline-variant/10 hidden lg:block">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-error hover:bg-red-50 transition-all w-full">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-3xl border border-outline-variant/15 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          <div className="p-6 md:p-8 flex-1">
            <AnimatePresence mode="wait">
              {activeSection === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <section>
                    <h3 className="text-lg font-bold text-on-surface mb-6">Public Profile</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-200">
                          <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Matt" 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-primary hover:scale-110 transition-transform">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                            <input 
                              type="text" 
                              defaultValue="Matt Patrick Lee"
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                            <input 
                              type="email" 
                              defaultValue="mattpatricklee@gmail.com"
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Bio</label>
                          <textarea 
                            rows={3}
                            defaultValue="Product Designer & Architect of high-performance systems."
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="pt-8 border-t border-outline-variant/10">
                    <h3 className="text-lg font-bold text-on-surface mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone Number</label>
                        <div className="relative">
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="tel" 
                            defaultValue="+1 (555) 000-0000"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Location</label>
                        <input 
                          type="text" 
                          defaultValue="San Francisco, CA"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeSection === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Email Notifications', desc: 'Receive updates about your account via email.', icon: Mail },
                      { title: 'Push Notifications', desc: 'Get real-time alerts on your mobile device.', icon: Bell },
                      { title: 'SMS Alerts', desc: 'Critical updates sent directly to your phone.', icon: Smartphone },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-outline-variant/10">
                    <h4 className="text-sm font-bold text-on-surface mb-4">Activity Alerts</h4>
                    <div className="space-y-3">
                      {['New Order Received', 'Low Stock Warning', 'Weekly Sales Report', 'Security Login Alert'].map((label, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 transition-all checked:border-primary checked:bg-primary" defaultChecked />
                            <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-sm text-slate-600 font-medium group-hover:text-on-surface transition-colors">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-6">Security Settings</h3>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Two-Factor Authentication</p>
                          <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                        </div>
                      </div>
                      <button className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold hover:bg-slate-100 transition-all">Enable</button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-on-surface">Change Password</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <input type="password" placeholder="Current Password" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="password" placeholder="New Password" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                          <input type="password" placeholder="Confirm New Password" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-outline-variant/10">
                    <h4 className="text-sm font-bold text-error mb-4">Danger Zone</h4>
                    <div className="p-6 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-red-700">Delete Account</p>
                        <p className="text-xs text-red-600/70">Once you delete your account, there is no going back. Please be certain.</p>
                      </div>
                      <button className="px-5 py-2 rounded-xl bg-white border border-red-200 text-xs font-bold text-error hover:bg-red-100 transition-all flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-6">App Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Theme Mode</label>
                      <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
                        <button 
                          onClick={() => setIsDarkMode(false)}
                          className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                            !isDarkMode ? "bg-white shadow-sm text-primary" : "text-slate-500"
                          )}
                        >
                          <Sun className="w-4 h-4" />
                          Light
                        </button>
                        <button 
                          onClick={() => setIsDarkMode(true)}
                          className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                            isDarkMode ? "bg-white shadow-sm text-primary" : "text-slate-500"
                          )}
                        >
                          <Moon className="w-4 h-4" />
                          Dark
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Language</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Currency</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Timezone</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT-05:00) Eastern Time</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT+01:00) London</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-6">Billing & Subscription</h3>
                  
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-12">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Current Plan</p>
                          <h4 className="text-2xl font-black">Pro Architect</h4>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Active</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Next Billing Date</p>
                          <p className="text-sm font-bold">May 15, 2026</p>
                        </div>
                        <p className="text-3xl font-black">$49<span className="text-sm font-medium text-white/50">/mo</span></p>
                      </div>
                    </div>
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-on-surface">Payment Methods</h4>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                          <span className="text-[10px] font-black italic text-blue-800">VISA</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Visa ending in 4242</p>
                          <p className="text-xs text-slate-500">Expires 12/28</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-primary hover:underline">Edit</button>
                    </div>
                    <button className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 text-xs font-bold hover:border-primary hover:text-primary transition-all">
                      + Add New Payment Method
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 border-t border-outline-variant/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-2 text-green-600 text-xs font-bold"
                  >
                    <Check className="w-4 h-4" />
                    Changes saved successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
