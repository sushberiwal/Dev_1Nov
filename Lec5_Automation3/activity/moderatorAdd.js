const puppeteer = require("puppeteer");

const id = "goxedev915@soowz.com";
const pw = "12345678";

let tab;
let gBrowser;
// open a browser instance
(async function () {
  try {
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      args: ["--start-maximized"],
    });
    gBrowser = browser;
    let allPages = await browser.pages();
    let page = allPages[0];
    tab = page;
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("#input-1", id);
    await page.type("#input-2", pw);
    // navigation happens with this click(); , i can wait for navigation
    // wait for navigation and click , both runs parallely , promise.all checks if both the promises have been resolved
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button"),
    ]);
    await page.waitForSelector('a[data-analytics="NavBarProfileDropDown"]', {
      visible: true,
    });
    await page.click('a[data-analytics="NavBarProfileDropDown"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click('a[data-analytics="NavBarProfileDropDownAdministration"]'),
    ]);
    await page.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {
      visible: true,
    });
    let bothLis = await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
    let manageChallengeLi = bothLis[bothLis.length - 1];
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      manageChallengeLi.click(),
    ]);
    await addModerators();
  } catch (error) {
    console.log(error);
  }
})();

// to add moderators on all the questions on all the pages
async function addModerators() {
  try {
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let allATags = await tab.$$('.backbone.block-center');
    // [ <a /> ,<a />, <a /> ,<a /> ,<a /> ,<a /> ,<a /> ,<a />  ]
    let allLinks = [];
    for(let i=0 ; i<allATags.length ; i++){
        let link = await tab.evaluate(  function(elem){  return elem.getAttribute("href");   }   ,  allATags[i]  )
        let completeLink = "https://www.hackerrank.com" + link;
        allLinks.push(completeLink);
    }
    console.log(allLinks);

    // parallely open new tabs for every questions
    for(let i=0 ; i<allLinks.length ; i++){
        let newTab = await gBrowser.newPage();
        addModeratorToAQuestion(newTab , allLinks[i]);
    }
    // find next button
    let allLis = await tab.$$(".pagination li");
    // [ <li> </li> , <li> </li> ,<li> </li> ,<li> </li> ,<li> </li> ,<li> </li>  ];
    let nextBtn = allLis[allLis.length-2];

    let isDisabled = await tab.evaluate(  function(elem){ return elem.classList.contains("disabled");  } ,nextBtn);
    // if true
    if(isDisabled){
        return;
    }
    await nextBtn.click();
    await addModerators();

  } catch (error) {
    console.log(error);
  }
}

async function handleConfirmBtn(newTab){
    try{
        await newTab.waitForSelector('#confirm-modal' , {visible:true , timeout : 5000});
        await newTab.click('#confirmBtn');
    }
    catch(error){
        console.log("Confirm modal not found !!");
        return;
    }
}

async function addModeratorToAQuestion(newTab , qLink){
    await newTab.goto(qLink);
    await handleConfirmBtn(newTab);
    await newTab.waitForSelector('li[data-tab="moderators"]');
    await Promise.all([ newTab.waitForNavigation({waitUntil:"networkidle0"}) , newTab.click('li[data-tab="moderators"]') ]);
    await newTab.waitForSelector("#moderator" , {visible:true});
    await newTab.type("#moderator" , "sushant");
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();
}

