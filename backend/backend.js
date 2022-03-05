const express = require("express");
const app = express();
const port = 5016;
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const db = require("./db/db");
const postRouter = require("./Routes/post");
const router = new express.Router()


const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const dirPath = path.join(__dirname, "public/pdfs");
 /*
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Cannot connect to the database" + err);
  }
);
*/
const files = fs.readdirSync(dirPath).map(name => {
    return {
      name: path.basename(name, ".pdf"),
      url: `/pdfs/${name}`
    };
});
  
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(cors());


app.use("/api/posts", postRouter)



// app.set("view engine", "ejs");
// app.use(express.static("public"));

// app.get("/", (req, res) => {
// res.render("index", { files });
// });

app.post("/upload", (req, res) => {
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

const userServices = require("./user-services");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Page");
});

app.set("view engine", "ejs");



// app.get('/resume', async (req, res) => {
//     const text = req.query.text;
//     if (text != undefined) {
//         const result = await userServices.findText(text);
//         result = {texts: result};
//         res.send(result);
//     }
//     else {
//        //
//         res.send(uploaded_text);
//     }

// });

app.get("/resume", async (req, res) => {
  const text = req.query["text"];
  try {
    const result = await userServices.findText(text);
    res.send({ texts: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.post("/resume", async (req, res) => {
  const textToAdd = req.body;
  const savedText = await userServices.addText(textToAdd);
  if (savedText) {
    res.status(201).send(savedText);
  } else {
    res.status(500).end;
  }
});

// function addText(textToAdd) {
//     uploaded_text['id'] = Math.floor((Math.random() * 100) + 1).toString();
//     uploaded_text['texts'].push(textToAdd);
// }

// app.get("/resume", (req, res) => {
//   const text = req.query.text
//   let result = findText(text)
//   result = { texts: result }
//   res.send(result)
// })

// app.post("/resume", (req, res) => {
//   const textToAdd = req.body
//   addText(textToAdd)
//   res.status(200).end()
// })

// function addText(textToAdd) {
//   uploaded_text["texts"].push(textToAdd)
// }

// const findText = (text) => {
//     return uploaded_text['texts'];
// }

app.get("/resume/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await userServices.findTextsById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send("ID of text not found");
  else {
    result = { texts: result };
    res.send(result);
  }
});

// function findTextsById(id) {
//     return uploaded_text['texts'].find( (text) => text['id'] == id);
// }

//
app.delete("/resume/:id", async (req, res) => {
  const id = req.params["id"];
  let result = userServices.findTextsByIdRemove(id);
  if (result === false) {
    res.status(404).send("Resource not found.");
  } else {
    result = { texts: result };
    res.status(204).send(result);
  }
});


// function findTextsByIdRemove(id) {
//     for (i = 0; i < uploaded_text.texts.length; i++ ) {
//         if (uploaded_text['texts'][i].id === id) {
//             uploaded_text['texts'].splice(i, 1);
//             return true;
//         }
//     }
//     return false;
// }

// const uploaded_text = {
//     texts: [
//         {
//             id: "xyz123",
//             text: "First text",
//             user: "Group D"
//         }
//     ]
// }


router.post("",(req, res, next) => {
  const post = new Post({
      title: req.body.title,
      content: req.body.content,
  })
  post.save().
      then(post => {
          if(post){
              res.status(201).json({
                  message: "Post added successfully",
                  post: {
                      ...post,
                      id: post._id
                  }
              })
          }
  }).catch(e => {
          console.log(e)
      })
})

// READ OPERATION
router.get("/mypost", (req, res, next) => {
Post.find({creator: req.userData.userId}).then(post => {
if (post) {
  res.status(200).json({
      message: "Posts fetched successfully!",
      posts: post
  });
}
}).catch(e=>{
  console.log(e)
});
});

//UPDATE OPERATION
router.put(
"/:id",
(req, res, next) => {
  const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
   
  });
  Post.updateOne(
      { _id: req.params.id},
      post
    ).then(result => {
      if(result){
          res.status(200).json({ message: "Update successful!" });
      }       
      else {
          res.status(500).json({ message: "Error Upating Post" });
      }
  });
}
);


//DELETE OPERATION
router.delete("/:id", (req, res, next) => {
Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
result => {
  console.log(result);
  if (result.n > 0) {
    res.status(200).json({ message: "Deletion successful!" });
  } else {
      return res.status(401).json({ message: "Not authorized!!" });
  }
}
);
});




