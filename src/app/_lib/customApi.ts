import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// 인터셉터 추가 함수
function Interceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: Error) => Promise.reject(error)
  );
}

const axiosInstance = (auth: boolean) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  if (auth) {
    Interceptors(instance);
  }
  return instance;
};

export const baseAPI = axiosInstance(false);
export const authAPI = axiosInstance(true);
