const sentiment = require("wink-sentiment");
const path = require("path");
const fs = require("fs");



parse_json_file = () => {
    let json = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json/@BarackObama_search.json"), 'utf8'));
    let newJson = [];
    let count = 0;
    for(let i=0; i<json.results.length; i++){
        if(json.results[i].is_quote_status){
            count++;
        }
    }
    console.log(count);
}

parse_json_file();