const express = require('express');
const app = express();
const port = 5016;
const cors = require('cors');

app.get('/', (req, res) => {
	res.send('Welcome Page');
})



app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
})