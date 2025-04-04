import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import servestatic from "@fastify/static";
import type { FastifyCookieOptions } from "@fastify/cookie";
import cookie from "@fastify/cookie";
import path from "path";
import { routes } from "./api";

const staticPath = path.join(__dirname, "..", "client/dist");
const envPath = path.join(__dirname, "..", "/.env");

const envSchema = {
  type: "object",
  required: ["PORT", "USER_AGENT", "CLIENT_ID", "CLIENT_SECRET", "CLIENT_URL_ADRESS"],
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
    CLIENT_URL_ADRESS: {
      type: "string",
      default: "http://localhost:5173",
    },
  },
};

const options = {
  confKey: "config",
  schema: envSchema,
  dotenv: { path: envPath },
};

const startServer = async () => {
  const app = Fastify({});

  try {
    await app.register(fastifyEnv, options);

    app.register(servestatic, { root: staticPath });

    app.register(cookie, {
      parseOptions: { httpOnly: true },
    } as FastifyCookieOptions);

    routes.forEach((route) => {
      app.register(route, { prefix: "api" });
    });

    app.get("/", async function handler() {
      return { text: "Server working..." };
    });

    await app.listen({ port: parseInt(app.config.PORT) });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
