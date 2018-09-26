// var Sentiment = require("sentiment");
// var sentiment = new Sentiment();

var Wink = require("wink-sentiment");

var text = "انا اتكلم في حالة الطقس هطول أمطار وموجات غبار وايضا الموجات وكل شي موجود اول بأول";

// console.log("1. Using sentiment", sentiment.analyze(text));

console.log("2. Using wink", Wink(text));

// Conclusive tests show that wink_sentiment is a more superior library
