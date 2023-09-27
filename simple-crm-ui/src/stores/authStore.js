import { create } from "zustand";

function setTokensToLocalStorage(token) {
  localStorage.setItem("token", token);
}

function removeTokensFromLocalStorage() {
  localStorage.removeItem("token");
}

const useAuthStore = create((set, get) => ({
  token: localStorage.getItem("token") || null,
  isLoggedIn: () => !!get().token,
  login: (token) => {
    setTokensToLocalStorage(token);
    set({ token: token });
  },
  logout: () => {
    removeTokensFromLocalStorage();
    set({ token: null });
  },
}));

export default useAuthStore;