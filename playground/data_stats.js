const path = require("path");
const fs = require("fs");

let tweets = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/normaljson/BJPdata.json"), 'utf8'));
console.log(tweets.length);
let ids = [];
let count = 0;
for( let i=0; i<tweets.length; i++){
    if(!ids.includes(tweets[i].tweet_id)){
        ids.push(tweets[i].tweet_id);
    }
    else{
        count++; 
        console.log(count);
    }
}