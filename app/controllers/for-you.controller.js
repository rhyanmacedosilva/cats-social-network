class ForYouController {
    constructor(expressServer) {
        this.expressServer = expressServer;
        this.model = new this.expressServer.app.models['cat.model']();
    }

    async index(res) {
        let newPosts = await this.model.getNewPosts(7);
        res.render('for-you/index', { posts: newPosts });
    }
}

module.exports = () => { return ForYouController };