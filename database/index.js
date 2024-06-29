import mongoose from "mongoose";

const connectToDb = async () => {
    if (mongoose.connection.readyState) {
        // Use the current db connection
        console.log("Already connected to MongoDB");
        return;
    }
    
    try {
        await mongoose.connect("mongodb+srv://sakethayinavolu:9tK3wy8L4XPrdP7z@cluster0.or4zlgp.mongodb.net/");
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

export default connectToDb;
