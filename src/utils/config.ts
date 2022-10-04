import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};
