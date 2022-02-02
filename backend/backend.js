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

const findText = (text) => { 
    return uploaded_text['texts'].filter( (uploaded_text) =>  uploaded_text['text'] === text); 
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
