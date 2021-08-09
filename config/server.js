class Server {
    constructor() {
        this.express = require('express');
        this.consign = require('consign');

        this.expressServer = this.express();
        this.expressServer.set('view engine', 'ejs');
        this.expressServer.set('view options', { delimiter: '?' })
        this.expressServer.set('views', './app/views');
        this.expressServer.use(this.express.static('./app/public'));

        this.port = 4444;

        this.consign()
            .include('./app/models')
            .then('./app/controllers')
            .then('./app/routes')
            .into(this.expressServer);
    }

    runServer(callback) {
        this.expressServer.listen(this.port, callback());
    }
}

module.exports = Server;