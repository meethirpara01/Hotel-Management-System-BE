import mongoose from "mongoose";

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To DB");
}

export default connectToDB;