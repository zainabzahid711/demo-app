// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use environment variable, but fallback to 'mongodb://mongodb:27017/taskmanager'
    // 'mongodb' is the hostname = the name of our MongoDB service in docker-compose
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://mongodb:27017/taskmanager"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
