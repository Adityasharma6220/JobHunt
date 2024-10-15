import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration for frontend and credentials
const corsOptions = {
  origin: process.env.Frontend_URL, // Frontend URL (Netlify or localhost)
  credentials: true,               // Allow sending cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Restrict methods if needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

app.use(cors(corsOptions));

// Port configuration
const PORT = process.env.PORT || 3000;

// Health check route
app.get("/health", (req, res) => {
  return res.json("OK");
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Server listener
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
