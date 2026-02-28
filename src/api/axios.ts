import axios from 'axios';
import { APP_CONFIG } from '@/config/app';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

// 请求拦截器：自动加 Token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：统一处理报错
instance.interceptors.response.use(
        (response) => response.data, // 直接返回 data，类似后端 Result.data
        (error) => {
          if (error.response?.status === 401) {
            // Token 过期，HashRouter 下使用 hash 跳转，避免部署路径问题
            localStorage.removeItem('token');
            if (window.location.hash !== APP_CONFIG.loginHashPath) {
              window.location.hash = APP_CONFIG.loginHashPath;
            }
          }
          return Promise.reject(error);
        }
);

export default instance;
