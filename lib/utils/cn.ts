import { clsx, type ClassValue } from "clsx";

export function cn(...values: ClassValue[]) {
  return clsx(values);
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}
