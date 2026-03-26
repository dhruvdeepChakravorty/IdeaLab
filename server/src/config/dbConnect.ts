import mongoose from "mongoose";

const dbConnect = async () => {

     if (mongoose.connection.readyState==1) {
            console.log('Server already connected')
        }
    const uri = process.env.MONGO_URI

    if(!uri){
        console.log("URI doesnt exist in ENV")
        process.exit(1)
    }
    
    try {
        await mongoose.connect(uri)
       console.log(`connection successful ${mongoose.connection.host}`)
    } catch (error:unknown) {
         if (error instanceof Error) {
            console.log(`Connection Failed: ${error.message} `)
         }
         process.exit(1)
    }
}

export default dbConnect