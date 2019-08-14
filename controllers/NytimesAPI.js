'use strict';

global.DEV_FLAG = true;

const axios = require('axios')

module.exports = class NytimesAPI{

    constructor(mainUrl){
        this.mainUrl = mainUrl
        this.title = newsItem.title
        this.abstract = newsItem.abstract
        this.published_date = newsItem.published_date
        this.type = newsItem.type
        this.section = newsItem.section
        this.media = newsItem.media[0]
        this.image = this.media["media-metadata"][1].url

        //console.log(this.image)
    }

    static getNews(mainUrl){
        return   axios.get(mainUrl)
        // return   axios.get("https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=hnJm70NoMjUPF9pz9erGOiOIoyALKmUz")
    }
}
