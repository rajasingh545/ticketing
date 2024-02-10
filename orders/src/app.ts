import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  NotFoundError,
  errorHandler,
  currentUser,
} from "@rajasingh545/ticketing-package";

export const basePath = process.env.API_PATH! ?? "/api";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// app.use(
//   `${basePath}/trpc`,
//   trpcExpress.createExpressMiddleware({
//     router: ticketRouter,
//   })
// );

app.use(currentUser);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
