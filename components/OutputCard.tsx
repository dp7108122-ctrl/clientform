import React from 'react';
import { Edit2, Trash2, User, Mail, Phone, Calendar, MapPin, Layers, CheckCircle } from 'lucide-react';
import { ClientFormData } from '../types';

interface OutputCardProps {
  data: ClientFormData;
  onEdit: () => void;
  onClear: () => void;
}

export const OutputCard: React.FC<OutputCardProps> = ({ data, onEdit, onClear }) => {
  const DetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
      <div className="p-2 bg-white dark:bg-slate-800 rounded-md text-primary-600 shadow-sm">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 break-all">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-up transform transition-all duration-500 mt-8">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white flex justify-between items-center">
        <div>
           <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Submission Successful
          </h2>
          <p className="text-indigo-200 text-sm mt-1">Review your submitted details below</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem icon={User} label="Full Name" value={data.fullName} />
          <DetailItem icon={Mail} label="Email" value={data.email} />
          <DetailItem icon={Phone} label="Contact" value={`+91 ${data.contactNumber}`} />
          <DetailItem icon={User} label="Gender" value={data.gender} />
          <DetailItem icon={Layers} label="Service" value={data.serviceType} />
          <DetailItem icon={Calendar} label="Date & Time" value={new Date(data.dateTime).toLocaleString()} />
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
           <div className="flex items-center gap-2 mb-3">
             <Layers className="w-4 h-4 text-primary-600" />
             <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Skills</span>
           </div>
           <div className="flex flex-wrap gap-2">
             {data.skills.map(skill => (
               <span key={skill} className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-md border border-indigo-200 dark:border-indigo-800">
                 {skill}
               </span>
             ))}
           </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
           <div className="flex items-center gap-2 mb-2">
             <MapPin className="w-4 h-4 text-primary-600" />
             <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Address</span>
           </div>
           <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{data.address}</p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={onClear}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-lg shadow-rose-500/20 transition-all hover:-translate-y-0.5"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};