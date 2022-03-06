const mongoose = require("mongoose")
const TextSchema = require("./text")
const dotenv = require("dotenv")
dotenv.config()

const config = require("./db/db")

let dbConnection

function setConnection(newConn) {
  dbConnection = newConn
  return dbConnection
}

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(config.post_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  return dbConnection
}

async function findTextsById(id) {
  const textModel = getDbConnection().model("Text", TextSchema)
  try {
    return await textModel.findById(id)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

//
async function findTextsByIdRemove(id) {
  const textModel = getDbConnection().model("Text", TextSchema)
  try {
    return await textModel.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function findText(text) {
  const textModel = getDbConnection().model("Text", TextSchema)
  let result
  if (text === undefined) {
    result = await textModel.find()
  } else {
    result = await findTextByName(text)
  }
  return result
}

async function addText(text) {
  const textModel = getDbConnection().model("Text", TextSchema)
  try {
    const textToAdd = new textModel(text)
    const savedText = await textToAdd.save()
    return savedText
  } catch (error) {
    console.log(error)
    return false
  }
}

async function findTextByName(name) {
  const textModel = getDbConnection().model("Text", TextSchema)
  return await textModel.find({ text: name })
}

exports.setConnection = setConnection
exports.findTextsById = findTextsById
exports.findTextsByIdRemove = findTextsByIdRemove
exports.findText = findText
exports.addText = addText
