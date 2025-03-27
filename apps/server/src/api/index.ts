import { authRoute } from "./routes/auth";
import { subredditsRoute } from "./routes/subreddits";
import { articlesRoute, articlesForUnauthorizedUserRoute } from "./routes/articles";

export const routes = [authRoute, subredditsRoute, articlesRoute, articlesForUnauthorizedUserRoute];
