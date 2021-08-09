class ForYouController {
    constructor(expressServer) {
        this.expressServer = expressServer;
        this.model = new this.expressServer.app.models['cat.model'](expressServer);
    }

    async index(res) {
        this.model.getNewPosts(() => {
            res.render('for-you/index', { posts: this.model.posts });
        });
    }
}

module.exports = () => { return ForYouController };