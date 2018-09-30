const express = require("express");

const app = express();
const path = require("path");

const mlabapi = require(path.resolve(__dirname, "classes/MlabApi"));

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/gettweets', (req, res) => {
    //res.status(200).send([{msg:"simple message", next: req.query.name}]);
    mlabapi.getTweets(req.query.name)
    .then((tweets) => {
        res.status(200).send(tweets);
    });
})

app.get('/scoremeta', (req, res) => {
    mlabapi.fetchScoreMeta()
    .then((scoreMeta) => {
        res.status(200).send(scoreMeta);
    })
})

app.get('/test', (req, res) => {
    console.log(req.query);
    setTimeout(()=>{
        if(!req.query.hasOwnProperty("next")){
            res.status(200).send([{msg:"simple message", next: 0}]);
        }
        else res.status(200).send([{msg:"next message", next: Number(req.query.next)+1 }]);
        console.log(req.originalUrl);
        console.log("-------------------");
    }, 2000);
})

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});