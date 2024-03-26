const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError.util");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip hashing if password is not modified
    const saltR = 9;
    try {
        const hashedPassword = await bcrypt.hash(this.password, saltR);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(new AppError(500, error.message));
    }
})

userSchema.methods = {
    generateAuthToken: function () {
        const secret = "thishowyoucangenerate";
        const token = jwt.sign({ id: this._id, username: this.username }, secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours 
        });
        return token;
    }
}

const user = mongoose.model("User", userSchema);

module.exports = user;