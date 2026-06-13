import express from 'express';
import 'dotenv/config'

// make app
const app = express()
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log("Server is running upon", PORT);
})