const sentiment = require("wink-sentiment");
const path = require("path");
const fs = require("fs");



parse_json_file = () => {
    let json = JSON.parse(fs.readFileSync(path.resolve(__dirname, "@BarrackObama_search.json"), 'utf8'));
    let newJson = [];
    for(let i=0; i<json.results.length; i++){
        if(!json.results[i].text.startsWith("RT ")){
            newJson.push(json.results[i].text);
        }
    }
    console.log(newJson);
}

parse_json_file();