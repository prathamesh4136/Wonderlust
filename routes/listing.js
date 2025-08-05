const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggeddIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload  = multer({storage});


//Index Route && Create Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggeddIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );
    

//New Route
router.get("/new", isLoggeddIn,listingController.renderNewForm);


//Show Route  &&  Update Route && Delete Route
router
     .route("/:id")
     .get(wrapAsync(listingController.showListing))
     .put(
        isLoggeddIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggeddIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

//Edit Route
router.get("/:id/edit",
    isLoggeddIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;