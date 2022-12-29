import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import servestatic from "@fastify/static";
import path from "path";
import { routes } from "./reddit-api";
import { config } from "./utils/config";

const staticPath = path.join(__dirname, "..", "client/dist");

const envSchema = {
  type: "object",
  required: ["PORT", "userAgent", "clientId", "clientSecret"],
  properties: {
    port: {
      type: "string",
      default: 3000,
    },
    userAgent: {
      type: "string",
      default: "",
    },
    clientId: {
      type: "string",
      default: "",
    },
    clientSecret: {
      type: "string",
      default: "",
    },
  },
};

const options = {
  confKey: "config",
  schema: envSchema,
  dotenv: {
    path: `${path.join(__dirname, "..", "/.env")}`,
  },
  data: process.env,
};

const app = Fastify({});

(async () => {
  await app.register(fastifyEnv, options).ready((err) => {
    if (err) app.log.error(err);
  });

  await app.register(servestatic, {
    root: staticPath,
  });

  await app.register(routes, { prefix: "api" });
})();

app.get("/", (request, reply) => {
  reply.sendFile("index.html");
});

const start = async () => {
  try {
    await app.listen({ port: parseInt(config.port) });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
