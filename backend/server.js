const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctors");

// Initialize Express app
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js app URL
    credentials: true,
  })
);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Doctor API is running",
    endpoints: {
      getAllDoctors: "GET /api/doctors",
      getDoctorById: "GET /api/doctors/:id",
      getDoctorsBySpecialty: "GET /api/doctors/specialty/:specialty",
      getDoctorsByConsultationType: "GET /api/doctors/consultation/:type",
    },
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
