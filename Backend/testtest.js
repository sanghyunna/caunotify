import crawlIndustSec from "./crawlers/url_scraper_indust_sec.js";
async function waitWithTimeout(asyncPromise, timeLimit){ 
    let timeoutHandle;
    const timeoutPromise = new Promise((_resolve, reject) => {
        timeoutHandle = setTimeout(
            () => _resolve(undefined),
            timeLimit);
    });
    return Promise.race([asyncPromise, timeoutPromise]).then(result => {
        clearTimeout(timeoutHandle);
        return result;
    })
}
const new_industSec = await waitWithTimeout(crawlIndustSec("url"),1*60*1000);
console.log("industSec loaded");
console.log(new_industSec);