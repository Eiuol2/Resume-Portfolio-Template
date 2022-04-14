const asyncify = require("express-asyncify");
const jwt = require("jsonwebtoken");

let mongoose = require("mongoose"),
  express = require("express"),
  router = asyncify(express.Router());

let postSchema = require("../Models/Post");

function authenticateUser(req, res, next) {
  console.log("this is req: " + req);
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth hearder (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  } else {
    // If a callback is supplied, verify() runs async
    // If a callback isn't supplied, verify() runs synchronously
    // verify() throws an error if the token is invalid
    try {
      // verify() returns the decoded obj which includes whatever objs
      // we use to code/sign the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userid = decoded;
      // in our case, we used the username to sign the token
      console.log(decoded);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }
}

//authenticate block
router.use("/create-post", (req, res, next) => {
  console.log("This is req1: " + JSON.stringify(req.headers["authorization"]));
  authenticateUser(req, res, next);
});

// create post
router.route("/create-post").post((req, res, next) => {
  const object = req.body;
  object.userid = req.userid;
  console.log("This is userid: " + object.userid);
  postSchema.create(object, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//read posts
router.route("/").get((req, res) => {
  postSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get single post
router.route("/edit-post/:id").get((req, res) => {
  postSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// update post
router.route("/update-post/:id").put((req, res, next) => {
  postSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Post updated successfully!");
      }
    }
  );
});

//delete post
router.route("/delete-post/:id").delete((req, res, next) => {
  console.log("inside delete-post")
  postSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(204).json({
        msg: data // ???
      });
    }
  });
});

module.exports = router;
