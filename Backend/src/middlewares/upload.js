const multer = require("multer");
const AppError = require("../utils/appError.util");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        return cb(new AppError(400, `Unsported file type! ${file.mimetype}`), false);
    }
};

const uploads = multer({ dest: "uploads/", storage: storage, limits: { fileSize: 1024 * 1024 * 2, fieldNameSize: 100 }, fileFilter, fileFilter });
module.exports = uploads;