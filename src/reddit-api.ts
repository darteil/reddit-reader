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
    fullname: string;
  }

  server.get(
    "/:subreddit/:fullname/hot",
    async (request: FastifyRequest<{ Params: IParamsSubredditHot }>) => {
      const { subreddit, fullname } = request.params;

      return reddit
        .getSubreddit(subreddit)
        .getHot({ limit: 25, after: fullname === "" ? undefined : fullname })
        .then((posts) =>
          posts.map((post) => ({
            title: post.title,
            postedBy: post.author.name,
            created: post.created,
            upVotes: post.ups,
            thumbnail: post.thumbnail,
            fullname: post.name,
            text: post.selftext,
          }))
        );
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
