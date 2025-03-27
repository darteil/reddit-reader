import { FastifyInstance, FastifyRequest } from "fastify";
// import { RedditContent, RedditPostData } from "reddit-api-types";

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
      reply,
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
        const response = await fetch(url, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        const data = await response.json();

        reply.send(data.data.children);
      } catch (err) {
        reply.send(err);
      }
    },
  );
};

export const articlesForUnauthorizedUserRoute = async (server: FastifyInstance) => {
  server.post(
    "/articlesForUnauthorizedUserRoute",
    async (
      request: FastifyRequest<{
        Body: IBody;
      }>,
      reply,
    ) => {
      const { subreddit, sort, range } = request.body;

      let url = "https://www.reddit.com/new.json";

      try {
        const response = await fetch(url);
        const data = await response.json();
        reply.send(data.data.children);
      } catch (err) {
        reply.send(err);
      }
    },
  );
};
