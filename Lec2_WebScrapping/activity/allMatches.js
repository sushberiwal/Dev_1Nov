// allmatches page ki html 

let request = require("request");
let cheerio = require("cheerio");
const getMatch = require("./match");

function getAllMatches(link){
    request(link  , cb);
}

function cb(error, response, html) {
    parseData(html);
}


function parseData(html){
    let ch = cheerio.load(html);
    let allATags = ch('a[data-hover="Scorecard"]');
    
    for(let i=0 ; i<allATags.length ; i++){
        let link =  ch(allATags[i]).attr("href");
        let completeLink = "https://www.espncricinfo.com" + link;
        // console.log(completeLink); //48 links
        getMatch(completeLink);
    }
    
}




module.exports = getAllMatches;