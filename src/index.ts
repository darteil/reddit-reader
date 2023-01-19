import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import servestatic from "@fastify/static";
import type { FastifyCookieOptions } from "@fastify/cookie";
import cookie from "@fastify/cookie";
import path from "path";
import { routes } from "./reddit-api";

const staticPath = path.join(__dirname, "..", "client/dist");
const envPath = path.join(__dirname, "..", "/.env");

const envSchema = {
  type: "object",
  required: ["PORT", "USER_AGENT", "CLIENT_ID", "CLIENT_SECRET"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    USER_AGENT: {
      type: "string",
      default: "",
    },
    CLIENT_ID: {
      type: "string",
      default: "",
    },
    CLIENT_SECRET: {
      type: "string",
      default: "",
    },
  },
};

const options = {
  confKey: "config",
  schema: envSchema,
  dotenv: {
    path: envPath,
  },
};

const startServer = async () => {
  const app = Fastify({});
  try {
    await app.register(fastifyEnv, options);

    await app.register(servestatic, {
      root: staticPath,
    });

    app.register(cookie, {
      parseOptions: { httpOnly: true },
    } as FastifyCookieOptions);

    await app.register(routes, { prefix: "api" });

    app.get("/", (_, reply) => {
      reply.sendFile("index.html");
    });

    app.listen({ port: parseInt(app.config.PORT) });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
