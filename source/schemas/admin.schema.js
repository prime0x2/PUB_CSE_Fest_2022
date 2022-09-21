import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        username: {
            type: String,
            unique: [true, "Username already exists"],
            required: [true, "Username is required"],
            minlength: [4, "Username must be 4 characters long"],
            maxlength: [16, "Username must be less than 16 characters"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        admin: {
            type: Boolean,
            default: true,
            immutable: true,
        }
    },
    {
        timestamps: true,
    }
);


export const AdminModel = mongoose.model("Admin", adminSchema);