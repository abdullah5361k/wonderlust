const express = require("express");
const reviewRouter = express.Router();
const reviewController = require("../controllers/review.controller");
const passport = require("passport");

const verifyJwt = passport.authenticate('jwt', { session: false });
reviewRouter.post("/listing/:id", verifyJwt, reviewController.createReviews);
reviewRouter.delete("/delete/:id", verifyJwt, reviewController.deleteReview);

module.exports = reviewRouter;