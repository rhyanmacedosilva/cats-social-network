let server = require('./config/server');
server = new server();

server.runServer(() => {
    console.log('server listen on port 4444');
});