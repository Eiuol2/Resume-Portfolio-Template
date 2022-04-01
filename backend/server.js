let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let bodyParser = require("body-parser")
let dbConfig = require("./database/db")
const dotenv = require("dotenv")
const createError = require("http-errors")


const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


dotenv.config()
const router = express.Router()

// Express Route
const postRoute = require("../backend/routes/post.route")

const resumeRoute = require("../backend/routes/resume.route")

// Connecting mongoDB Database
mongoose.Promise = global.Promise
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!")
    },
    (error) => {
      console.log("Could not connect to database : " + error)
    }
  )
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())
app.use(fileUpload())
app.use("/posts", postRoute)
app.use("/resume", resumeRoute)


//---------------------------------------------JWT RELATED---------------------------------------------------------------


//Generating tokens


function generateAccessToken(username) {
  return jwt.sign({"username": username}, process.env.TOKEN_SECRET, { expiresIn: "800s" });
}

//Signup

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const userPwd = req.body.pwd; 
  if (!username && !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    if (username === fakeUser.username) {
      //Conflicting usernames. Assuming it's not allowed, then:
      res.status(409).send("Username already taken");
    } else {
      // generate salt to hash password
      /* Made up of random bits added to each password instance before its hashing. 
      Salts create unique passwords even in the instance of two users choosing the 
      same passwords. Salts help us mitigate hash table attacks by forcing attackers 
      to re-compute them using the salts for each user.
      More info: https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
      */
      // Also, you can pull this salt from an env variable
      const salt = await bcrypt.genSalt(10);
      // On the database you never store the user input pwd. 
      // So, let's hash it:
      const hashedPWd = await bcrypt.hash(userPwd, salt);
      // Now, call a model function to store the username and hashedPwd (a new user)
      // For demo purposes, I'm skipping the model piece, and assigning the new user to this fake obj
      fakeUser.username = username;
      fakeUser.pwd = hashedPWd;
      
      const token = generateAccessToken(username);
      res.status(201).send(token);
    }
  }
});








//---------------------------------------------JWT RELATED---------------------------------------------------------------


// PORT
const port = 5016
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  console.error("This isn't it: " + err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
