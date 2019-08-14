const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const bodyParser = require("body-parser")
const NodeCache = require("node-cache");
const myCache = new NodeCache({stdTTL: 300, checkperiod: 310});
const NytimesAPI = require('./controllers/NytimesAPI')
const helmet = require('helmet')
const compression = require('compression');
const inDevelopmentMode = process.env.Node_ENV === "development";

const mainUrl = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=hnJm70NoMjUPF9pz9erGOiOIoyALKmUz"
app.use(helmet())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (!inDevelopmentMode) app.use(compression)

app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/',
        function (req, res) {
            myCache.get("newsItems", function (err, value) {
                if (!err && value != undefined) {
                    if(inDevelopmentMode){
                        console.log({'get cached': true})
                        console.log({'value isset ': true})
                    }
                    res.render('pages/nytimes', {newsItems: value})
                } else {
                    if(inDevelopmentMode){
                        console.log({'get cached': false})
                        console.log({'value isset ': false})
                    }
                    NytimesAPI.getNews(mainUrl).then(newsResponse => {
                        let newsItems = newsResponse.data.results
                        myCache.set("newsItems", newsItems, function (err, success) {
                            if (!err && success) {
                                if(inDevelopmentMode) console.log({cached: true})
                                res.render('pages/nytimes', {newsItems: newsItems})
                            } else {
                                if(inDevelopmentMode) console.log({cached: false})
                                res.render('pages/nytimes', {newsItems: newsItems})
                            }
                        });
                    }).catch(function (error) {
                        if(inDevelopmentMode) console.log(error);
                    });
                }
            });
        })


let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
exports.closeServer = function(){
    server.close();
};
