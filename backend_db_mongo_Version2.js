const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI not provided — running without persistent DB.");
    return;
  }
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.warn("MongoDB connection error:", err);
    throw err;
  }
};