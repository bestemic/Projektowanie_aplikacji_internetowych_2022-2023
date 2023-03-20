const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    fs.readFile('static/index.html', {encoding: 'utf-8'}, (err, data) => {
        res.write(data);
        res.end()
    });
});

app.route('/send')
    .get((req, res) => {
        res.send(`<h1>First name: ${req.query.fname}</h1><h2>Last name: ${req.query.lname}</h2><a href="/">Click here to return</a>`);
    })
    .post((req, res) => {
        res.send(`<h1>Age: ${req.body.age}</h1><a href="/">Click here to return</a>`);
    });

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});