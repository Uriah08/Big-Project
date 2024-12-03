import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

// ROUTES IMPORTS //
import authRoutes from './routes/auth.routes'
import registerRoutes from './routes/register.routes'

// CONFIGURATIONS //
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTES //
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

// API ROUTES //
app.use('/auth', authRoutes);
app.use('/auth', registerRoutes);

// START SERVER //
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})