import fetch from "node-fetch";
// const fetch = require('node-fetch');
import cheerio from "cheerio";
// const cheerio = require('cheerio');

// package.json 에서 type을 module로 설정해 es6 module scope를 따름

async function crawlArchitecture(url,n){
    url = "http://archicau.com/wordpress/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";
    if(n == 2){
        url = "http://archicau.com/wordpress/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/?pageid=2&mod=list";
    }
    let url_list = [];
    let title_list = [];
    try {
        var response = await fetch(url);
        var body = await response.text();
        // try 블럭 밖에서도 사용 할 수 있도록 var 로 전역변수 선언
    } catch (error) {
        console.log(error);
        return {"error":"true"};
    }
    const $ = cheerio.load(body, { decodeEntities: false }) // 읽어들인 html을 조작 가능하게끔

    // let all = $('*');
    // let res = all.filter((index, element) => { 
    //     return $(element)
    //     // let table = $(element).attr('class') === 'listTable';
    //     // return table;
    // });
    
    let items = $('*').get();

    items.forEach(element => {
        if (element.attribs.href != undefined && element.attribs.href.startsWith("/wordpress/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/?uid=")){
            // console.log(element.children);
            url_list.push(`http://archicau.com/${element.attribs.href}`);
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
 
// crawlArchitecture({
//     url: "https://cse.cau.ac.kr/sub05/sub0501.php",
// }); // 테스트용 

export default crawlArchitecture

// 비동기식이기 때문에 url_list의 console.log는 crawl 함수 내에서 이루어져야함.