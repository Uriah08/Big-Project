import express from "express";
import { PrismaClient } from "@prisma/client";

const authRouter = express.Router();
const prisma = new PrismaClient();

authRouter.use('/login', async (req, res, next) => {
  const { ExpressAuth } = await import('@auth/express');
  const { default: Credentials } = await import('@auth/express/providers/credentials');
  
  ExpressAuth({
    providers: [
      Credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize: async (credentials) => {
            const { email, password } = credentials
            
          return null;
        }
      })
    ]
  })(req, res, next);
});

export default authRouter;
