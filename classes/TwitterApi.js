const request = require("request");
const path = require("path");
const fs = require("fs");

const constants = require(path.resolve(__dirname, "../constants/constants"));
const objparser = require(path.resolve(__dirname, "ObjectParser"));



getRequest = (uri, params={}) => {
    let options = {
        url: uri,
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
    // let uri = constants.twitter_api.search;
    // let params = {
    //     "query": "@BarackObama"
    // }
    // getRequest(uri, params);
    let bigTweetsObj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json/@BarackObama_search.json"), 'utf8'));
    let releventTweets = objparser.getTweetObject(bigTweetsObj);
    //console.log("Relevent tweets: ", releventTweets);
}

getTweets();








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

module.exports = {

}