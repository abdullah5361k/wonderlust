const AppError = require('../utils/appError.util');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/User.model");
const { findOne, findById } = require('../models/Review.model');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "thishowyoucangenerate"
}
const strategy = new JwtStrategy(options, async function (jwt_payload, done) {
    try {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
            return done(new AppError(400, "Please provid valid credentials!"), false);
        } else {
            return done(null, user);
        }
    }
    catch (error) {
        return done(new AppError(500, 'Something went wrong'), false);
    }
});

module.exports = strategy;