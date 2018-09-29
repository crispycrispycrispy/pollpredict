const path = require("path");
const fs = require("fs");
const constants = require(path.resolve(__dirname, "../constants/constants"));
const mongodb = require('monk')(constants.mlab_uri);
const testing = mongodb.get('BJP');

testing.find({}).then(function (docs) {
  fs.writeFileSync(
        path.resolve(__dirname, "../assets/normaljson/BJPdata.json"),
        JSON.stringify(docs)
    );
    console.log("Insert over");
    mongodb.close();
  })