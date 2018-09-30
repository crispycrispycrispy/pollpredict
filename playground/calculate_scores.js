const path = require("path");
const fs = require("fs");
const constants = require(path.resolve(__dirname, "../constants/constants"));
const mongodb = require('monk')(constants.mlab_uri);


fetchTweets = (cname) => {
    return new Promise((resolve, reject) => {
        db = mongodb.get(cname);
        db.find({}).then((docs) => {
            resolve(docs);
        })
    })
}

calculateScore = (tweets) => {
    let aggPScore = 0;
    let pVoters = 0;
    let aggNScore = 0;
    let nVoters = 0;
    for(let i=0; i<tweets.length; i++){
        if(tweets[i].sentiment.valence_score == 0){}
        else if(tweets[i].sentiment.valence_score < 0){
            aggNScore += tweets[i].sentiment.valence_score;
            nVoters++;
        }
        else {
            aggPScore += tweets[i].sentiment.valence_score;
            pVoters++;
        }
    }
    return {
        aggPScore,
        pVoters,
        aggNScore,
        nVoters,
        total: tweets.length,
        neutral: tweets.length - (nVoters + pVoters)
    }
}

insertScore = (scoreMeta) => {
    db = mongodb.get("ScoreMeta");
    db.insert(scoreMeta).then((docs) => {
        console.log("Inserted", scoreMeta);
    });
}


for(let i=0; i<constants.mongo_collections.length; i++){
    let cname = constants.mongo_collections[i].cname;
    let scoreMeta;
    fetchTweets(cname)
    .then((tweets) => {
        scoreMeta = Object.assign({cname},calculateScore(tweets));
        insertScore(scoreMeta);
    });
}