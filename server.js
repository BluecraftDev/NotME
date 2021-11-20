const express = require('express');
const server = express();

server.all('/', (req, res) => {
    res.send('NotME is online!\n\nIn case you don\'t know what NotME is, it\'s basically a multi-purpose Discord bot which I\'ve been working on lately.')
});

function keepAlive() {
    server.listen(3000, () => console.log("Server is Ready!"));
}

module.exports = keepAlive;