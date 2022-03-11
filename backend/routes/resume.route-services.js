const mongoose = require("mongoose");
const resumeSchema = require("../Models/Resume");
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

async function addResume(resume){
    const resumeModel = getDbConnection().model("resume", resumeSchema);
    try{
        const addResume = new resumeModel(resume);
        const savedResume = await addResume.save();
        return savedResume
    } catch (error){
        console.log(error);
        return false;
    }
}

async function getResumes (id) {
    const resumeModel = getDbConnection().model("resume", resumeSchema);    
    let result;
    if(id === undefined){
        result = await resumeModel.find();
    }
    else{
        result = await findResumeByID(id);
    }
    return result;
}

async function findResumeById(id) {
    const resumeModel = getDbConnection().model("resume", resumeSchema);     
    try {
      return await resumeModel.findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}

async function findResumeByIdUpdate(id, resume) {
    const resumeModel = getDbConnection().model("resume", resumeSchema);     
    try {
      return await resumeModel.findByIdAndUpdate(id, resume);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}

async function findResumeByIdRemove(id) {
    const resumeModel = getDbConnection().model("resume", resumeSchema);     
    try {
      return await resumeModel.findByIdAndRemove(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}

exports.setConnection = setConnection;
exports.getDbConnection = getDbConnection;
exports.addResume = addResume;
exports.findResumeById = findResumeById;
exports.getResumes = getResumes;
exports.findResumeByIdRemove = findResumeByIdRemove;
exports.findResumeByIdUpdate = findResumeByIdUpdate;