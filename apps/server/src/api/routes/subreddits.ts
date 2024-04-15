import { FastifyInstance } from "fastify";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

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

export const subredditsRoute = async (server: FastifyInstance) => {
  server.get("/mysubreddits", async (request, reply) => {
    const token = request.cookies.access_token;
    const url = "https://oauth.reddit.com/subreddits/mine/subscriber?raw_json=1&count=9999&limit=300";

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
        reply.status(err?.response?.status || 500).send(err?.response?.statusText || "Unexpected error");
      } else {
        reply.send(err);
      }
    }
  });
};
