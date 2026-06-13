import mongoose from 'mongoose';
import 'dotenv/config'

export async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if(!mongoUri) {
            throw new Error("MONGO_URI is required")
        };
        const conn = await mongoose.connect(mongoUri)
        console.log("MongoDB connected 😀", conn.connection.host)
    } catch(error) {
        console.error("MongoDB connected error 😔", error.message)   
        process.exit(1) // 1 means faild and 0 means success
    }
}