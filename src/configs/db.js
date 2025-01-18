import mongoose from "mongoose";

async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw new Error(error);
  }
}

export default connectToDB;
