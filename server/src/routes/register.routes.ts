import { Router } from "express";
import { registerUser } from "../controllers/registerController";

const router = Router();

router.post("/register", registerUser)

export default router