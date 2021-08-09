class CatModel {
    constructor() {
        this.axios = require('axios');
        this.moment = require('moment');
        this.randomUserURL = 'https://randomuser.me/api/';
        this.randomQuoteURL = 'https://moraislucas.github.io/MeMotive/phrases.json';
        this.randomPictureURL = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg';
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

    async getNewPost() {
        let author = await this.getNewCat();
        author = author.title + ' ' + author.first + ' ' + author.last;
        let authorPictureSrc = await this.getNewPictureSrc();
        let sentence = await this.getNewSentence();
        let postedAt = this.getPostedAt();
        let post = {
            author: author,
            authorPictureSrc: authorPictureSrc,
            sentence: sentence,
            postedAt: postedAt
        };
        return post;
    }

    async getNewPosts(amount) {
        let posts = [];
        for (let i = 0; i < amount; i++) {
            posts.push(await this.getNewPost());
        }
        return posts;
    }

    getPostedAt() {
        // @todo: melhorar o calculo dos minutos, pois se a hora do post for menor 
        // que a hora atual pode pegar qualquer valor para os minutos entre 0 e 60
        let currentTimeInHours = +this.moment().format('HH') + 1;
        let currentTimeInMinutes = +this.moment().format('mm') + 1;
        let hours = Math.floor(Math.random(0, currentTimeInHours) * currentTimeInHours);
        hours = (hours < 10 ? '0' + hours : hours);
        let minutes = Math.floor(Math.random(0, currentTimeInMinutes) * currentTimeInMinutes);
        minutes = (minutes < 10 ? '0' + minutes : minutes);
        let postedAt = hours + ':' + minutes;
        return postedAt;
    }
}

module.exports = () => { return CatModel };