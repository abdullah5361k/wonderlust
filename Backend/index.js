require('dotenv').config();
const express = require("express");
const dbConnection = require("./config/db.config");
const app = express();
const listRouter = require("./src/routes/listing.route");
const reviewRouter = require("./src/routes/review.route");
const errorMiddleware = require("./src/middlewares/error.middleware");
const authRouter = require("./src/routes/auth.route");
const passport = require("passport");
const jwtStrategy = require("./src/middlewares/auth.middleware");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(jwtStrategy);

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

// Auth
app.use("/api/v1/auth", authRouter);

// Listing rout
app.use("/api/v1/listing", listRouter);

// Reviews
app.use("/api/v1/reviews", reviewRouter);

// Not found
app.all("*", (req, res) => {
    res.status(404).send("OPPS! 404 page not found!")
})


// Error Handling
app.use(errorMiddleware);

// Server
app.listen(3000, async () => {
    await dbConnection();
    console.log("Server is running");
})