import mongoose, { Model, Schema } from "mongoose";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser {
    fullName: string;
    email: string;
    phoneNumber: String;
}
const userSchema: Schema<IUser> = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your name!"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email address!"],
        validate: {
            validator: (value: string) => (
                emailRegex.test(value)
            )
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number!"],
        minLength: [10, "Please enter a atleast 10 charecters!"],
        maxLength: [10, "Please enter only 10 charecters!"]
    }
}, {timestamps: true});


export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);