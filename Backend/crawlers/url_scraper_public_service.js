// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');
import puppeteer from "puppeteer"; // Headless Chrome Crawler

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

async function crawlPublicService(url,n){
    url = "http://public.cau.ac.kr/04_pov/pov_01a.php";
    if(n == 2){
        url = "http://public.cau.ac.kr/04_pov/pov_01a.php?idx=&p_idx=&s_kind=&s_scroll=&s_key=&p_page=2&code=b_5&p_listtype=&p_mode=list&mode=&p_pgfile=%2F04_pov%2Fpov_01a.php";
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
            if(element.attribs.href.startsWith("javascript:view('")){ // 24 29
                // console.log(element.attribs.href);
                const trimmedLink = element.attribs.href.slice(17,21);
                url_list.push(`http://public.cau.ac.kr/04_pov/pov_01a.php?idx=&p_idx=${trimmedLink}&s_kind=&s_scroll=&s_key=&p_page=1&code=b_5&p_listtype=&p_mode=view&mode=&p_pgfile=%2F04_pov%2Fpov_01a.php`);
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

// crawlPublicService({ 
//     url: "url",
// }); // 테스트용

export default crawlPublicService

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.