// allmatches page ki html 

let request = require("request");
let cheerio = require("cheerio");

function getAllMatches(link){
    request(link  , cb);
}

function cb(error, response, html) {
    console.log(html);
}



module.exports = getAllMatches;