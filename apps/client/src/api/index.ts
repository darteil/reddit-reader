import axios, { AxiosError } from "axios";
import useStore from "store";
import { RedditContent, RedditPostData } from "reddit-api-types";

let { authorized } = useStore.getState();

export const refreshToken = async () => {
  try {
    await axios.post("/api/refresh-token");
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err?.response?.status === 400) {
        logout();
      }
    } else {
      console.log(err);
    }
  }
};

const axiosInstance = axios.create({
  baseURL: "/api",
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
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    axiosInstance.post("/logout");
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
    const response = await axiosInstance.post("/articles", { sort: "hot", subreddit: "all", range: "" });
    return response.data as RedditContent<RedditPostData>[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getPostsForUnauthorizedUser = async (sort: string = "hot") => {
  try {
    const { data } = await axiosInstance.post("/articlesForUnauthorizedUserRoute", {
      sort: "hot",
      subreddit: "all",
      range: "",
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
