import express from "express";

const authRouter = express.Router();

(async () => {
  const { ExpressAuth } = await import('@auth/express');

  authRouter.use("/auth/*", ExpressAuth({
    providers: []
  }));
})();

export default authRouter;
