const cloudinary = require("cloudinary");
const AppError = require("./appError.util");

async function saveImageOnCloud({ file }, next) {
    if (file) {
        try {
            const result = await cloudinary.v2.uploader.upload(file.path, {
                folder: "wonderLust"
            });
            return result;
        } catch (error) {
            return next(new AppError(500, "File not uploaded on cloud try again"));
        }
    }
}

module.exports = saveImageOnCloud;