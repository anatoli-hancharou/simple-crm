import { create } from "zustand";

// notificationStore is used to keep a global error message that will be shown to user in case of any problems.
// It can be used anywhere in the app to provide error messages.
const useNotificationStore = create((set, get) => ({
  error: {},
  setError: (message, description) => {
    set({ error: {message, description} });
  },
}));

export default useNotificationStore;