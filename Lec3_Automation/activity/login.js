// import puppeteer
const puppeteer = require("puppeteer");
// puppeteer functions always gives us a pending promise

const id = "goxedev915@soowz.com";
const pw = "12345678";

let tab;
let idx;
let gCode;

let browserPendingPromise = puppeteer.launch({
  headless: false,
  defaultViewport: false,
  args: ["--start-maximized"],
});
browserPendingPromise
  .then(function (browser) {
    let allPagesPromise = browser.pages();
    return allPagesPromise;
  })
  .then(function (allTabs) {
    // [  tab  ];
    let page = allTabs[0];
    tab = page;
    let gotoPromise = page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
  })
  .then(function () {
    let idTypedPromise = tab.type("#input-1", id);
    return idTypedPromise;
  })
  .then(function () {
    let pwTypedPromise = tab.type("#input-2", pw);
    return pwTypedPromise;
  })
  .then(function () {
    let loginBtnClickedPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"
    );
    return loginBtnClickedPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item"
    );
    return waitPromise;
  })
  .then(function () {
    // pending promise
    let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allATagsPromise;
  })
  .then(function (allATags) {
    // [ <a> </a>, <a> </a>, <a> </a>, <a> </a> ];
    let allLinksPromise = [];
    for (let i = 0; i < allATags.length; i++) {
      let linkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, allATags[i]);
      allLinksPromise.push(linkPromise);
    }
    let promiseAllLinks = Promise.all(allLinksPromise);
    return promiseAllLinks; // promise<pending>
  })
  .then(function (allLinks) {
    // [ link1 , link2 , link3   ]
    //   console.log(allLinks);
    //   let completeLinks = allLinks.map( function(link){
    //       return "https://www.hackerrank.com"+link;
    //   });
    //   console.log(completeLinks);

    let completeLinks = [];
    for (let i = 0; i < allLinks.length; i++) {
      let completLink = "https://www.hackerrank.com" + allLinks[i];
      completeLinks.push(completLink);
    }
    // loop 
    let oneQuestionSolvedPromise = solveOneQuestion(completeLinks[0]);
    return oneQuestionSolvedPromise;
  })
  .then(function () {
    console.log("One Question solved !!");
  })
  .catch(function (error) {
    console.log(error);
  });

function waitAndClick(selector) {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise
      .then(function () {
        let clickPromise = tab.click(selector);
        return clickPromise;
      })
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}


function getCode(){
    return new Promise(function(resolve , reject){
        let allCodeNamesElementsPromise = tab.$$(".hackdown-content h3");
        allCodeNamesElementsPromise.then(function(allCodeNamesElements){
            // [ <h3>C++</h3>  ,<h3>PYHTON</h3>  ,<h3>JAVA</h3>];
            let allCodeNamesPromise = [];
            for(let i=0 ; i<allCodeNamesElements.length ; i++){
                let namePromise = tab.evaluate( function(elem){ return elem.textContent;  }   , allCodeNamesElements[i])
                allCodeNamesPromise.push(namePromise);
            }
            // [PP , PP ,PP];
            let promiseAllNames = Promise.all(allCodeNamesPromise);
            return promiseAllNames; // Promise<Pending>
        })
        .then(function(codeNames){
            // [ C++ , JAVA , PYTHON ];
            for(let i=0 ; i<codeNames.length ; i++){
                if(codeNames[i] == "C++"){
                    idx = i;
                    break;
                }
            }
            // Promise<pending>
            let allCodesElements = tab.$$(".hackdown-content .highlight");
            return allCodesElements;
        })
        .then(function(allCodes){
            // [  <div> </div> , <div> </div> , <div> </div>  ];
            let codeDiv = allCodes[idx];
            let codePromise = tab.evaluate(function(elem){  return elem.textContent;  } , codeDiv);
            return codePromise;
        })
        .then(function(code){
            gCode = code;
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })
}



function pasteCode(){
    return new Promise(function(resolve , reject){
        let waitAndClickPromise = waitAndClick('.custom-input-checkbox');
        waitAndClickPromise.then(function(){
            let codeTypedPromise = tab.type(".custominput" , gCode);
            return codeTypedPromise;
        })
        .then(function(){
            let controlAPromise = tab.keyboard.down("Control");
            return controlAPromise;
        })
        .then(function(){
            let controlAPromise = tab.keyboard.press("A");
            return controlAPromise;
        })
        .then(function(){
            let controlXPromise = tab.keyboard.press("X");
            return controlXPromise;
        })
        .then(function(){
            let codeBoxClickedPromise = tab.click(".monaco-scrollable-element.editor-scrollable.vs");
            return codeBoxClickedPromise;
        })
        .then(function(){
            let controlAPromise = tab.keyboard.press("A");
            return controlAPromise;
        })
        .then(function(){
            let controlVPromise = tab.keyboard.press("V");
            return controlVPromise;
        })
        .then(function(){
           let submitCodePromise = tab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
           return submitCodePromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })

    })
}

function solveOneQuestion(link){
    return new Promise(function(resolve , reject){
        let quesOpenedPromise = tab.goto(link);
        quesOpenedPromise.then(function(){
            let waitAndClickPromise = waitAndClick('a[data-attr2="Editorial"]');
            return waitAndClickPromise;
        })
        .then(function(){
            let waitPromise = tab.waitForSelector(".hackdown-content h3");
            return waitPromise;
        })
        .then(function(){
            let codePromise = getCode();
            return codePromise;
        })
        .then(function(){
            let clickedPromise = tab.click("#Problem");
            return clickedPromise;
        })
        .then(function(){
            let codePastedPromise  = pasteCode();
            return codePastedPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })
}
