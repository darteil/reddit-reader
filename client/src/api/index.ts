import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:7000/api',
});

export const login = async (code: string) => {
  axiosInstance
    .post('/login', { code })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRedditAuthUrl = async () => {
  const url = await axiosInstance
    .get<string>('/auth-url')
    .then((response) => {
      return response.data || '';
    })
    .catch((err) => {
      console.log(err);
    });
  return url || '';
};
