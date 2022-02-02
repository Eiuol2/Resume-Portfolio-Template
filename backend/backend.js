const express = require('express');
const app = express();
const port = 5016;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome Page');
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
})

app.get('/resume', (req, res) => {
    const text = req.query.text;
    let result = findText(text);
    result = {texts: result};
    res.send(result);
});

app.post('/resume', (req, res) => {
    const textToAdd = req.body;
    addText(textToAdd);
    res.status(200).end()
})

function addText(textToAdd) {
    uploaded_text['texts'].push(textToAdd);
}

const findText = (text) => { 
    return uploaded_text['texts']; 
}

app.get('/resume/:id', (req, res) => {
    const id = req.params['id'];
    let result = findTextsById(id);
    if (result === undefined || result.length == 0) 
        res.status(404).send("ID of text not found");
    else {
        result = {texts: result};
        res.send(result);
    }
})

function findTextsById(id) {
    return uploaded_text['texts'].find( (text) => text['id'] == id);
}

const uploaded_text = {
    texts: [
        {
            id: "xyz123",
            text: "First text",
            user: "Group D"
        }
    ]
}
