import fetch from "node-fetch";
// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

async function crawlMed(url,n){
    url = "http://med.cau.ac.kr/site/program/board/basicboard/list.do?boardtypeid=3&menuid=001002001001&pagesize=20&currentpage=1";
    if(n == 2){
        url = "http://med.cau.ac.kr/site/program/board/basicboard/list.do?boardtypeid=3&menuid=001002001001&pagesize=20&currentpage=2";
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
        if (element.attribs.href != undefined && element.attribs.href.startsWith("./view.do?currentpage=1&menuid=001002001001&pagesize=20&boardtypeid=3&boardid=")){
            // console.log(element.children);
            let trimmedLink = element.attribs.href.slice(1);
            url_list.push(`http://med.cau.ac.kr/site/program/board/basicboard${trimmedLink}`);
            let titleTemp = $(element).text().trim();
            titleTemp = titleTemp.slice(2);
            titleTemp = titleTemp.trim();
            titleTemp = titleTemp.slice(7);
            const title = titleTemp.trim();
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

// crawlMed({
//     url: "https://cse.cau.ac.kr/sub05/sub0501.php",
// }); // 테스트용 

export default crawlMed

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.