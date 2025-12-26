import { create } from 'zustand'
export const useStore = create((set) => ({
    fingerprint: "",
    setFingerprint: (value) => set(() => ({ fingerprint: value })),
}))