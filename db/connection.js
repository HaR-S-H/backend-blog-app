import mongoose from "mongoose";

const connectedDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB is connected");
        
    } catch (error) {
        console.log("MONGODB connection error");
        
    }
}

export default connectedDB;