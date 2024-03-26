const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        id: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }
})

const review = mongoose.model("Review", reviewSchema);

module.exports = review;