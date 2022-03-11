let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router()

const resumeServices = require("./resume.route-services");
let resumeSchema = require("../Models/Resume");

// create post
router.route("/upload-resume").post(async (req, res, next) => {
  const resume = req.body;
  const savedResume = await resumeServices.addResume(resume);
  if (savedResume) res.status(201).send(savedPost);
  else res.status(500).end();

  // resumeSchema.create(req.body, (error, data) => {
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
  const id = req.query["id"];
  try {
    const result = await resumeServices.getResumes(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }

  // resumeSchema.find((error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })
})

// get single post
router.route("/edit-resume/:id").get(async (req, res) => {
  const id = req.params["id"];
  const result = await resumeServices.findResumeById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ resumes: result });
  }

  // resumeSchema.findById(req.params.id, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })
})


//delete post
router.route("/delete-resume/:id").delete(async (req, res, next) => {
  const id = req.params["id"]
  let result = postServices.findResumeByIdRemove(id);
  if (result === false) {
    res.status(404).send("Resource not found.")
  } else {
    res.status(200).json(result)
  }
  
  // resumeSchema.findByIdAndRemove(req.params.id, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.status(200).json({
  //       msg: data, // ???
  //     })
  //   }
  // })
})

module.exports = router
