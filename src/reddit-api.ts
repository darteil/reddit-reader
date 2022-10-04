import { FastifyInstance, FastifyRequest } from "fastify";
import { config } from "./utils/config";
import snoowrap from "snoowrap";

const reddit = new snoowrap({
  userAgent: config.userAgent || "",
  clientId: config.clientId || "",
  clientSecret: config.clientSecret || "",
  refreshToken: config.refreshToken || "",
});

export const routes = async (server: FastifyInstance) => {
  // Get hot posts
  server.get("/hot", async () => {
    return reddit.getHot().then((post) => post);
  });

  // Get my subreddit titles
  server.get("/subscriptions", async () => {
    const subs = reddit.getSubscriptions();

    return subs.map((sub) => {
      return sub.display_name_prefixed;
    });
  });

  // Get subreddit hot posts
  interface IParamsSubredditHot {
    subreddit: string;
  }

  server.get(
    "/:subreddit/hot",
    async (request: FastifyRequest<{ Params: IParamsSubredditHot }>) => {
      const { subreddit } = request.params;

      return reddit
        .getSubreddit(subreddit)
        .getHot()
        .then((posts) => posts.map((post) => post.title));
    }
  );

  // Get saved posts
  server.get("/saved", async () => {
    return reddit
      .getUser("DarTeil")
      .getSavedContent()
      .then((c) => c);
  });
};
