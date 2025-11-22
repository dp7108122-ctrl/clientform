export interface ClientFormData {
  id?: string;
  fullName: string;
  email: string;
  contactNumber: string;
  skills: string[];
  dateTime: string;
  address: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  serviceType: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  contactNumber?: string;
  skills?: string;
  dateTime?: string;
  address?: string;
  gender?: string;
  serviceType?: string;
}

export const SKILL_OPTIONS = [
  'Web Development',
  'App Development',
  'UI/UX Design',
  'Cloud Computing',
  'Database Management',
  'DevOps',
  'AI/ML'
];

export const SERVICE_OPTIONS = [
  'Consulting',
  'Development',
  'Maintenance',
  'Audit',
  'Training'
];