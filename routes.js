// Rafal Ryczek

'use strict'
module.exports = function (context) {
    const nodeMailer = require('nodemailer');
    const mongodb = require('mongodb');
    const db = context.dbConnection.db('db1');
    const app = context.app;
    const collection = db.collection('customers');

    app.get('/', function (req, res) {
        console.log('REST API is working...');
    });

    app.post('/api/confirm', function (req, res) {
        // Send a confirm email using Nodemailer /*
        //        sendEmail(req).catch(console.error);          <------------------------------------------------------------

        // Send data to database then display confirm page
        req.body['createdOn'] = new Date();
        req.body['completed'] = false
        collection.insertOne(req.body)
            .then(doc => res.status(200).redirect('/confirm'))
            .catch(err => res.status(500).send(err));
    });

    async function sendEmail(req) {
        let transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'test27484',
                pass: 'Pineapple123'
            }
        });

        let info = await transporter.sendMail({
            from: '"Rafal Ryczek" <nodemailertowson@gmail.com>',
            to: req.body.email,
            subject: "Confirmation Email",
            text: "Thank you for your interest in our workshops! A member of our team will reach out soon!",
            html: '<p>Thank you for your interest in our workshops! A member of our team will reach out soon!</p>'
        });

        console.log("Message sent: %s", info.messageId);
    }

    app.get('/api/customers', function (req, res) {
        let query = req.query || {};
        collection.find(query).toArray()
            .then(results => res.status(200).send(results))
            .catch(err => res.status(500).send(err));
    });

    app.post('/api/update', function (req, res) {
        //res.json(req.body.btn);
        collection.deleteOne({ _id: new mongodb.ObjectID(req.body.btn) })
            .then(doc => res.status(200).redirect('/admin'))
            .catch(err => res.status(500).send(err));
    });

    app.get('*', (req, res) => {
        res.sendFile(context.path.join(__dirname, 'client/build/index.html'));
    });

};