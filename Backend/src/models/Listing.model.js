const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./Review.model");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    admin: {
        id: {
            type: String
        },
        username: {
            type: String
        }
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    category: {
        type: String,
        enum: ["Room", "Iconic City", "Mountain", "Castle", "Amazing Pool", "Camping", "Farm", "Arctic"]
    }
}, { timestamps: true });


listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const listing = mongoose.model("Listing", listingSchema);
module.exports = listing;