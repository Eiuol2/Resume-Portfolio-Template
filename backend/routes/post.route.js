let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router()

const postServices = require("./post.route-services");
let postSchema = require("../Models/Post");

// create post
router.route("/create-post").post(async (req, res, next) => {
  const post = req.body;
  const savedPost = await postServices.addPost(post);
  if (savedPost) res.status(201).send(savedPost);
  else res.status(500).end();

  // postSchema.create(req.body, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     console.log(data)
  //     res.json(data)
  //   }
  // })
})

//read posts
router.route("/").get(async (req, res) => {
  // postSchema.find((error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })

  const id = req.query["id"];
  try {
    const result = await postServices.getPosts(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
})

// get single post
// not sure if it works
router.route("/edit-post/:id").get(async (req, res) => {
  // postSchema.findById(req.params.id, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })
  const id = req.params["id"];
  const result = await postServices.findPostById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ resumes: result });
  }
})

// update post
router.route("/update-post/:id").put(async (req, res, next) => {
  // postSchema.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     $set: req.body,
  //   },
  //   (error, data) => {
  //     if (error) {
  //       return next(error)
  //       console.log(error)
  //     } else {
  //       res.json(data)
  //       console.log("Post updated successfully!")
  //     }
  //   }
  // )
  const id = req.params["id"];
  const post = req.body;
  const result = await postServices.findPostByIdUpdate(id, post);
  if(result === false || result === null){
    res.status(404).send("Resource not found.");
  }
  else{
    result = { posts: result }
    res.status(204).send(result)
  }
})

//delete post
router.route("/delete-post/:id").delete(async (req, res, next) => {
  // postSchema.findByIdAndRemove(req.params.id, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.status(200).json({
  //       msg: data, // ???
  //     })
  //   }
  // })

  const id = req.params["id"]
  let result = postServices.findPostByIdRemove(id);
  if (result === false) {
    res.status(404).send("Resource not found.")
  } else {
    res.status(200).json(result)
  }
})

module.exports = router
