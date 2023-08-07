const puppeteer = require("puppeteer")

const startBrowser = async () => {
    let browser
    try {
        browser = await puppeteer.launch({
            // headless: false, // true: hide ui
            headless: "new",
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        })
    } catch (error) {
        console.log(`==> ERROR: Unable to create browser: ${error}\n[END]`);
    }
    return browser
}

module.exports = startBrowser