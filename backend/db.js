// db.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
const DB_URI = "mongodb+srv://diyadileep0806:HGdUmqFPDtrL7J88@hackathon1.aqy5syh.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon1";

mongoose.connect(DB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));


// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
