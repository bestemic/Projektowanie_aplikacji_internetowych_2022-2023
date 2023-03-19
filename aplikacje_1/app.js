const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.readFile('static/index.html', (err, data) => {
            res.write(data);
            res.end()
        });
    }
    if (req.url === '/help') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.readFile('static/help.html', (err, data) => {
            res.write(data);
            res.end()
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});