import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to check for not null/undefined/NAN/""
export function isNotNil<T>(value: T | null | undefined): value is T {
  if (value == null || value == undefined || value === "") return false;
  if (typeof value === "number" && isNaN(value)) return false;
  return true;
}

// Calculate age from birth date string
export function getAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
