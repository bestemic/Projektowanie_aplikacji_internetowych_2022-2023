const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    fs.readFile('static/index.html', {encoding: 'utf-8'}, (err, data) => {
        res.write(data);
        res.end()
    });
});

app.get('/send', (req, res) => {
    res.send(`<h1>First name: ${req.query.fname}</h1><h2>Last name: ${req.query.lname}</h2><a href="/">Click here to return</a>`);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


// zadanie to co wyżej ale za pomocą posta