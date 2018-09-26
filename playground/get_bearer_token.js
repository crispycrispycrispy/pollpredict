var request = require("request");

var constants = require("../constants/constants");

get_base64_Credentials = () => {
    // var encodedUri = encodeURIComponent(constants.twitter_constants.consumer_key+":"+
    // constants.twitter_constants.consumer_secret);
    var constantsKey = constants.twitter_constants.consumer_key+":"+constants.twitter_constants.consumer_secret;
    return Buffer.from(constantsKey).toString('base64');
}

console.log(get_base64_Credentials());

// request({
//     headers: {
//         "Authorization": "Basic "+get_base64_Credentials(),
//         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//     },
//     uri: constants.twitter_api.oauth_bearer_token,
//     body: "grant_type=client_credentials",
//     method: 'POST'
//   }, function (err, res, body) {
//     console.log(body, res.statusCode);
//   });