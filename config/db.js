import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo db connected succesfully...")
    }

    catch (error) {
        console.log(`error in db connection`, error)
        console.error("Error in db connection", error)
        process.exit(1)
    }
}