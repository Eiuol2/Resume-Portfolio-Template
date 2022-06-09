let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router()

let postSchema = require("../Models/Post")

// create post
router.route("/create-post").post((req, res, next) => {
  postSchema.create(req.body, (error, data) => {
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
  postSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// get single post
router.route("/edit-post/:id").get((req, res) => {
  postSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// update post
router.route("/update-post/:id").put((req, res, next) => {
  postSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log("Post updated successfully!")
      }
    }
  )
})

//delete post
router.route("/delete-post/:id").delete((req, res, next) => {
  postSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data, // ???
      })
    }
  })
})

module.exports = router
