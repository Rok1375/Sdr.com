import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Shared utility helpers for application code.
 * Add reusable utilities in this module (or additional files in /lib as needed).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
