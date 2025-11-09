import mongoose, { model } from "mongoose"


export const dbConnect = () => {
    const URI = process.env.MONGODB_URI

    mongoose.connect(URI)
        .then(() => console.log("MongoDB Connected!"))
        .catch((err) => console.log(err.message))
}