const User = require("../models/User.model");
const AppError = require("../utils/appError.util");
const asyncWrapper = require("../utils/asyncWrapper");
const { authSchema } = require("../utils/schema");
const bcrypt = require("bcrypt");

const httpOptions = {
    maxAge: 24 * 60 * 60 * 1000,  // Would expire in 24 hours
    httpOnly: false,
    secure: true,
    sameSite: "None"
}

/**
 * * Register
 */
exports.registerUser = asyncWrapper(async (req, res, next) => {
    const { error } = authSchema.validate(req.body); // Validata body
    if (error) {
        return next(new AppError(400, "Please provide valid credentials")); // If there is an error
    }
    const { username, email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
        return next(new AppError(400, `User with ${isExist.email} already exists!`)); // If email alredy exist in DB
    }
    const storeInDb = new User({ username, email, password }); // Store user in DB
    await storeInDb.save();
    storeInDb.password = undefined; // Set password undefined
    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: storeInDb
    })
})


exports.login = asyncWrapper(async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    const isUserExists = await User.findOne({ email }); // Find email in DB
    if (!isUserExists) {
        return next(new AppError(400, `User with this ${email} not exist, Please use another email`));  // If no email found in DB
    }
    const isMatch = await bcrypt.compare(password, isUserExists.password);   // Compare password with user password
    if (!isMatch) {
        return next(new AppError(400, "Wrong password, Please provid valid password")); // If password not matched
    }
    const token = isUserExists.generateAuthToken();   // Generae JWT token
    res.cookie("token", token, httpOptions);
    return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: isUserExists
    })
})