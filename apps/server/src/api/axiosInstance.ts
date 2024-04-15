import axios from "axios";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((request) => {
  // console.log(request);
  return request;
});

axiosInstance.interceptors.response.use((responce) => {
  // console.log(responce);
  return responce;
});

export default axiosInstance;
