import { FastifyInstance } from "fastify";

const tokenUrl = "https://www.reddit.com/api/v1/access_token";

export const authRoute = async (server: FastifyInstance) => {
  // Get reddit authorization url
  server.get("/auth-url", (_, reply) => {
    const scope = "mysubreddits read history";
    const url = [
      `https://www.reddit.com/api/v1/authorize?client_id=${server.config.CLIENT_ID}&response_type=code`,
      `&state=randomstring&redirect_uri=${server.config.CLIENT_URL_ADRESS}&duration=permanent&scope=${scope}`,
    ];
    reply.send(url.join(""));
  });

  // Login with reddit
  server.post<{ Body: { code: string } }>("/login", async (request, reply) => {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: request.body.code,
      redirect_uri: server.config.CLIENT_URL_ADRESS,
    });

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": server.config.USER_AGENT,
          Authorization: `Basic ${Buffer.from(server.config.CLIENT_ID + ":" + server.config.CLIENT_SECRET).toString(
            "base64",
          )}`,
        },
      });

      const data = await response.json();
      console.log(data);

      reply.setCookie("refresh_token", data.refresh_token, { path: "/" });
      reply.setCookie("access_token", data.access_token, { path: "/" });
      reply.send("authorization success");
    } catch (err) {
      server.log.error(err);
    }
  });

  // Refresh token
  server.post("/refresh-token", async (request, reply) => {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: `${request.cookies.refresh_token}`,
    });

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": server.config.USER_AGENT,
          Authorization: `Basic ${Buffer.from(server.config.CLIENT_ID + ":" + server.config.CLIENT_SECRET).toString(
            "base64",
          )}`,
        },
      });

      const data = await response.json();
      reply.setCookie("access_token", data.access_token, { path: "/" });
    } catch (err) {
      reply.send(err);
    }
  });

  // Logout
  server.post("/logout", async (_, reply) => {
    reply.clearCookie("refresh_token", { path: "/" });
    reply.clearCookie("access_token", { path: "/" });
  });
};
