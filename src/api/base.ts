import { FastifyInstance } from "fastify";
import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export const baseRoutes = async (server: FastifyInstance) => {
  // Get subreddits list
  server.get("/mysubreddits", async (request, reply) => {
    interface ISubreddit {
      data: {
        display_name_prefixed: string;
      };
    }

    interface IRequestResult {
      data: {
        children: ISubreddit[];
      };
    }

    const token = request.cookies.access_token;
    const url =
      "https://oauth.reddit.com/subreddits/mine/subscriber?raw_json=1&count=9999&limit=300";

    try {
      const { data } = await axiosInstance.get<IRequestResult>(url, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const arr: string[] = [];

      data.data.children.forEach((item) => {
        arr.push(item.data.display_name_prefixed);
      });
      reply.send(arr);
    } catch (err) {
      if (err instanceof AxiosError) {
        reply
          .status(err?.response?.status || 500)
          .send(err?.response?.statusText || "Unexpected error");
      } else {
        reply.send(err);
      }
    }
  });
};
