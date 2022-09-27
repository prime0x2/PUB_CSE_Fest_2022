import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [4, "Name must be 4 characters long"],
            maxlength: [32, "Name must be less than 32 characters"],
        },
        studentID: {
            type: String,
            unique: [true, "Student ID already exists"],
            required: [true, "Student ID is required"],
            minlength: [11, "Student ID must be 11 characters long"],
            maxlength: [16, "Student ID must be 16 characters long"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            minlength: [11, "Phone number must be 11 characters long"],
            maxlength: [11, "Phone number must be 11 characters long"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        fest2022: {
            tShirtSize: {
                type: String,
                enum: ["S", "M", "L", "XL", "XXL", null],
                default: null,
            },
            payment: {
                trxID: {
                    type: String,
                    default: null,
                },
                status: {
                    type: String,
                    enum: ["pending", "approved", "rejected"],
                    default: "pending",
                },
                date: {
                    type: Date,
                    default: null,
                },
            },
            info: {
                isAttending: {
                    type: Boolean,
                    default: false,
                },
                receivedTShirt: {
                    type: Boolean,
                    default: false,
                },
                receivedFood: {
                    type: Boolean,
                    default: false,
                },
            }
        }
    },
    {
        timestamps: true,
    }
);


export const StudentModel = mongoose.model("Student", studentSchema);