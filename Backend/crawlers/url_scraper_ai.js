import fetch from "node-fetch";
// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

async function crawlAi(url,n){
    url = "https://ai.cau.ac.kr/sub07/sub0701.php?category=1&view=list";
    if(n == 2){
        url = "https://ai.cau.ac.kr/sub07/sub0701.php?category=1&view=list&currentPage=2&keyword=&search=title";
    }
    let url_list = [];
    let title_list = [];

    try {
        var response = await fetch(url);
        var body = await response.text();
    } catch (error) {
        console.log(error);
        return {"error":"true"};
    }



    // const response = await fetch(url);
    // const body = await response.text();
    const $ = cheerio.load(body, { decodeEntities: false }) // 읽어들인 html을 조작 가능하게끔

    // let all = $('*');
    // let res = all.filter((index, element) => { 
    //     return $(element)
    //     // let table = $(element).attr('class') === 'listTable';
    //     // return table;
    // });
    
    let items = $('*').get();

    items.forEach(element => {
        if (element.attribs.href != undefined && element.attribs.href.startsWith("?category=1&view=detail&no=")){
            // console.log(element.children);
            url_list.push(`https://ai.cau.ac.kr/sub07/sub0701.php${element.attribs.href}`);
            const title = $(element).text().trim();
            title_list.push(title);
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

// crawlAi("",2); // 테스트용

export default crawlAi

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.