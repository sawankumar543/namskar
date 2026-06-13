import express from 'express';
import 'dotenv/config'
import { connectDB } from './lib/db.js';
import dns from 'node:dns/promises'
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import path from 'node:path';
import fs from 'node:fs'; // 👈 यह लाइन गायब थी, इसे अब जोड़ दिया गया है

// make app
const app = express()
dns.setServers(['1.1.1.1', '8.8.8.8']);
const PORT = process.env.PORT || 10000; // Render के लिए डिफ़ॉल्ट पोर्ट बैकअप
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "public")

app.use(clerkMiddleware())
app.use(express.json())
app.use(cors({ origin: FRONTEND_URL, credentials: true} ))

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
    })
})

if(fs.existsSync(publicDir)) {
    app.use(express.static(publicDir))
    // नोट: यहाँ राउटर को वाइल्डकार्ड के लिए '*' लिखा जाता है
    app.get("*any", (req, res) => {
        res.sendFile(path.join(publicDir, "index.html"))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running upon", PORT);
})
