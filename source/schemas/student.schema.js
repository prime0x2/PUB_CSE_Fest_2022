import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        studentID: {
            type: String,
            unique: [true, "Student ID already exists"],
            required: [true, "Student ID is required"],
            minlength: [11, "Student ID must be 11 characters long"],
            maxlength: [16, "Student ID must be 16 characters long"],
        },
        batch: {
            type: String,
            required: [true, "Batch is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


export const StudentModel = mongoose.model("Student", studentSchema);