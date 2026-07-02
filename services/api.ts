import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 504 || error.response?.status === 429) && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return await api(originalRequest);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    if (error.code === 'ECONNABORTED' && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return await api(originalRequest);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    if (error.response) {
      console.error('Erro na resposta:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Erro na requisição:', error.request);
    } else {
      console.error('Erro:', error.message);
    }

    return Promise.reject(error);
  }
);