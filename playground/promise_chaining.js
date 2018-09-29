const path = require("path");
const request = require("sync-request");
const constants = require(path.resolve(__dirname, "../constants/constants"));



ping =  (params={}) => {
    let options = {
        headers: {
            'Authorization': "Bearer " + constants.twitter_constants.bearer_token
        },
        qs: params
    }
    for(let i=0; i< 10; i++){
        options.qs = {next: i};
        let res = request("GET", constants.twitter_api.search, options);
        console.log(res.getBody('utf8'));
    }
}

ping();
