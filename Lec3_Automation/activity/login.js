// import puppeteer
const puppeteer = require("puppeteer");
// puppeteer functions always gives us a pending promise 

let browserPendingPromise = puppeteer.launch({headless:false});
browserPendingPromise.then(function(browser){
    let allPagesPromise = browser.pages();
    return allPagesPromise;
})    
.then(function(allTabs){
    // [  tab  ];
    let page = allTabs[0];
    let gotoPromise = page.goto("https://www.google.com");
    return gotoPromise;
})
.then(function(){
    console.log("opened google homepage !!!");
})
