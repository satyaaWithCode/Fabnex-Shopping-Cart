// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import { connectDB } from "./config/db.js";

// // Routes
// import authRoutes from "./routes/auth.routes.js";
// import productRoutes from "./routes/product.routes.js";  // ⭐ Added

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(morgan("dev"));

// app.use(
//   cors({
//     origin: [process.env.CLIENT_URL || "http://localhost:5173"],
//     credentials: true,
//   })
// );

// app.get("/", (req, res) => {
//   res.json({ success: true, message: "Fabnex API running" });
// });

// // APIs
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes); // ⭐ Added

// // Connect DB
// connectDB();

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js"; // ⭐ Products API

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
    credentials: true,
  })
);

// ⭐ CONNECT DATABASE FIRST
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Fabnex API running" });
});

// ⭐ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // ⭐ Product routes added

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
