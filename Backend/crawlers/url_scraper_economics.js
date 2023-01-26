import fetch from "node-fetch";
// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

const crawlEcon = async({ url }) =>{
    url = "http://econ.cau.ac.kr/news/__trashed/";
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
        if (element.attribs.href != undefined && element.attribs.href.startsWith("/news/__trashed/?uid=")){
            // console.log(element.children);
            url_list.push(`http://econ.cau.ac.kr${element.attribs.href}`);
            let title = $(element).text().trim();
            if(title.startsWith("New")) title = title.slice(4,title.length);
            while(1){
                if(title.startsWith("\t")) title = title.slice(1,title.length);
                else break;
            }
            title_list.push(title);
            // console.log(`${element.attribs}`);
        }
        // console.log(element.attribs);
    });
    //  console.log(url_list);
    //  console.log(title_list);
    
    return {
        url: url_list,
        title: title_list
    } 
};

// crawlEcon({
//     url: "http://econ.cau.ac.kr/news/__trashed/",
// }); // 테스트용

export default crawlEcon

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.