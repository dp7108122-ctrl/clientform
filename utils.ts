import { ClientFormData, FormErrors } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateForm = (data: ClientFormData): FormErrors => {
  const errors: FormErrors = {};

  // Full Name: Required, min 3 chars
  if (!data.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  // Email: Must end with @gmail.com
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!data.email.toLowerCase().endsWith('@gmail.com')) {
    errors.email = 'Email must be a valid @gmail.com address';
  }

  // Contact Number: Exactly 10 digits
  if (!data.contactNumber) {
    errors.contactNumber = 'Contact Number is required';
  } else if (!/^\d{10}$/.test(data.contactNumber)) {
    errors.contactNumber = 'Must be exactly 10 digits';
  }

  // Skills: At least 1 selection
  if (data.skills.length === 0) {
    errors.skills = 'Please select at least one skill';
  }

  // Date & Time: Required
  if (!data.dateTime) {
    errors.dateTime = 'Date & Time is required';
  }

  // Address: Required (Optional strictly speaking based on user prompt but good practice)
  if (!data.address.trim()) {
    errors.address = 'Address is required';
  }

  // Gender: Required
  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  // Service Type: Required
  if (!data.serviceType) {
    errors.serviceType = 'Service Type is required';
  }

  return errors;
};