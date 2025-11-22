import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './components/ui/ThemeToggle.tsx';
import { FormPage } from './components/FormPage.tsx';
import { TablePage } from './components/TablePage.tsx';
import { SupportPage } from './components/SupportPage.tsx';
import { ClientFormData } from './types.ts';
import { Zap, Table, Layout, Home, LifeBuoy } from 'lucide-react';
import { cn } from './utils.ts';

function MainLayout() {
  // Initialize state from LocalStorage
  const [submissions, setSubmissions] = useState<ClientFormData[]>(() => {
    try {
      const saved = localStorage.getItem('client_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load data from storage", e);
      return [];
    }
  });

  const [editingItem, setEditingItem] = useState<ClientFormData | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Save to LocalStorage whenever submissions change
  useEffect(() => {
    try {
      localStorage.setItem('client_submissions', JSON.stringify(submissions));
    } catch (e) {
      // Silent fail for better UX, log to console only
      console.error("Failed to save data to local storage", e);
    }
  }, [submissions]);

  const handleSaveSubmission = (data: ClientFormData) => {
    if (data.id) {
      // Update existing
      setSubmissions(prev => prev.map(item => item.id === data.id ? data : item));
      // Clear editing state after successful update
      setEditingItem(null);
    } else {
      // Create new with robust ID generation
      const generateId = () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
      };

      const newItem = { ...data, id: generateId() };
      setSubmissions(prev => [newItem, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setSubmissions(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEdit = (data: ClientFormData) => {
    setEditingItem(data);
    navigate('/');
  };

  const handleClearEditing = () => {
      setEditingItem(null);
  }

  const handleNavClick = (to: string) => {
      if (to === '/') {
          setEditingItem(null);
      }
  };

  const NavLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
      const isActive = location.pathname === to;
      return (
          <Link 
            to={to} 
            onClick={() => handleNavClick(to)}
            className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive 
                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
          </Link>
      )
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white transform transition-transform group-hover:scale-110">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              EliteForm
            </h1>
          </Link>
          
          <nav className="flex items-center gap-1 md:gap-4">
             <NavLink to="/" icon={Home} label="Form" />
             <NavLink to="/data" icon={Table} label="Data" />
             <NavLink to="/support" icon={LifeBuoy} label="Support" />
             <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
             <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <Routes>
            <Route 
                path="/" 
                element={
                    <FormPage 
                        onAddData={handleSaveSubmission} 
                        editingData={editingItem}
                        onClearEditing={handleClearEditing}
                    />
                } 
            />
            <Route 
                path="/data" 
                element={
                    <TablePage 
                        data={submissions} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete}
                    />
                } 
            />
             <Route 
                path="/support" 
                element={<SupportPage />} 
            />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
                 <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">© 2024 EliteForm Inc.</p>
                 <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Crafted with precision.</p>
            </div>
            
            <div className="flex items-center gap-6">
                <Link to="/" onClick={() => handleNavClick('/')} className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Home</Link>
                <Link to="/data" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Database</Link>
                <Link to="/support" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Support</Link>
            </div>
         </div>
      </footer>

       {/* Animations */}
       <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MainLayout />
    </HashRouter>
  );
}