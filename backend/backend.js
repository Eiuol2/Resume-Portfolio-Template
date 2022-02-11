const express = require('express');
const app = express();
const port = 5016;
const cors = require('cors');

app.use(cors());

const userServices = require('./user-services');

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome Page');
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
})

app.get('/resume', async (req, res) => {
    const text = req.query.text;
    if (text != undefined) {
        const result = await userServices.findText(text);
        result = {texts: result};
        res.send(result);
    }
    else {
        res.send(uploaded_text);
    }
    
});

app.post('/resume', async (req, res) => {
    const textToAdd = req.body;
    const savedText = await userServices.addText(textToAdd);
    if(savedText){
        res.status(201).send(savedText);
    }
    else{
        res.status(500).end;
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

app.get('/resume/:id', async (req, res) => {
    const id = req.params['id'];
    let result = await userServices.findTextsById(id);
    if (result === undefined || result.length == 0) 
        res.status(404).send("ID of text not found");
    else {
        result = {texts: result};
        res.send(result);
    }
})

// function findTextsById(id) {
//     return uploaded_text['texts'].find( (text) => text['id'] == id);
// }

app.delete('/resume/:id', async (req, res) => {
    const id = req.params['id'];
    let result = userServices.findTextsByIdRemove(id);
    if (result === false) {
        res.status(404).send("Resource not found.");
    }
    else {
        result = {texts: result};
        res.status(204).send(result);
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
