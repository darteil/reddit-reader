declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: string;
      USER_AGENT: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      CLIENT_URL_ADRESS: string;
    };
  }
}

export {};
