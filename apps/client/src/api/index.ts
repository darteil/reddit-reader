import axios, { AxiosError } from "axios";
import useStore from "store";
import { RedditContent, RedditPostData } from "reddit-api-types";

let { authorized } = useStore.getState();

export const refreshToken = async () => {
  try {
    await axios.post("/api/refresh-token");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status === 400) {
        logout();
      }
    } else {
      console.log(error);
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
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else {
      console.log(error);
    }
  }
};

export const logout = async () => {
  try {
    axiosInstance.post("/logout");
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else {
      console.log(error);
    }
  }
};

export const getRedditAuthUrl = async () => {
  try {
    const { data } = await axiosInstance.get<string>("/auth-url");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else {
      console.log(error);
    }
    return "";
  }
};

export const getMySubreddits = async () => {
  try {
    const { data } = await axiosInstance.get<string[]>("/mysubreddits", {});
    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else {
      console.log(error);
    }
  }
};

export const getPosts = async (sort: string = "hot") => {
  try {
    const response = await axiosInstance.post("/articles", { sort: "hot", subreddit: "all", range: "" });
    return response.data as RedditContent<RedditPostData>[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else {
      console.log(error);
    }
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
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else {
      console.log(error);
    }
  }
};
