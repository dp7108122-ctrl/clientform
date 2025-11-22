import React, { useState, useRef } from 'react';
import { HelpCircle, Mail, MessageCircle, FileQuestion, ChevronRight } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [showDocs, setShowDocs] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "How is my data stored?",
      answer: "Your data is stored locally on your browser using LocalStorage. It remains available even if you refresh the page, but clearing your browser cache will delete it."
    },
    {
      question: "Can I export my data?",
      answer: "Currently, data export is not supported in this version. You can manually view all records in the 'Data' tab."
    },
    {
      question: "How do I edit a submission?",
      answer: "Navigate to the 'Data' page, find the row you wish to modify, and click the amber 'Edit' icon. This will preload the form with your existing data."
    },
    {
      question: "Is there a dark mode?",
      answer: "Yes! You can toggle between Light and Dark themes using the sun/moon icon in the top navigation bar."
    }
  ];

  const handleViewDocs = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDocs(true);
    // Small delay to allow render cycle to complete before scrolling
    setTimeout(() => {
      faqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          How can we help?
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Find answers to common questions or get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Contact Card 1 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
          <Mail className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Email Support</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Get in touch with our support team for any technical issues.
          </p>
          <a href="mailto:dp7108122@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            dp7108122@gmail.com
          </a>
        </div>

        {/* Contact Card 2 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
          <MessageCircle className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Live Chat</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Available Mon-Fri, 9am - 5pm EST for real-time assistance.
          </p>
          <a href="https://wa.me/qr/4AKYHCGXDO7AL1" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
            Connect on WhatsApp
          </a>
        </div>

        {/* Contact Card 3 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
          <FileQuestion className="w-8 h-8 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Documentation</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Read detailed guides on how to use the EliteForm platform.
          </p>
          <button 
            onClick={handleViewDocs}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
          >
            View Docs &rarr;
          </button>
        </div>
      </div>

      {showDocs && (
        <div ref={faqRef} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <h3 className="flex items-center justify-between text-base font-medium text-slate-900 dark:text-white cursor-pointer">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};