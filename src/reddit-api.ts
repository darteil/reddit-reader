import { FastifyInstance } from "fastify";
import axios from "axios";

const tokenUrl = "https://www.reddit.com/api/v1/access_token";

export const routes = async (server: FastifyInstance) => {
  // Get reddit authorization url
  server.get("/auth-url", (_, reply) => {
    const scope = "mysubreddits read history";
    const url = [
      `https://www.reddit.com/api/v1/authorize?client_id=${server.config.CLIENT_ID}&response_type=code`,
      `&state=randomstring&redirect_uri=http://127.0.0.1:7000/&duration=temporary&scope=${scope}`,
    ];
    reply.send(url.join(""));
  });

  // Login with reddit
  server.post<{ Body: { code: string } }>("/login", async (request, reply) => {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: request.body.code,
      redirect_uri: "http://127.0.0.1:7000/",
    });

    try {
      const { data } = await axios.post(tokenUrl, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": server.config.USER_AGENT,
          Authorization: `Basic ${Buffer.from(
            server.config.CLIENT_ID + ":" + server.config.CLIENT_SECRET
          ).toString("base64")}`,
        },
      });

      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });
};
