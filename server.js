// Rafal Ryczek

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('FORM PAGE');
});

app.post('/api/confirm', function (req, res) {
    res.send('CONFIRM PAGE');
});

app.listen(port, function (req, res) {
    console.log('Application running in http://localhost:' + port);
});