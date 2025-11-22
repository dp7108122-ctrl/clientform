
import React from 'react';
import { ClientFormData } from '../types.ts';
import { Database, FileX, Edit2, Trash2, Save } from 'lucide-react';

interface TablePageProps {
  data: ClientFormData[];
  onEdit: (data: ClientFormData) => void;
  onDelete: (id: string) => void;
}

export const TablePage: React.FC<TablePageProps> = ({ data, onEdit, onDelete }) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
            <FileX className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No Submissions Yet</h2>
        <p className="text-slate-500 dark:text-slate-400">Fill out the form on the Home page to see data here.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
             <Database className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Data Records</h1>
            <p className="text-slate-500 dark:text-slate-400">View, edit or delete your submissions.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Service</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Skills</th>
                <th className="p-4 font-semibold">Address</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {data.map((item) => (
                <tr 
                    key={item.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-150 group"
                >
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{item.fullName}</div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{item.email}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-mono text-xs">+91 {item.contactNumber}</td>
                  <td className="p-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                        {item.serviceType}
                      </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 text-sm whitespace-nowrap">
                    {new Date(item.dateTime).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {item.skills.slice(0, 2).map(s => (
                             <span key={s} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600">
                                {s}
                             </span>
                        ))}
                        {item.skills.length > 2 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-slate-400">+ {item.skills.length - 2}</span>
                        )}
                    </div>
                  </td>
                  <td className="p-4">
                      <div className="max-w-[150px] truncate text-slate-500 dark:text-slate-400 text-sm" title={item.address}>
                          {item.address}
                      </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => item.id && onDelete(item.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
            <span>Showing {data.length} records</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <Save className="w-3 h-3" />
              Data auto-saved & persisted
            </span>
        </div>
      </div>
    </div>
  );
};
