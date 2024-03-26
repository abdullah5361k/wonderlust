const joi = require("joi");

const listingScheama = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    location: joi.string().required(),
    country: joi.string().required(),
    category: joi.string().valid("Room", "Iconic City", "Mountain", "Castle", "Amazing Pool", "Camping", "Farm", "Arctic")
})

const reviewSchema = joi.object({
    review: joi.string().required(),
    rating: joi.number().required()
})

const authSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
})

module.exports = { listingScheama, reviewSchema, authSchema };