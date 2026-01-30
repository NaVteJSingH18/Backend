const http = require('http');
const fs = require('fs');

const myserver = http.createServer((req, res) => {
    const log = `${new Date().toISOString()} : ${req.method} ${req.url} New req received\n`;

    const myURL = new URL(req.url, `http://${req.headers.host}`);

    fs.appendFile('./file.txt', log, (err) => {
        if (err) console.error(err);

        switch (myURL.pathname) {

            case '/':
                if (req.method === 'GET') {
                    res.end('home');
                }
                break;

            case '/about':
                const username = myURL.searchParams.get('username') || 'guest';
                res.end(`this is ${username}'s about page`);
                break;

            case '/signup':
                if (req.method === 'GET') {
                    res.end('this is signup page');
                } else if (req.method === 'POST') {
                    res.end('success');
                }
                break;

            default:
                res.end('404 page not found');
        }
    });
});

myserver.listen(4000, () => {
    console.log('server is running at http://localhost:4000');
});
