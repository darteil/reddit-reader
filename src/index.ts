import { fastify, FastifyReply, FastifyRequest } from "fastify";
import fastifyEnv from "@fastify/env";
import servestatic from "@fastify/static";
import path from "path";
import { routes } from "./reddit-api";
import { config } from "./utils/config";

const staticPath = path.join(__dirname, "..", "client/dist");

const envSchema = {
  type: "object",
  required: ["PORT", "userAgent", "clientId", "clientSecret", "refreshToken"],
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

const server = fastify({
  logger: true,
});

server.register(fastifyEnv, options).ready((err) => {
  if (err) server.log.error(err);
});

server.register(servestatic, {
  root: staticPath,
});

server.register(routes, { prefix: "api" });

server.get("/", (request: FastifyRequest, reply: FastifyReply) => {
  reply.sendFile("index.html");
});

const start = async () => {
  try {
    await server.listen({ port: parseInt(config.port || "3000") });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
