const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const { validateReview, isLoggeddIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js");


//Post Route
router.post("/",isLoggeddIn,wrapAsync(reviewController.createReview));

//Delete Route
router.delete("/:reviewId",isLoggeddIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;