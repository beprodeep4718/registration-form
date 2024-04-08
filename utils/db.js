const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
