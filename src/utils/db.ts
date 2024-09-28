require("dotenv").config();
import mongoose from "mongoose";

const dbUrl: string = process.env.DATABASE_URL || "";
export const connectDb = async()=> {
     try {
          const connectionInstance = await mongoose.connect((dbUrl));
          console.log(`Database is connected !! DB HOST: ${connectionInstance.connection.host}`);
     } catch (error: any) {
          console.log(error.message);
          setTimeout(connectDb, 5000);
     }
}