const mongoose = require('mongoose');
const TextSchema = require("./text");
const dotenv = require('dotenv');
dotenv.config();

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

async function findTextsById(id){
    const textModel = getDbConnection().model("Text", TextSchema);    
    try{
        return await textModel.findById(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

//
async function findTextsByIdRemove(id) {
    const textModel = getDbConnection().model("Text", TextSchema);    
    try{
        return await textModel.findByIdAndDelete(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

async function findText (text) {
    const textModel = getDbConnection().model("Text", TextSchema);    
    let result;
    if(text === undefined){
        result = await textModel.find();
    }
    else{
        result = await findTextByName(text);
    }
    return result;
}

async function addText(text){
    const textModel = getDbConnection().model("Text", TextSchema);
    try{
        const textToAdd = new textModel(text);
        const savedText = await textToAdd.save()
        return savedText;
    }catch(error) {
        console.log(error);
        return false;
    }   
}

async function findTextByName(name){
    const textModel = getDbConnection().model("Text", TextSchema);
    return await textModel.find({'text': name});
}

exports.findTextsById = findTextsById;
exports.findTextsByIdRemove = findTextsByIdRemove;
exports.findText = findText;
exports.addText = addText;