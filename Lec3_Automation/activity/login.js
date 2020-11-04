// import puppeteer
const puppeteer = require("puppeteer");
// puppeteer functions always gives us a pending promise

const id = "goxedev915@soowz.com";
const pw = "12345678";

let tab;

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
    let waitPromise = tab.waitForSelector("#base-card-1-link", {
      visible: true,
    });
    return waitPromise;
  })
  .then(function () {
    let ipKitClickedPromise = tab.click("#base-card-1-link");
    return ipKitClickedPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector('a[data-attr1="warmup"]', {
      visible: true,
    });
    return waitPromise;
  })
  .then(function () {
    let warmupClickedPromise = tab.click('a[data-attr1="warmup"]');
    return warmupClickedPromise;
  })
  .then(function () {
    console.log("warmup cliked !!!");
  })
  .catch(function (error) {
    console.log(error);
  });
