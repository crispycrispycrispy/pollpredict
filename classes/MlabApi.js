const path = require("path");
const fs = require("fs");

const constants = require(path.resolve(__dirname, "../constants/constants"));
const objparser = require(path.resolve(__dirname, "ObjectParser"));

const monk = require('monk');
const mongodb = monk(constants.mlab_uri);

makeIntoArray = (idObj) => {
    let idArray = [];
    for( let i=0; i<idObj.length; i++){
        idArray.push(idObj[i].tweet_id);
    }
    return idArray;
}

fetchTweetsId = ( db) => {
    return new Promise((resolve, reject) => {
        db.find({},'tweet_id').then((docs) => {
            console.log(docs.length);
            resolve(makeIntoArray(docs));
        })
    });
}

insertTweets = (db, tweets) => {
    return new Promise((resolve, reject) => {
        db.insert(tweets).then(docs => {
            console.log("Insert over");
            resolve();
        });
    })
}

getTweetIdsArray = (db, bigTweetsObj, j) => {
    //get the tweetIds array from mlab
    return new Promise((resolve, reject) => {
        fetchTweetsId(db)
        .then((idArray) => {
            let relevantTweets = objparser.getTweetObject(bigTweetsObj, idArray);
            //console.log(relevantTweets);
            // console.log(idArray.length);
            // console.log(relevantTweets.length);
            // fs.writeFileSync(
            //     path.resolve(__dirname, "../assets/normaljson/@BJP4India_0_normal"+j+".json"),
            //     JSON.stringify(relevantTweets)
            // );
            return relevantTweets;
        })
        .then((relevantTweets) => {
            insertTweets(db, relevantTweets).then(() => resolve());
            //console.log(relevantTweets);
        });
    });
};

dbSync = async () => {
    let collections = constants.mongo_collections;
    for(let i=0; i<collections.length; i++){
        let db = mongodb.get(collections[i].cname);
        for( let j=0; j<10; j++){
            let bigTweetsObj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json/@"+collections[i].name+"_"+j+".json"), 'utf8'));
            await getTweetIdsArray(db, bigTweetsObj, j)
                .then(() => {
                    console.log("doEverything over for "+collections[i].cname+j+" time");
                })
                .catch(() => {
                    console.log("Something happened");
                });
        }
    }
    mongodb.close();
}

//dbSync();

getTweets = (cname) => {
    return new Promise((resolve, reject) => {
        db = mongodb.get(cname);
        db.find({},{sort:{'tweet_id':-1}, limit:200})
        .then((docs) => resolve(docs))
        .catch((docs) => reject(docs));
    })
}

fetchScoreMeta = () => {
    return new Promise((resolve, reject) => {
        db = mongodb.get("ScoreMeta");
        db.find({}).then((docs) => {
            resolve(docs);
        })
    })
}

module.exports = {
    dbSync, getTweets, fetchScoreMeta
}
