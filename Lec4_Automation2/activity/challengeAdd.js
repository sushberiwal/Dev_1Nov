const puppeteer = require("puppeteer");

const challenges = require("./challenges");

const id = "goxedev915@soowz.com";
const pw = "12345678";


let tab;
// open a browser instance
(async function () {
  try {
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      args: ["--start-maximized"],
    });
    let allPages = await browser.pages();
    let page = allPages[0];
    tab =page;
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("#input-1", id);
    await page.type("#input-2", pw);

    // navigation happens with this click(); , i can wait for navigation
    
    // wait for navigation and click , both runs parallely , promise.all checks if both the promises have been resolved
    await Promise.all([page.waitForNavigation({waitUntil : "networkidle0"}),page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button")  ] );
    await page.waitForSelector('a[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await page.click('a[data-analytics="NavBarProfileDropDown"]');
    await Promise.all([page.waitForNavigation({waitUntil : "networkidle0"}) , page.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
    await page.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await page.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[bothLis.length-1];
    await Promise.all([page.waitForNavigation({waitUntil : "networkidle0"}) , manageChallengeLi.click()]);
    let url = await page.url();
    await page.waitForSelector('.btn.btn-green.backbone.pull-right');
    await page.click('.btn.btn-green.backbone.pull-right');
    await createChallenge(challenges[0]);
    // one challenge created !!!
    // go to https://www.hackerrank.com/administration/challenges
    for(let i=1 ; i<challenges.length ; i++){
        await page.goto(url);
        await page.waitForSelector('.btn.btn-green.backbone.pull-right');
        await page.click('.btn.btn-green.backbone.pull-right');
        await createChallenge(challenges[i]);
    }
    console.log("all challenges created !!!");

  } catch (error) {
    console.log(error);
  }
})();

// {
//     "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
//     "Description": "Question 1",
//     "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
//     "Input Format": "Integer",
//     "Constraints": "n <= 10 ^ 9",
//     "Output Format": "String",
//     "Tags": "Basics",
//    }


// async functuion gives a pending promise
async function createChallenge(challenge){
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];
    await tab.waitForSelector('#name' , {visible:true});
    await tab.type("#name" , challengeName);
    await tab.type("#preview" , description);
    await tab.type('#problem_statement-container .CodeMirror textarea' , problemStatement);
    await tab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await tab.type('#constraints-container .CodeMirror textarea' , constraints);
    await tab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await tab.type("#tags_tag" , tags);
    await tab.keyboard.press("Enter");
    await tab.click('.save-challenge.btn.btn-green');
}
