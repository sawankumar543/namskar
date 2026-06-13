import express from 'express';
import 'dotenv/config'
import { connectDB } from './lib/db.js';
import dns from 'node:dns/promises'
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'

// make app
const app = express()
dns.setServers(['1.1.1.1', '8.8.8.8']);
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(clerkMiddleware())
app.use(express.json())
app.use(cors({ origin: FRONTEND_URL, credentials: true} ))

app.get('/', (req, res) => {
    const {message, image, video} = req.body
    res.status(200).json({
        success: true,
    })
})

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running upon", PORT);
})