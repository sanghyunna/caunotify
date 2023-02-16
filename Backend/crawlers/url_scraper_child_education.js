import fetch from "node-fetch";
// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

async function crawlEarlyChildhoodEd(url,n){
    url = "http://cauece.cau.ac.kr/bbs/board.php?bo_table=s0406";
    if(n == 2){
        url = "http://cauece.cau.ac.kr/bbs/board.php?bo_table=s0406&page=2";
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
        if (element.attribs.href != undefined && element.attribs.href.startsWith("http://cauece.cau.ac.kr/bbs/board.php?bo_table=s0406&wr_id=")){
            // console.log(element.children);
            url_list.push(`http://cauece.cau.ac.kr/bbs/board.php?bo_table=s0406&wr_id=${element.attribs.href}`);
            const title = $(element).text().trim();
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

 //crawlEarlyChildhoodEd({   
//url: "http://cauece.cau.ac.kr/bbs/board.php?bo_table=s0406",
//}); // 테스트용

export default crawlEarlyChildhoodEd

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.