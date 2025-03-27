import { FastifyInstance } from "fastify";

export const subredditsRoute = async (server: FastifyInstance) => {
  server.get("/mysubreddits", async (request, reply) => {
    const token = request.cookies.access_token;
    const url = "https://oauth.reddit.com/subreddits/mine/subscriber?raw_json=1&count=9999&limit=300";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const data = await response.json();
      const arr: string[] = [];

      data.data.children.forEach((item: any) => {
        arr.push(item.data.display_name_prefixed);
      });
      reply.send(arr);
    } catch (err) {
      reply.send(err);
    }
  });
};
