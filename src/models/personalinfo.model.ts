import mongoose, { Schema } from "mongoose";

const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;

interface PersonalInfo {
    user: Object;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryCarePhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies?: string;
    currentMedications?: [string];
    familyMedicalHistory?: string;
    pastMedicalHistory?: string;
    identificationType?: string;
    identificationNumber?: string;
    identificationDocumentImage?: string;
    consentAndPrivacy: boolean;
}

const personalInfoSchema: Schema<PersonalInfo> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    dateOfBirth: {
        type: String,
        required: [true, "Please enter your date of birth!"],
        validate: {
            validator: (value)=> {
                return dateRegex.test(value);
            }
        }
    },
    gender: {
        type: String,
        required: [true, "Please enter your gender!"],
        enum: ["male", "female", "other"]
    },
    address: {
        type: String,
        required: [true, "Please enter your address!"]
    },
    occupation: {
        type: String,
        required: [true, "Please enter your occupation!"]
    }
}, {timestamps: true});

export const personalInfo = mongoose.model("PersonalInfo", personalInfoSchema);