
const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let newPage = await browser.newPage()
        // console.log(`==> A new page has been opened...`);
        await newPage.goto(url)
        // console.log(`==> Accessed the link: `, url);
        await newPage.waitForSelector("#main")
        await new Promise(resolve => setTimeout(resolve, 3000));
        // console.log("==> Website has finished loading...");

        const dataCategory = await newPage.$$eval(".qYI3aj > a", (els) => {
            dataCategory = els.map(el => {
                return {
                    categoryName: el.querySelector('div.ZueS1J').innerText,
                    link: el.href,

                }
            })
            return dataCategory
        })

        // console.log(dataCategory);
        // close tab
        newPage.close()
        // console.log("==> Closed Tab");
        resolve(dataCategory)
    } catch (error) {
        reject(`==> ERROR: Error occurred in scrapeCategory: ${error}\n[END]`)
    }
})

const scrapeDetail = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let newPage = await browser.newPage()
        // console.log(`==> A new page has been opened...`);
        await newPage.goto(url)
        // console.log(`==> Accessed the link: `, url);
        await newPage.waitForSelector("#main")
        await new Promise(resolve => setTimeout(resolve, 2000));
        // console.log("==> Website has finished loading...");



        // let result = await newPage.evaluate(() => {
        //     return Array.from(document.querySelectorAll('div.row.shopee-search-item-result__items > div.col-xs-2-4.shopee-search-item-result__item')).map(el => ({
        //         link: el.querySelector('a')?.href
        //     }))
        // })

        // result = result.filter(value => Object.keys(value).length !== 0)

        let result = await newPage.evaluate(() => Array.from(document.querySelectorAll('div.row.shopee-search-item-result__items > div.col-xs-2-4.shopee-search-item-result__item')).map(el => ({
            title: el.querySelector('a > div > div > div.ScPA3O > div.klCFph > div.MZeqgw > div')?.innerText || null,
            link: el.querySelector('a')?.href || null
        })).filter(value => value.link !== null));

        newPage.close()
        // console.log("==> Closed Tab");
        resolve(result)
    } catch (error) {
        reject(`==> ERROR: Error occurred in scrapeDetail: ${error}\n[END]`)
    }
})

module.exports = {
    scrapeCategory,
    scrapeDetail
}