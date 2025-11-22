import React, { useState, useRef, useEffect } from 'react';
import { ClientForm } from './ClientForm.tsx';
import { OutputCard } from './OutputCard.tsx';
import { ClientFormData } from '../types.ts';
import { INITIAL_DATA } from '../utils.ts';

interface FormPageProps {
  onAddData: (data: ClientFormData) => void;
  editingData: ClientFormData | null;
  onClearEditing: () => void;
}

export const FormPage: React.FC<FormPageProps> = ({ onAddData, editingData, onClearEditing }) => {
  const [formData, setFormData] = useState<ClientFormData>(INITIAL_DATA);
  const [submittedData, setSubmittedData] = useState<ClientFormData | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Effect to load editing data into form if present
  useEffect(() => {
    if (editingData) {
      setFormData(editingData);
      setSubmittedData(null); // Reset submitted view when starting a new edit
      // Scroll to top to show form
       setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setFormData(INITIAL_DATA);
      // Do not clear submittedData here automatically, otherwise the success card disappears
      // when the parent clears the editingData prop.
    }
  }, [editingData]);

  const handleFormSubmit = (data: ClientFormData) => {
    setSubmittedData(data);
    onAddData(data);
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
    onClearEditing();
     setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  };

  // Determine if the success message should say "Update" or "Received"
  // We check submittedData.id. If it has an ID (and we just submitted), it was an edit.
  // Note: Newly created items get an ID in App.tsx, but the local formData.id is empty during creation.
  // However, we need to know if the *intent* was editing.
  // Since the parent clears editingData immediately, we check if the submitted data HAS an ID
  // that was present BEFORE submission. 
  // A simpler check: If the submittedData has an ID that matches the one we were just editing, it's an update.
  // Or simply: Create/Update logic. 
  // Visual fix: We can check if the submittedData.id is non-empty.
  // Actually, App.tsx assigns ID for new items too, but it passes it back via state update, not directly returned to handleFormSubmit.
  // The data passed to handleFormSubmit comes from ClientForm state. 
  // In ClientForm, new items have id='', existing items have id='...'.
  const isUpdateSuccess = submittedData && submittedData.id && submittedData.id.length > 0;

  return (
    <div>
      <div ref={topRef}></div>
      {!submittedData ? (
        <div className="transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in-up">
           <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
                {editingData ? 'Edit Application' : 'Start Your Journey'}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                 {editingData ? 'Modify the details below and update your application.' : "Complete the form below to register your interest. We'll process your details immediately."}
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
                {isUpdateSuccess ? 'Update Successful' : 'Application Received'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {isUpdateSuccess ? 'Your changes have been saved successfully.' : `Thank you, ${submittedData.fullName}. Please verify your details below.`}
              </p>
           </div>
          <OutputCard 
            data={submittedData} 
            onEdit={handleEdit} 
            onClear={handleClear} 
          />
        </div>
      )}
    </div>
  );
};