class CatModel {
    constructor(expressServer) {
        this.axios = require('axios');
        this.moment = require('moment');
        this.db = new expressServer.app.models['db.model']();
        this.randomUserURL = 'https://randomuser.me/api/';
        this.randomQuoteURL = 'https://moraislucas.github.io/MeMotive/phrases.json';
        this.randomPictureURL = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg';
        this.posts = [];
    }

    async getNewCat() {
        let cat = { title: '', first: '', last: '' };
        try {
            let response = await this.axios.get(this.randomUserURL);
            response = response.data;
            cat = response.results[0].name;
            return cat;
        } catch (error) {
            console.log('random user get error: ' + error);
        }
    }

    async getNewSentence() {
        let sentence = '';
        try {
            let response = await this.axios.get(this.randomQuoteURL);
            response = response.data;
            let totalSentences = response.length;
            let randomIndex = Math.floor(
                Math.random(0, totalSentences) * totalSentences);
            sentence = response[randomIndex].quote;
            return sentence;
        } catch (error) {
            console.log('random sentence get error: ' + error);
        }
    }

    async getNewPictureSrc() {
        let pictureSrc = '';
        try {
            let response = await this.axios.get(this.randomPictureURL);
            response = response.data;
            pictureSrc = response[0].url;
            return pictureSrc;
        } catch (error) {
            console.log('random picture get error: ' + error);
        }
    }

    async getNewPost(existentAuthor) {
        let author = '';
        let authorPictureSrc = '';
        let authorStatus = (existentAuthor == null);
        if (authorStatus == true) {
            author = await this.getNewCat();
            author = author.title + ' ' + author.first + ' ' + author.last;
            authorPictureSrc = await this.getNewPictureSrc();
        } else {
            author = existentAuthor.name;
            authorPictureSrc = existentAuthor.profile_picture_path;
        }
        let sentence = await this.getNewSentence();
        let postedAt = this.getPostedAt();
        let lifeTime = this.getLifeTime(postedAt);
        let post = {
            author: author,
            authorStatus: (authorStatus == true ? 'NEW MEMBER' : ''),
            authorPictureSrc: authorPictureSrc,
            sentence: sentence,
            postedAt: postedAt,
            lifeTime: lifeTime
        };
        return post;
    }

    async getNewPostFromExistentUser(callback, amount) {
        this.db.select(
            'id, name, profile_picture_path',
            'authors',
            null,
            null,
            async (error, result) => {
                if (error != null) {
                    console.log(error);
                } else {
                    let existentUsers = result;
                    let amountExistentUsers = existentUsers.length;

                    for (let i = 0; i < amount; i++) {
                        let randomUserIndex = Math.floor(
                            Math.random(0, amountExistentUsers) * amountExistentUsers);
                        let newPost = await this.getNewPost(existentUsers[randomUserIndex]);
                        this.posts.push(newPost);
                    }
                    callback();
                }
            });
    }

    async getNewPosts(callback) {
        this.posts = [];
        let amountNewPostsFromNewUsers = +process.env.NEW_POSTS_FROM_NEW_USERS_AMOUNT;
        let amountNewPostsFromExistentUsers = +process.env.NEW_POSTS_FROM_EXISTENT_USERS_AMOUNT;
        for (let i = 0; i < amountNewPostsFromNewUsers; i++) {
            let newPost = await this.getNewPost(null)
            this.posts.push(newPost);
            this.savePostDataDB(newPost);
        }
        this.getNewPostFromExistentUser(callback, amountNewPostsFromExistentUsers);
    }

    getPostedAt() {
        let currentTimeHours = +this.moment().format('HH') + 1;
        let currentTimeMinutes = +this.moment().format('mm') + 1;
        let hours = Math.floor(Math.random(0, currentTimeHours) * currentTimeHours);
        let postTimeMaxMinutes = currentTimeMinutes;
        if (hours < (currentTimeHours - 1)) {
            postTimeMaxMinutes = 60;
        }
        hours = (hours < 10 ? '0' + hours : hours);
        let minutes = Math.floor(Math.random(0, postTimeMaxMinutes) * postTimeMaxMinutes);
        minutes = (minutes < 10 ? '0' + minutes : minutes);
        let postedAt = hours + ':' + minutes;
        return postedAt;
    }

    getLifeTime(postedAt) {
        postedAt = this.moment(postedAt, 'HH:mm');
        let currentTime = this.moment();
        let duration = this.moment.duration(currentTime.diff(postedAt));
        let durationAsMinutes = parseInt(duration.asMinutes()) % 60;
        let durationAsHours = parseInt(duration.asHours());
        let durationAsText =
            (durationAsHours != 0 ? durationAsHours + 'h ' : '') +
            durationAsMinutes + 'm';
        return durationAsText;
    }

    savePostDataDB(post) {
        this.saveAuthorDB(post);
    }

    saveAuthorDB(post) {
        let dbFormattedJSON = {
            name: post.author,
            profile_picture_path: post.authorPictureSrc
        };

        this.db.insert(
            'authors',
            dbFormattedJSON,
            (error, result) => {
                if (error != null) {
                    console.log(error);
                } else {
                    let newAuthorId = result.insertId;
                    this.savePostDB(post, newAuthorId);
                }
            });
    }

    savePostDB(post, authorId) {
        let postedAtTimestamp =
            this.moment().format('YYYY-MM-DD') + ' ' +
            post.postedAt + ':' +
            Math.floor(Math.random(0, 60) * 60);
        let dbFormattedJSON = {
            author_id: authorId,
            sentence: post.sentence,
            posted_at: postedAtTimestamp
        };
        this.db.insert(
            'posts',
            dbFormattedJSON,
            (error, result) => {
                if (error != null) {
                    console.log(error);
                }
            });
    }
}

module.exports = () => { return CatModel };