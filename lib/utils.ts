import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function minString(field: string, length: number) {
  return z
    .string()
    .min(length, `${field} must be at least ${length} characters`)
}
