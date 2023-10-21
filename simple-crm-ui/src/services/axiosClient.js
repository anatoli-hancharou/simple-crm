import { createAxiosClient } from "./createAxiosClient";
import useAuthStore from "../stores/authStore";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

function getCurrentAccessToken() {
  return useAuthStore.getState().token;
}

async function logout(){
  useAuthStore.getState().logout();
}

const axios = createAxiosClient({
  options: {
      baseURL: BASE_URL,
      timeout: 300000,
      headers: {
          'Content-Type': 'application/json',
      }
  },
  getCurrentAccessToken,
  logout,
})

export default axios;