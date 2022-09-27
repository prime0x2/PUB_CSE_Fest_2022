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
            info: {
                tShirtSize: {
                    type: String,
                    enum: ["S", "M", "L", "XL", "XXL", null],
                    default: null,
                },
                isTShirtEditable: {
                    type: Boolean,
                    default: true,
                },
                receivedTShirt: {
                    type: Boolean,
                    default: false,
                },
                day1: {
                    isAttended: {
                        type: Boolean,
                        default: false,
                    },
                    receivedFood: {
                        type: Boolean,
                        default: false,
                    },
                },
                day2: {
                    isAttended: {
                        type: Boolean,
                        default: false,
                    },
                    receivedFood: {
                        type: Boolean,
                        default: false,
                    },
                },
            },
            payment: {
                trxID: {
                    type: String,
                    default: null,
                },
                status: {
                    type: String,
                    enum: ["notPaid", "pending", "approved", "rejected"],
                    default: "notPaid",
                },
                approvedDate: {
                    type: Date,
                    default: null,
                },
            },
            participation: {
                programmingContest: {
                    type: Boolean,
                    default: false,
                },
                gamingContest: {
                    type: Boolean,
                    default: false,
                },
                treasureHunt: {
                    type: Boolean,
                    default: false,
                },
                indoorGame: {
                    type: Boolean,
                    default: false,
                },
                projectShowcase: {
                    type: Boolean,
                    default: false,
                },
                culturalProgram: {
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