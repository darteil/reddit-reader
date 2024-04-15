import axios, { AxiosError } from "axios";
import useStore from "store";

let { authorized } = useStore.getState();
const { setAuthorized } = useStore.getState();
const unsubscribeAuthorized = useStore.subscribe(
  (state) => state.authorized,
  () => {
    authorized = useStore.getState().authorized;
  },
);

export const refreshToken = async () => {
  try {
    await axios.post("http://127.0.0.1:7000/api/refresh-token");
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err?.response?.status === 400) {
        logout();
        setAuthorized(false);
      }
    } else {
      console.log(err);
    }
  }
};

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:7000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && authorized) {
      await refreshToken();
      return axiosInstance(originalRequest);
    } else {
      return Promise.reject(error);
    }
  },
);

export const login = async (code: string) => {
  try {
    const { data } = await axiosInstance.post("/login", { code });
    if (data === "authorization success") {
      const url = document.location.href;
      window.history.pushState({}, "", url.split("?")[0]);
      setAuthorized(true);
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    axiosInstance.post("/logout");
    setAuthorized(false);
  } catch (err) {
    console.log(err);
  }
};

export const getRedditAuthUrl = async () => {
  try {
    const { data } = await axiosInstance.get<string>("/auth-url");
    return data;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const getMySubreddits = async () => {
  try {
    const { data } = await axiosInstance.get<string[]>("/mysubreddits", {});
    return data || [];
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = async (sort: string = "hot") => {
  try {
    const { data } = await axiosInstance.post("/articles", { sort: "hot", subreddit: "all", range: "" });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
