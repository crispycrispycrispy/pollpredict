const path = require("path");
const constants = require(path.resolve(__dirname, "../constants/constants"));
const mongodb = require('monk')(constants.mlab_uri);
const testing = mongodb.get('testing');

testing.insert([{ _id: 1111,name: 'A', msg: 1},
{ name: 'B', msg: 2},
{ name: 'C', msg: 3},
{ name: 'D', msg: 4},
{ name: 'E', msg: 5}]).then(function (docs) {
    console.log("Insert over");
    console.log(docs);
    mongodb.close();
  });

testing.find({ name: 'A' }).then(function (docs) {
    console.log(docs);
    console.log("find over");
    mongodb.close();
  })

console.log("Over");

