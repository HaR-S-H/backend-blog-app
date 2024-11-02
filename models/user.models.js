import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    role: {
        type: String,
        required:true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    bio: {
        type: String,
        maxLength:300
    }

}, { timestamps: true })

userSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const hashPassword = await bcryptjs.hash(user.password, 10);
    user.password = hashPassword;
    next();
})

const User = mongoose.model("User", userSchema);

export default User;