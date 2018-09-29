const sentiment = require("wink-sentiment");
const fs = require('fs');
const path = require("path");

getTweetObject = (tweetsObj, tweetIds) => {
    let relevantTweets = [];
    for(let i=0; i<tweetsObj.results.length; i++){
        let tweet = tweetsObj.results[i];
        if(tweet.text.startsWith("RT ")){
            tweet = tweet.retweeted_status;
        }
        else if(tweet.is_quote_status){
            tweet = tweet.quoted_status;
        }
        if(!tweetIds.includes(tweet.id_str)){
            tweetIds.push(tweet.id_str);
            let normalTweet = normalizeObject(tweet);
            relevantTweets.push(normalTweet);
        }
    }
    return relevantTweets;
}

normalizeObject = (tweet) => {
    let normalObj = getObjStructure();
    normalObj.twitter_handle = tweet.user.screen_name;
    if(tweet.truncated) normalObj.text = tweet.extended_tweet.full_text;
    else normalObj.text = tweet.text;
    normalObj.tweet_id = tweet.id_str;
    normalObj.tweet_url = "https://twitter.com/"+tweet.user.screen_name+"/status/"+tweet.id_str;
    normalObj.sentiment = calculateSentimentScore(normalObj.text);
    return normalObj;
}

calculateSentimentScore = (text) => {
    let sentObj = sentiment(text);
    let response = {
        valence_score: sentObj.normalizedScore,
        label: 
            Number(sentObj.normalizedScore) > 0 ?     "+ive" :
            Number(sentObj.normalizedScore) == 0 ?    "neutral" : 
                                            "-ive",
        meta: []
    }
    sentObj.tokenizedPhrase.forEach(word => {
        if(word.hasOwnProperty("score")) response.meta.push(word);
    });
    return response;
}

getObjStructure = () => {
    return {
        twitter_handle: "",
        text: "",
        tweet_id: "",
        tweet_url: "",
        sentiment: {
            valence_score: "",
            label: "",
            meta: {}
        }
    };
}

module.exports = {
    getTweetObject
}