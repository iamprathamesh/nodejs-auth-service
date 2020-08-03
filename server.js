const http = require('http');
const app = require('./app');
const appProperties = require('./properties');

const server = http.createServer(app);

server.listen(process.env.port || appProperties.serverPort, () => {
    console.log(`Server started on port: ${process.env.port || appProperties.serverPort}`);
});