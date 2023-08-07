const { log } = require("console")
const scrapers = require("./scraper")
const fs = require('fs')

const scrapeController = async (browserInstance) => {
    const url = "https://shopee.vn/all_categories"
    try {
        let browser = await browserInstance
        //
        let data = []
        let categories = await scrapers.scrapeCategory(browser, url)


        for (const category of categories) {
            console.log("Get Data of: ", category.categoryName);
            let body = {}
            let categoryData = await scrapers.scrapeDetail(browser, category.link);
            body.category = category.categoryName
            body.link = category.link
            body.detail = categoryData
            console.log("completed get data of: ", category.categoryName);
            data.push(body)
        }

        console.log(data);

        fs.writeFile('data.json', JSON.stringify(data), (err) => {
            if (err) console.log("write data fail");
            console.log("write data successfully");
        })

    } catch (error) {
        console.log(`==> ERROR: Error occurred in scrapeController: ${error}\n[END]`);
    }
}

module.exports = scrapeController