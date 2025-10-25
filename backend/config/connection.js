import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/CarRentalApp");
        console.log("Connection to DB Successful")
    }
    catch (e) {
        console.error("Error connecting to DB", e.message)
        process.exit(1);
    }
}

export default connectDB;