import { FastifyInstance, FastifyRequest } from "fastify";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface IBody {
  subreddit: string;
  sort: "all" | "hot" | "new" | "top";
  range: "all" | "now" | "today" | "week" | "mounth" | "year";
}

export const articlesRoute = async (server: FastifyInstance) => {
  server.post(
    "/articles",
    async (
      request: FastifyRequest<{
        Body: IBody;
      }>,
      reply
    ) => {
      const token = request.cookies.access_token;
      const { subreddit, sort, range } = request.body;

      let url = "";
      if (subreddit === "all") {
        if (request.body.sort === "top") {
          url = `https://oauth.reddit.com/top?t=${range}`;
        } else {
          url = `https://oauth.reddit.com/${sort}`;
        }
      } else {
        if (request.body.sort === "top") {
          url = `https://oauth.reddit.com/r/${subreddit}/top?t=${range}`;
        } else {
          url = `https://oauth.reddit.com/r/${subreddit}/${sort}`;
        }
      }

      try {
        const { data } = await axiosInstance.get(url, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        reply.send(data.data.children);
      } catch (err) {
        if (err instanceof AxiosError) {
          reply
            .status(err?.response?.status || 500)
            .send(err?.response?.statusText || "Unexpected error");
        } else {
          reply.send(err);
        }
      }
    }
  );
};
