"use client";
import { create } from "zustand";

interface useDeleteModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDeleteStoreModal = create<useDeleteModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
