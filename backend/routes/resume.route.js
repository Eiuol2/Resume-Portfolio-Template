let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let resumeSchema = require("../Models/Resume");

router.route("/upload").post((req, res) => {
  console.log("This is the req: " + req);
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }

  const myFile = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "error" });
    }
    return res.send({
      file: myFile.name,
      path: `/${myFile.name}`,
      ty: myFile.type,
    });
  });
});

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
