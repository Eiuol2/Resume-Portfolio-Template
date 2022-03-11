let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let resumeSchema = require("../Models/Resume");

// create post
router.route("/upload").post((req, res, next) => {
  resumeSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

//read posts
router.route("/").get((req, res) => {
  resumeSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get single post
router.route("/edit-resume/:id").get((req, res) => {
  resumeSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//delete post
router.route("/delete-resume/:id").delete((req, res, next) => {
  resumeSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data, // ???
      });
    }
  });
});

module.exports = router;
