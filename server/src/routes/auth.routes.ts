import express from 'express'
import { loginUser } from '../controllers/loginController';

const router = express.Router()

router.post("/login", loginUser)

export default router;
