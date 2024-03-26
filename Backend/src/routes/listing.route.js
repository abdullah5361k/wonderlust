const express = require("express");
const listRouter = express.Router();
const listController = require("../controllers/listing.controllers");
const passport = require("passport");
const uploads = require("../middlewares/upload");

const verifyJwt = passport.authenticate('jwt', { session: false });
listRouter.get("/get", listController.getLists);
listRouter.post("/create/list", verifyJwt, uploads.single('image'), listController.createList);
listRouter.put("/edit/list/:id", verifyJwt, uploads.single('image'), listController.editList);
listRouter.delete("/delete/list/:id", verifyJwt, listController.deleteList);
listRouter.get("/list/:id", listController.getListById);

module.exports = listRouter;