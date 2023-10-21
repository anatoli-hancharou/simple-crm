import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  error: {},
  setError: (message, description) => {
    set({ error: {message, description} });
  },
}));

export default useNotificationStore;