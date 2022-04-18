let mongoose = require("mongoose"),
  express = require("express"),
  router = asyncify(express.Router());

let profileSchema = require("../Models/Profile");


router.route("/createprofile").post(async (req, res) => {
    const dummy = {name: "", year: "", major: "", desiredRole: "", bio: ""}
    dummy.name = req.body.name
    dummy.year = req.body.year
    dummy.major = req.body.major
    dummy.desiredRole = req.body.desiredRole
    dummy.bio = req.body.bio
    profileSchema.create(dummy, (error, data) => {
        if (error) {
            return next(error);
          } else {
            console.log(data);
            res.status(201).send(data); //what to send?
          }
    })
  })

  modules.export = router