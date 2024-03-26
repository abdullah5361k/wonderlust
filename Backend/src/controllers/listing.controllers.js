
const list = require("../models/Listing.model");
const asyncWrap = require("../utils/asyncWrapper");
const AppError = require("../utils/appError.util");
const { listingScheama } = require("../utils/schema");
const saveImageOnCloud = require("../utils/cloudImage");
const fs = require("fs");
const cloudinary = require("cloudinary");

/**
 * * Get Lists
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getLists = asyncWrap(async (req, res, next) => {
    const lst = await list.find({});
    if (!lst) {
        return next(new AppError(400, "No list found"));
    }
    return res.status(200).json({
        success: true,
        message: "list fetched successfully",
        data: lst
    })
});


/**
 * * Get list By Id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

exports.getListById = asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const lst = await list.findById({ _id: id }).populate("reviews");
    if (!lst) {
        return next(new AppError(400, "List not founded"));
    }
    return res.status(200).json({
        success: true,
        message: "List founded successfully",
        data: lst
    })
})



/**
 * * Create List
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

exports.createList = asyncWrap(async (req, res, next) => {
    const { error } = listingScheama.validate(req.body);
    if (error) {
        return next(new AppError(400, `${error.details[0].message}`));
    }
    const { title, description, price, location, country, category } = req.body;
    const result = await saveImageOnCloud(req, next);
    const { secure_url, public_id } = result;
    fs.unlinkSync(`uploads/${req.file.filename}`);
    const lst = new list({ title, description, price, location, country, category, admin: { id: req.user._id, username: req.user.username } });
    lst.image = { url: secure_url, filename: public_id };
    await lst.save();
    return res.status(201).json({
        success: true,
        message: "list created successfully",
        data: lst
    })
});

/**
 * * Edit list
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.editList = asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    console.log(req.file);
    const { error } = listingScheama.validate(req.body);
    if (error) {
        return next(new AppError(400, `${error.details[0].message}`));
    }
    const lst = await list.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    console.log(lst);
    if (!lst) {
        return next(new AppError(404, "Resource Not Found"));
    }
    const publicId = lst.image.filename;
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        public_id: publicId,
        overwrite: true,
        folder: "wonderLust"
    });
    const updatedList = await list.findOneAndUpdate({ _id: id }, { image: { url: uploadResult.secure_url, filename: `wonderLust/${uploadResult.public_id}` } }, { new: true });
    console.log(uploadResult);
    return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: updatedList
    })
});

/**
 * * Delete List
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.deleteList = asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const lst = await list.findByIdAndDelete(id);
    if (!lst) {
        return next(new AppError(404, "Resource Not Found"));
    }
    return res.status(200).json({
        success: true,
        message: "Deleted successfully",
    })
});