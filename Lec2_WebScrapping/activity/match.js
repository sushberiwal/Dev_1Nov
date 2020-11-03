// ek match ki details nikalni aati hai
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

// let link = "https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019";
function getMatch(link){
    request(link , cb);
}

function cb(error, response, html) {
    parseData(html);
}

function parseData(html){
    let ch = cheerio.load(html);
    let bothInnings = ch('.card.content-block.match-scorecard-table .Collapsible');
    // [ <div class="Collapsible"> </div>  , <div class="Collapsible"> </div> ]
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find('.header-title.label').text();
        teamName = teamName.split("Innings")[0].trim();
        
        console.log(teamName);
        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");
        // [ <tr>  </tr> ,<tr> </tr> ,<tr> </tr> ,<tr> </tr> ,<tr> </tr> ,<tr> </tr> ,<tr> </tr>];
        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = ch(allTrs[j]).find("td");
            // [ <td> </td> , <td> </td>  , <td> </td> , <td> </td>, <td> </td> , <td> </td>, <td> </td> ];
            if(allTds.length > 1){
                let batsmanName = ch(allTds[0]).find("a").text().trim();
                let runs = ch(allTds[2]).text().trim();
                let balls = ch(allTds[3]).text().trim();
                let fours = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();
                let strikeRate = ch(allTds[7]).text().trim();
                // String interpolation
                // console.log( `Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
                processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }
    }
    console.log("###############################################################");
}


function checkTeamFolder(teamName){
    // teamName = "India"
    return fs.existsSync(teamName);
}
function checkBatsman(teamName , batsmanName){
    // batsmanPath = "India/MSdhoni.json";
    let batsmanPath = teamName+"/"+batsmanName+".json";
    return fs.existsSync(batsmanPath);
}
function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = teamName+"/"+batsmanName+".json";
    let batsmanFile = fs.readFileSync(batsmanPath);
    batsmanFile = JSON.parse(batsmanFile);
    let inning = {
        Runs : runs,
        Balls : balls , 
        Fours : fours ,
        Sixes : sixes ,
        SR : strikeRate
    }
    batsmanFile.push(inning);
    batsmanFile = JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath , batsmanFile);
}
function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = teamName+"/"+batsmanName+".json";
    let batsmanFile = [];
    let inning = {
        Runs : runs,
        Balls : balls , 
        Fours : fours ,
        Sixes : sixes ,
        SR : strikeRate
    }
    batsmanFile.push(inning);
    batsmanFile = JSON.stringify(batsmanFile);
    fs.writeFileSync( batsmanPath , batsmanFile  );
}
function createTeamFolder(teamName){
    fs.mkdirSync(teamName);
}


function processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let isTeam = checkTeamFolder(teamName);
    if(isTeam){
        let isBatsman = checkBatsman(teamName , batsmanName);
        if(isBatsman){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
    }
}


module.exports = getMatch;