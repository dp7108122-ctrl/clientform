import React, { useState, ChangeEvent } from 'react';
import { Check, AlertCircle, Calendar, MapPin, Briefcase, User, Mail, Phone } from 'lucide-react';
import { ClientFormData, FormErrors, SKILL_OPTIONS, SERVICE_OPTIONS } from '../types';
import { validateForm, cn } from '../utils';

interface ClientFormProps {
  initialData: ClientFormData;
  onSubmit: (data: ClientFormData) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ClientFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle text inputs, selects, radio
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Specific logic for numeric phone input
    if (name === 'contactNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }

    // Calculate new state object
    const updatedFormData = { ...formData, [name]: processedValue };
    setFormData(updatedFormData);

    // Real-time validation if field is already touched
    if (touched[name]) {
        const newErrors = validateForm(updatedFormData);
        setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  // Handle Chips (Multi-select)
  const toggleSkill = (skill: string) => {
    // Calculate new skills array based on current state
    const isSelected = formData.skills.includes(skill);
    const newSkills = isSelected 
      ? formData.skills.filter(s => s !== skill) 
      : [...formData.skills, skill];
    
    // Update Form Data
    const updatedFormData = { ...formData, skills: newSkills };
    setFormData(updatedFormData);
      
    // Validate immediately on toggle
    const newErrors = validateForm(updatedFormData);
    setErrors(prev => ({ ...prev, skills: newErrors.skills }));
  };

  // Handle Blur for validation
  const handleBlur = (field: keyof ClientFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const validationErrors = validateForm(formData);
    setErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  // Helper for error display
  const ErrorMsg = ({ msg }: { msg?: string }) => (
    <div className={cn("flex items-center mt-1 text-xs text-red-500 transition-all duration-300 overflow-hidden", msg ? "h-5 opacity-100" : "h-0 opacity-0")}>
      {msg && <><AlertCircle className="w-3 h-3 mr-1" /> {msg}</>}
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-500 animate-fade-in-up">
      <div className="mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-primary-600" />
          Client Details
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Please fill in the information below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur('fullName')}
                placeholder="John Doe"
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all",
                  errors.fullName ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-700"
                )}
              />
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
            <ErrorMsg msg={errors.fullName} />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="example@gmail.com"
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all",
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-700"
                )}
              />
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
            <ErrorMsg msg={errors.email} />
          </div>
        </div>

        {/* Row 2: Contact & Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Number <span className="text-red-500">*</span></label>
            <div className="flex relative">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                +91
              </span>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                onBlur={() => handleBlur('contactNumber')}
                placeholder="9876543210"
                maxLength={10}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-r-lg border bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all",
                  errors.contactNumber ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-700"
                )}
              />
              <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
            <ErrorMsg msg={errors.contactNumber} />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service Type <span className="text-red-500">*</span></label>
            <div className="relative">
                <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                onBlur={() => handleBlur('serviceType')}
                className={cn(
                    "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all appearance-none",
                    errors.serviceType ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-700"
                )}
                >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
            <ErrorMsg msg={errors.serviceType} />
          </div>
        </div>

        {/* Row 3: Date & Skills */}
        <div className="grid grid-cols-1 gap-6">
           <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date & Time <span className="text-red-500">*</span></label>
            <div className="relative">
                <input
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleChange}
                    onBlur={() => handleBlur('dateTime')}
                    className={cn(
                    "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400",
                    errors.dateTime ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-700"
                    )}
                />
                {(!formData.dateTime) && <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />}
            </div>
            <ErrorMsg msg={errors.dateTime} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Skills <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => {
                const isSelected = formData.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-all duration-200 flex items-center gap-1",
                      isSelected 
                        ? "bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-500/30 transform scale-105" 
                        : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    )}
                  >
                     {isSelected && <Check className="w-3 h-3" />}
                     {skill}
                  </button>
                );
              })}
            </div>
            <ErrorMsg msg={errors.skills} />
          </div>
        </div>

        {/* Row 4: Gender & Address */}
        <div className="space-y-6">
           <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gender <span className="text-red-500">*</span></label>
            <div className="flex gap-6">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                    formData.gender === g 
                        ? "border-primary-600 bg-primary-600" 
                        : "border-slate-300 dark:border-slate-600 group-hover:border-primary-400"
                  )}>
                    {formData.gender === g && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{g}</span>
                </label>
              ))}
            </div>
            <ErrorMsg msg={errors.gender} />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
             <div className="relative">
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={() => handleBlur('address')}
                    rows={3}
                    placeholder="Enter your full address..."
                    className={cn(
                    "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none",
                    errors.address ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-700"
                    )}
                />
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
            <ErrorMsg msg={errors.address} />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Submit Application</span>
            <Check className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};