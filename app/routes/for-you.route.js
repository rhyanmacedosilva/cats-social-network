module.exports = (expressServer) => {
    let controller = new expressServer.app.controllers['for-you.controller'](expressServer);

    expressServer.get('/', (req, res) => {
        controller.index(res);
    });
};