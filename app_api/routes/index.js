// API router

// do not include /api in route pathnames:
// app.use("/api", apiRoutes) 
// in app.js attaches /api to all of these routes

// import the Express Router in order to add routes to it
const express = require("express");
const router = express.Router();

// import controller for the "locations" collection
const ctrlLocations = require("../controllers/locations");
// import controller for the "reviews" subdocuments
const ctrlReviews = require("../controllers/reviews");

// use compact Express route definitions:
// list the common pathname in the param of router.route(pathname),
// then chain on all REST CRUD methods with their controller methods to call

// the router.get, .post, .put, and .delete methods 
// pass data INTO their parameter functions as "req" (the request),
// AND ALSO pass in an object to the "res" (the result) parameter
// which is given a value by the Mongoose request,
// and then the "res" object data is passed back up the router to the Express app

// all locations
router
  .route("/locations")
  .get(ctrlLocations.locationsListByDistance) // get all locations
  .post(ctrlLocations.locationsCreate); // create a new location

// specific location
router
  .route("/locations/:locationid")
  .get(ctrlLocations.locationsReadOne) // get one location
  .put(ctrlLocations.locationsUpdateOne) // update a location's data
  .delete(ctrlLocations.locationsDeleteOne); // delete a location

// all reviews
router
  .route("/locations/:locationid/reviews")
  .post(ctrlReviews.reviewsCreate); // create a new review

// specific review
router
  .route("/locations/:locationid/reviews/:reviewid")
  .get(ctrlReviews.reviewsReadOne) // get one review
  .put(ctrlReviews.reviewsUpdateOne) // update a review
  .delete(ctrlReviews.reviewsDeleteOne); // delete a review

// export the express.Router() with the above routes added to it
module.exports = router;