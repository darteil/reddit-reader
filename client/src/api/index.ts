import axios, { AxiosError } from 'axios';

export const refreshToken = async () => {
  try {
    await axios.post('http://127.0.0.1:7000/api/refresh-token');
  } catch (err) {
    console.log(err);
  }
};

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:7000/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      await refreshToken();
      return axiosInstance(originalRequest);
    } else {
      return Promise.reject(error);
    }
  },
);

export const login = async (code: string) => {
  try {
    const { data } = await axiosInstance.post('/login', { code });
    if (data) localStorage.setItem('authorized', 'yes');
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    axiosInstance.post('/logout');
  } catch (err) {
    console.log(err);
  }
};

export const getRedditAuthUrl = async () => {
  try {
    const { data } = await axiosInstance.get<string>('/auth-url');
    return data;
  } catch (err) {
    console.log(err);
    return '';
  }
};
