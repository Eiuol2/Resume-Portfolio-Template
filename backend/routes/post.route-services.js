const mongoose = require("mongoose");
const postSchema = require("../Models/Post");
const dotenv = require("dotenv");
let dbConfig = require("../database/db")
dotenv.config();

let dbConnection;

function setConnection(newConn){
  dbConnection = newConn;
  return dbConnection;
}

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(dbConfig.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

async function addPost(post){
    const postModel = getDbConnection().model("post", postSchema);
    try{
      console.log("here2")
        const addPost = new postModel(post);
        const savedPost = await addPost.save();
        return savedPost
    } catch (error){
      
        console.log(error);
        return false;
    }
}

async function getPosts (id) {
    const postModel = getDbConnection().model("post", postSchema);    
    let result;
    if(id === undefined){
        result = await postModel.find();
    }
    else{
        result = await findPostByID(id);
    }
    return result;
}

async function findPostById(id) {
    const postModel = getDbConnection().model("post", postSchema);     
    try {
      return await postModel.findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}

async function findPostByIdUpdate(id, post) {
    const postModel = getDbConnection().model("post", postSchema);     
    try {
      return await postModel.findByIdAndUpdate(id, post);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}

async function findPostByIdRemove(id) {
    const postModel = getDbConnection().model("post", postSchema);     
    try {
      return await postModel.findByIdAndRemove(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}

exports.setConnection = setConnection;
exports.getDbConnection = getDbConnection;
exports.addPost = addPost;
exports.findPostById = findPostById;
exports.getPosts = getPosts;
exports.findPostByIdRemove = findPostByIdRemove;
exports.findPostByIdUpdate = findPostByIdUpdate;