import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import redoc from "redoc-express";
import errorHandler from "./middleware/errorMiddleware.js";
import userRoutes from './routes/UserRoutes.js'

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Product Routes
app.use("/api/products", productRoutes);
//user Routes
app.use('/api/users',userRoutes)

// API Docs
app.get(
  "/docs",
  redoc({
    title: "Elite Desi Farms API Docs",
    specUrl: "/openapi.json",
  }),
);

app.get("/openapi.json", (req, res) => {
  res.sendFile(process.cwd() + "/openapi.json");
});

// 404 Handler (MUST come before errorHandler)
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Route not found - ${req.originalUrl}`);
  next(error);
});

// Error Handler (ALWAYS LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
