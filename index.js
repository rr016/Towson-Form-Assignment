// Rafal Ryczek

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(port, function(req, res) {
    console.log('Application running in http://localhost:' + port);
});