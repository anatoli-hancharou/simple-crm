import axios from 'axios';

export function createAxiosClient({
  options,
  getCurrentAccessToken,
  logout,
}) {
  const client = axios.create(options);

  // Request interceptor that will be executed each time before sending a request.
  client.interceptors.request.use(
    (config) => {
      if (config.authorization !== false) {
        const token = getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor that will be executed each time a response from api call is returned.
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      
      return Promise.reject(error);
    }
  );

 return client;
}