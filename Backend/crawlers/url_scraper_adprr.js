import fetch from "node-fetch";
// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');
import puppeteer from "puppeteer"; // Headless Chrome Crawler

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

async function crawlAdpr(url,n){
    url = "https://iadpr.org/bbs/class_notice_list.php";
    if(n == 2){
        url = "https://iadpr.org/bbs/class_notice_list.php?page=2&blockCount=10&pageCount=10&schText=&schItem=";
    }
    let url_list = [];
    let title_list = [];

    async function ssr(url) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); // 1
        await page.goto(url, {waitUntil: 'networkidle0'});
        const html = await page.content(); // serialized HTML of page DOM.
        await browser.close();
        return html;
    }


    // const response = await fetch(url); // 2
    const body = await ssr(url);
    const $ = cheerio.load(body, { decodeEntities: false }) // 읽어들인 html을 조작 가능하게끔
    
    // let all = $('*');
    // let res = all.filter((index, element) => { 
    //     return $(element)
    //     // let table = $(element).attr('class') === 'listTable';
    //     // return table;
    // });
    
    // let items = $('*').get();
    let items = $('*').get();
    

    items.forEach(element => {
        /*
        // let data = JSON.stringify(element.attribs);
        let data = JSON.stringify(element.attribs);
        // fs.writeFileSync('mydata.json', data, 'utf8');
        fs.appendFileSync('mydata.json', `${data}\n`);
        */
    //    let data = JSON.stringify(element.attribs);
    //    fs.writeFileSync('pup.json', "  ", 'utf8');
    //    fs.appendFileSync('pup.json', `${data}\n`);
        if(element.attribs.href != undefined){
            if(element.attribs.href.startsWith("javascript:fnView(")){ // 24 29
                // console.log(element.attribs.href);
                const trimmedLink = element.attribs.href.slice(18,22);
                url_list.push(`https://iadpr.org/bbs/class_notice_view.php?boardNo=${trimmedLink}&pageCount=10&blockCount=10&page=1&schItem=S_TITLE&schText=`);
                const title = $(element).text().trim();
                title_list.push(title);
            }
        }
    });
    // console.log(url_list);
    // console.log(title_list);
    
    return {
        url: url_list,
        title: title_list
    }
};

// crawladpr("",1); // 테스트용

export default crawlAdpr

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.