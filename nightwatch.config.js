// const seleniumServer = require("selenium-server");
// const chromedriver = require("chromedriver");
const SCREENSHOT_PATH = "./reports/screenshots/";

// console.log("INFO ABOUT STUFF - ", seleniumServer.path)

// console.log("INFO ABOUT STUFF - ", chromedriver.path)

module.exports = {
  src_folders: [
    "tests/e2e/specs" // Where you are storing your Nightwatch e2e tests
  ],
  // TODO - move to the package.json
  // urlToTest: process.env.E2E_ENV ? `http://app-name-labs-${process.env.E2E_ENV}.apps.company-xyz.rht-labs.com`: "http://localhost:8080",
  output_folder: "./reports/e2e",
  selenium: {
    start_process: false // tells nightwatch to start/stop the selenium process
  },
  test_settings: {
    jenkins: {
      selenium_host: process.env.SELENIUM_HOST || "127.0.0.1",
      selenium_port: process.env.SELENIUM_PORT || 8084,
      use_ssl: process.env.SELENIUM_SSL || false,
      end_session_on_fail: false,
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: [
            "disable-web-security",
            "ignore-certificate-errors",
            "headless",
            "no-sandbox"
          ]
        }
      }
    }
  }
};

function padLeft(count) {
  // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? "0" + count : count.toString();
}

var FILECOUNT = 0; // global screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object axwxxwbove! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we"re at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : "any");
  meta.push(a.version ? a.version : "any");
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta
    .join("~")
    .toLowerCase()
    .replace(/ /g, "");
  return SCREENSHOT_PATH + metadata + "_" + padLeft(FILECOUNT++) + "_";
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
