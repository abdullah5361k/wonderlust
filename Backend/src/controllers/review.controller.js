const Listing = require("../models/Listing.model");
const Review = require("../models/Review.model");
const asyncWrap = require("../utils/asyncWrapper");
const { reviewSchema } = require("../utils/schema");
const AppError = require("../utils/appError.util");

/**
 * * Create Reviews
 */
exports.createReviews = asyncWrap(async (req, res, next) => {
    console.log("Req", req.user);
    const { review, rating } = req.body;
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return next(new AppError(400, `${error.details[0].message}`));
    }

    const list = await Listing.findById(req.params.id);
    if (!list) {
        return next(new AppError(400, "List not founded"));
    }
    const reviews = new Review({ review, rating, createdBy: { id: req.user._id, username: req.user.username } });
    list.reviews.push(reviews);
    await list.save();
    await reviews.save();
    return res.status(200).json({
        success: true,
        message: "Reviews added successfully",
        data: reviews
    })
});


/**
 * * Delete Reviews
 */

exports.deleteReview = asyncWrap(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        return next(new AppError(404, "Resource Not Found"));
    }
    await Listing.updateMany({ reviews: review._id }, { $pull: { reviews: review._id } });
    return res.status(200).json({
        success: true,
        message: "Deleted successfully"
    })
});

