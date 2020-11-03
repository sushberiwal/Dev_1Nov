// node application => homepage.js
//link => https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup
// html file => filesystem

let request = require("request");
let cheerio = require("cheerio");
const getAllMatches = require("./allMatches");
// link

let link ="https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup";

// hof => async task
request(link, cb);


function cb(error, response, html) {
    console.log("inside callback");
    parseData(html);
}

function parseData(html){
    let ch = cheerio.load(html);
    let link = ch(".widget-items.cta-link a").attr("href");
    let completeLink = "https://www.espncricinfo.com" + link;
    console.log(completeLink);
    getAllMatches(completeLink);
}
