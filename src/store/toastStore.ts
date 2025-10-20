import { create } from 'zustand';
import type { ToastType } from '@/components/ui/Toast';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (message, type, duration = 5000) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  success: (message, duration) => {
    useToastStore.getState().addToast(message, 'success', duration);
  },

  error: (message, duration) => {
    useToastStore.getState().addToast(message, 'error', duration);
  },

  warning: (message, duration) => {
    useToastStore.getState().addToast(message, 'warning', duration);
  },

  info: (message, duration) => {
    useToastStore.getState().addToast(message, 'info', duration);
  },
}));
