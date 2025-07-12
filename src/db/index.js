import mongoose from "mongoose"


const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Database connected successfully to ${connectionInstance.connection.host}✔️✔️✔️`);
        
    }catch(error){
        console.log("ERROR WHILE CONNECTING TO DATABASE ❌❌",error);
        process.exit(1);
    }
}

export default connectDB;