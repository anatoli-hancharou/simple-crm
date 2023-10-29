import { create } from "zustand";

const savePreferences = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const loadPreferences = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

// paramsStore keeps user preferences such as table sorting and filtering options to restore them on page reload.
const useParamsStore = create((set, get) => ({
  tableParams: loadPreferences('user-preferences:table-params'),
  getParams: () => get().tableParams,
  setParams: (params) => {
    savePreferences('user-preferences:table-params', params);
    set({ tableParams: params });
  },
}));

export default useParamsStore;