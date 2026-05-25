import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]   
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must br unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: ["ADMIN", "CUSTOMER"],
            message: "Role can only contain ADMIN or CUSTOMER"
        },
        default: "CUSTOMER"
    },
    phone: {
        type: Number,
    },
    ProfilePic: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

userSchema.pre('save', async function () {

    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

const userModel = mongoose.model("USERS", userSchema);
export default userModel;