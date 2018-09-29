const requestSync = require("sync-request");
const path = require("path");
const fs = require("fs");

const constants = require(path.resolve(__dirname, "../constants/constants"));
const objparser = require(path.resolve(__dirname, "ObjectParser"));

const mongodb = require('monk')(constants.mlab_uri);

searchMentions = (params={}) => {
    let options = {
        url: constants.twitter_api.search,
        headers: {
            'Authorization': "Bearer " + constants.twitter_constants.bearer_token
        },
        qs: params
    }
    request(options, (error, response, body) => {
        if(!error && response.statusCode == 200) console.log("Body ", body);
        else console.log("Error ", error);
    });
}

getTweets = () => {
    let bigTweetsObj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json/@BarackObama_search.json"), 'utf8'));
    let releventTweets = objparser.getTweetObject(bigTweetsObj);
    insertIntoMLab(releventTweets);
}

insertIntoMLab = (tweets) => {
    const testing = mongodb.get('testing');
    testing.insert(tweets)
    .then((docs) => {
        console.log("done inserting "+docs.length);
        mongodb.close();
    })
    .catch((err) => {
        console.log("error " + err);
    });
}

getBase64Credentials = () => {
    // var encodedUri = encodeURIComponent(constants.twitter_constants.consumer_key+":"+
    // constants.twitter_constants.consumer_secret);
    var constantsKey = constants.twitter_constants.consumer_key+":"+constants.twitter_constants.consumer_secret;
    return Buffer.from(constantsKey).toString('base64');
}

getBearerToken = () => {
    request({
        headers: {
            "Authorization": "Basic "+getBase64Credentials(),
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        uri: constants.twitter_api.oauth_bearer_token,
        body: "grant_type=client_credentials",
        method: 'POST'
        }, function (err, res, body) {
        console.log(body, res.statusCode);
    });
}

searchMentionsSync = (params) => {
    let options = {
        headers: {
            'Authorization': "Bearer " + constants.twitter_constants.bearer_token
        },
        qs: params
    }
    let res = requestSync("GET", constants.twitter_api.search, options);
    return res.getBody('utf8');
}

getTweetsSync = () => {
    let handles = constants.twitter_handles;
    for(let i=0; i<handles.length; i++){
        let next = "";
        let params = {
            query: "@"+handles[i]
        }
        for(let j=0; j<10; j++){
            if(next !== "") params.next = next;
            let response = JSON.parse(searchMentionsSync(params));
            next = response.next;
            fs.writeFileSync(
                path.resolve(__dirname, "../assets/json/@"+handles[i]+"_"+j+".json"),
                JSON.stringify(response)
            );
            console.log("query "+j, params, next);
        }
        console.log("--------------");
        console.log(handles[i]+" done");
        console.log("--------------");
    }
}

module.exports = {
}