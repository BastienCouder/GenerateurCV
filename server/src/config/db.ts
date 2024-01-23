import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI!)
      .then(() => console.log("Mongo connecté"));
  } catch (error) {
    console.log("error");
    process.exit();
  }
};
