const express = require("express")
const app = express()
const port = 5016
const cors = require("cors")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const config = require("./db/db")
require("dotenv").config()

const users = require("./routes/user")

const ejs = require("ejs")
const path = require("path")
const fs = require("fs")
const dirPath = path.join(__dirname, "public/pdfs")

mongoose
  .connect(config.JWT_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected")
    },
    (err) => {
      console.log("Cannot connect to the database" + err)
    }
  )

app.use(passport.initialize())
require("./passport")(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/users", users)

const files = fs.readdirSync(dirPath).map((name) => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/pdfs/${name}`,
  }
})

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index", { files })
})

app.use(express.static("public"))
app.use(cors())
app.use(fileUpload())

app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }

  const myFile = req.files.file

  // Use the mv() method to place the file somewhere on your server
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "error" })
    }
    return res.send({
      file: myFile.name,
      path: `/${myFile.name}`,
      ty: myFile.type,
    })
  })
})

const userServices = require("./user-services")

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome Page")
})

app.set("view engine", "ejs")

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

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
  const text = req.query["text"]
  try {
    const result = await userServices.findText(text)
    res.send({ texts: result })
  } catch (error) {
    console.log(error)
    res.status(500).send("An error ocurred in the server.")
  }
})

app.post("/resume", async (req, res) => {
  const textToAdd = req.body
  const savedText = await userServices.addText(textToAdd)
  if (savedText) {
    res.status(201).send(savedText)
  } else {
    res.status(500).end
  }
})

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
  const id = req.params["id"]
  let result = await userServices.findTextsById(id)
  if (result === undefined || result.length == 0)
    res.status(404).send("ID of text not found")
  else {
    result = { texts: result }
    res.send(result)
  }
})

// function findTextsById(id) {
//     return uploaded_text['texts'].find( (text) => text['id'] == id);
// }

//
app.delete("/resume/:id", async (req, res) => {
  const id = req.params["id"]
  let result = userServices.findTextsByIdRemove(id)
  if (result === false) {
    res.status(404).send("Resource not found.")
  } else {
    result = { texts: result }
    res.status(204).send(result)
  }
})

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
