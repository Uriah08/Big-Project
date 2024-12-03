import express from 'express'
import { loginUser, protectedRoute } from '../controllers/loginController';

const router = express.Router()

router.post("/login", loginUser)
router.get("/protected", protectedRoute)

export default router;
