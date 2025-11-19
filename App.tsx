import React, { useState, useRef } from 'react';
import { ThemeToggle } from './components/ui/ThemeToggle.tsx';
import { ClientForm } from './components/ClientForm.tsx';
import { OutputCard } from './components/OutputCard.tsx';
import { ClientFormData } from './types.ts';
import { Zap } from 'lucide-react';

const INITIAL_DATA: ClientFormData = {
  fullName: '',
  email: '',
  contactNumber: '',
  skills: [],
  dateTime: '',
  address: '',
  gender: '',
  serviceType: ''
};

export default function App() {
  const [formData, setFormData] = useState<ClientFormData>(INITIAL_DATA);
  const [submittedData, setSubmittedData] = useState<ClientFormData | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (data: ClientFormData) => {
    setSubmittedData(data);
    // Smooth scroll to output
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEdit = () => {
    if (submittedData) {
      setFormData(submittedData);
      setSubmittedData(null);
      // Scroll back to top
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleClear = () => {
    setFormData(INITIAL_DATA);
    setSubmittedData(null);
     setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  };

  return (
    <div className="min-h-screen pb-20">
      <div ref={topRef}></div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              EliteForm
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {!submittedData ? (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
             <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
                  Start Your Journey
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                  Complete the form below to register your interest. We'll process your details immediately.
                </p>
             </div>
            <ClientForm 
              initialData={formData} 
              onSubmit={handleFormSubmit} 
            />
          </div>
        ) : (
          <div ref={outputRef} className="transition-opacity duration-500 ease-in-out opacity-100">
             <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  Application Received
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Thank you, {submittedData.fullName}. Please verify your details below.
                </p>
             </div>
            <OutputCard 
              data={submittedData} 
              onEdit={handleEdit} 
              onClear={handleClear} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-6 text-center text-slate-500 dark:text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
        <p>© 2024 EliteForm Inc. All rights reserved.</p>
      </footer>

       {/* Simple keyframe animations via style tag since Tailwind config is CDN */}
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