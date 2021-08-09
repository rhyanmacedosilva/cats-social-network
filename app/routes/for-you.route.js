module.exports = (expressServer) => {
    let controller = new expressServer.app.controllers['for-you.controller'](expressServer);

    expressServer.get('/', (req, res) => {
        res.send(process.env.DB_NAME);
        controller.index(res);
    });
};