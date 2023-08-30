import fetch from "node-fetch";
// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

async function crawlSoftware(url,n){
    url = "https://cse.cau.ac.kr/sub05/sub0501.php";
    if(n == 2){
        url = "https://cse.cau.ac.kr/sub05/sub0501.php?offset=2&nmode=list&code=oktomato_bbs05&search=&keyword=&temp1=";
    }
    let url_list = [];
    let title_list = [];
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body, { decodeEntities: false }) // 읽어들인 html을 조작 가능하게끔

    // let all = $('*');
    // let res = all.filter((index, element) => { 
    //     return $(element)
    //     // let table = $(element).attr('class') === 'listTable';
    //     // return table;
    // });
    
    let items = $('*').get();

    items.forEach(element => {
        if (element.attribs.href != undefined && element.attribs.href.startsWith("?nmode=view&code=oktomato")){
            // console.log(element.children);
            url_list.push(`https://cse.cau.ac.kr/sub05/sub0501.php${element.attribs.href}`);
            const title = $(element).text().trim();
            // if title ends with "NEW", remove it
            if(title.endsWith("NEW")){
                title_list.push(title.slice(0,-3));
            }
            else{
                title_list.push(title);
            }
            // console.log(`${element.attribs}`);
        }
        // console.log(element.attribs);
    });
    // console.log(url_list);
    // console.log(title_list);
    
    return {
        url: url_list,
        title: title_list
    }
};

// crawlSoftware({
//     url: "https://cse.cau.ac.kr/sub05/sub0501.php",
// })

export default crawlSoftware

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.