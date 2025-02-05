import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://vishalsharma2212003:vishalsharma12345@cluster0-shard-00-00.npbcq.mongodb.net:27017,cluster0-shard-00-01.npbcq.mongodb.net:27017,cluster0-shard-00-02.npbcq.mongodb.net:27017/?replicaSet=atlas-13fp8u-shard-0&ssl=true&authSource=admin').then(()=>console.log("DB Connected")
    )
}
