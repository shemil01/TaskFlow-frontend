import axios from 'axios';
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: "http://localhost:6499/api",
  withCredentials:true
});

// Request interceptor for adding authorization token
apiClient.interceptors.request.use(async(config) => {
    const session = await getSession();

  const token = session?.user?.accessToken
;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject( error.response?.data || error.message);
  }
);

export default apiClient;