import fs from "fs";
import { compareTwoArrays } from "./compare.js"
import { mailHandler } from "./mailHandler.js";
import path from 'path';
import { fileURLToPath } from 'url';
import KRname from "./name_en2kr.js"

import crawlIndustSec from "./crawlers/url_scraper_indust_sec.js";
import crawlSoftware from "./crawlers/url_scraper_software.js";
import crawlCAUnotice from "./crawlers/url_scraper_cauNotice.js";
import crawlIntegEngineering from "./crawlers/url_scraper_integ_engineering.js";
import crawlKorean from "./crawlers/url_scraper_korean.js";
import crawlMechEngineering from "./crawlers/url_scraper_mech_engineering.js";
import crawlPsychology from "./crawlers/url_scraper_psychology.js";
import crawlBusiness from "./crawlers/url_scraper_business.js";
import crawlElecEngineering from "./crawlers/url_scraper_elec_engineering.js";
import crawlEnglish from "./crawlers/url_scraper_English.js";
import crawlEnerEngineering from "./crawlers/url_scraper_ener_engineering.js";
import crawlUrbanPlanRealEstate from "./crawlers/url_scraper_urban.js";
import crawlNursing from "./crawlers/url_scraper_nursing.js";
import crawlPolitics from "./crawlers/url_scraper_poli_science.js";
import crawlPhysicalEd from "./crawlers/url_scraper_phys_education.js";
import crawlEducation from "./crawlers/url_scraper_education.js";
import crawlEarlyChildhoodEd from "./crawlers/url_scraper_child_education.js";
import crawlEnglishEd from "./crawlers/url_scraper_eng_education.js";
import crawlChem from "./crawlers/url_scraper_chemistry.js";
import crawlLifeScience from "./crawlers/url_scraper_life_science.js";
import crawlJapanese from "./crawlers/url_scraper_japanese.js";
import crawlChinese from "./crawlers/url_scraper_chinese.js";
import crawlMath from "./crawlers/url_scraper_math.js";
import crawlAi from "./crawlers/url_scraper_ai.js";
import crawlChemEngineering from "./crawlers/url_scraper_chem_engineering.js";
import crawlLogistics from "./crawlers/url_scraper_logistics.js";
import crawlEcon from "./crawlers/url_scraper_economics.js";
import crawlPhysics from "./crawlers/url_scraper_physics.js";
import crawlLibInfoScience from "./crawlers/url_scraper_libr_info_science.js";
import crawlMediaComm from "./crawlers/url_scraper_media_communication.js";
import crawlSociology from "./crawlers/url_scraper_sociology.js";
import crawlSocialWelfare from "./crawlers/url_scraper_soci_welfare.js";
import crawlRussian from "./crawlers/url_scraper_russian.js"
import crawlFrench from "./crawlers/url_scraper_french.js";
import crawlGerman from "./crawlers/url_scraper_german.js";
import crawlPhilosophy from "./crawlers/url_scraper_philosophy.js";
import crawlHistory from "./crawlers/url_scraper_history.js";
import crawlPublicService from "./crawlers/url_scraper_public_service.js";
import crawlCivilEnvPlanEng from "./crawlers/url_scraper_civil.js";
import crawlUrbanEngineering from "./crawlers/url_scraper_urban.js";
import crawlArchitecture from "./crawlers/url_scraper_architecture.js";
import crawlAppliedStat from "./crawlers/url_scraper_applied_stat.js";
import crawlMed from "./crawlers/url_scraper_med.js";
import crawlPharm from "./crawlers/url_scraper_pharm.js";
import crawladpr from "./crawlers/url_scraper_adpr.js";

let ON = "false";
// ON = "true"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function waitWithTimeout(asyncPromise, timeLimit){ 
    let timeoutHandle;
    const timeoutPromise = new Promise((_resolve, reject) => {
        timeoutHandle = setTimeout(
            () => _resolve({"error":"true"}),
            timeLimit);
    });
    return Promise.race([asyncPromise, timeoutPromise]).then(result => {
        clearTimeout(timeoutHandle);
        return result;
    })
}

// refresh 함수에서는
// 크롤러 실행 -> 기존 목록과 대조 -> 변화 있으면 sendMail() 후 원래 목록 대체, 없으면 행동하지 않음 -> 다음 크롤러 실행.
export async function refresh(nextIdNum, silentMode){

    console.log("*** Refreshing Started ***")

    // *********************************
    // *** 1. 크롤러로부터 데이터 로드 ***
    // *********************************
    // 하나의 오류 발생시 전체 코드 충돌 방지를 위해 타임아웃 제한
    

    // if문은 0만 아니면 실행한다. 즉, 0 은 false고, 0을 제외한 모든 값은 true이다.
    // 즉 silentMode의 값이 1이라면,
    // if(!silentMode) console.log 는 silentMode일 때만 실행된다


    console.time("** fully loaded in "); // 로딩시간 기록
    // const naw_integEngineering = await waitWithTimeout(crawlIntegEngineering("url"),1*60*1000);
    const new_industSec = await waitWithTimeout(crawlIndustSec("url"),1*60*1000);               if(!silentMode) console.log("industSec loaded");
    const new_software = await waitWithTimeout(crawlSoftware("url"),1*60*1000);                 if(!silentMode) console.log("software loaded");
    const new_CAUnotice = await waitWithTimeout(crawlCAUnotice("url"),1*60*1000);               if(!silentMode) console.log("CAUnotice loaded");
    const new_integEngineering = await waitWithTimeout(crawlIntegEngineering("url"),1*60*1000); if(!silentMode) console.log("integEngineering loaded");
    const new_korean = await waitWithTimeout(crawlKorean("url"),1*60*1000);                     if(!silentMode) console.log("korean loaded");
    const new_mechEngineering = await waitWithTimeout(crawlMechEngineering("url"),1*60*1000);   if(!silentMode) console.log("mechEngineering loaded");
    const new_psychology = await waitWithTimeout(crawlPsychology("url"),1*60*1000);             if(!silentMode) console.log("psychology loaded");
    const new_business = await waitWithTimeout(crawlBusiness("url"),1*60*1000);                 if(!silentMode) console.log("business loaded");
    const new_elecEngineering = await waitWithTimeout(crawlElecEngineering("url"),1*60*1000);   if(!silentMode) console.log("elecEngineering loaded");
    const new_english = await waitWithTimeout(crawlEnglish("url"),1*60*1000);                   if(!silentMode) console.log("english loaded");
    const new_enerEngineering = await waitWithTimeout(crawlEnerEngineering("url"),1*60*1000);   if(!silentMode) console.log("enerEngineering loaded");
    const new_urbanPlanRealEstate = await waitWithTimeout(crawlUrbanPlanRealEstate("url"),1*60*1000); if(!silentMode) console.log("urbanPlanRealEstate loaded");
    const new_nursing = await waitWithTimeout(crawlNursing("url"),1*60*1000);                   if(!silentMode) console.log("nursing loaded");
    const new_politics = await waitWithTimeout(crawlPolitics("url"),1*60*1000);                 if(!silentMode) console.log("politics loaded");
    const new_physicalEd = await waitWithTimeout(crawlPhysicalEd("url"),1*60*1000);             if(!silentMode) console.log("physicalEd loaded");
    const new_education = await waitWithTimeout(crawlEducation("url"),1*60*1000);               if(!silentMode) console.log("education loaded");
    const new_earlyChildhoodEd = await waitWithTimeout(crawlEarlyChildhoodEd("url"),1*60*1000); if(!silentMode) console.log("earlyChildhoodEd loaded");
    const new_englishEd = await waitWithTimeout(crawlEnglishEd("url"),1*60*1000);               if(!silentMode) console.log("englishEd loaded");
    const new_chem = await waitWithTimeout(crawlChem("url"),1*60*1000);                         if(!silentMode) console.log("chem loaded");
    const new_lifeScience = await waitWithTimeout(crawlLifeScience("url"),1*60*1000);           if(!silentMode) console.log("lifeScience loaded");
    const new_japanese = await waitWithTimeout(crawlJapanese("url"),1*60*1000);                 if(!silentMode) console.log("japanese loaded");
    const new_chinese = await waitWithTimeout(crawlChinese("url"),1*60*1000);                   if(!silentMode) console.log("chinese loaded");
    const new_math = await waitWithTimeout(crawlMath("url"),1*60*1000);                         if(!silentMode) console.log("math loaded");
    const new_ai = await waitWithTimeout(crawlAi("url"),1*60*1000);                             if(!silentMode) console.log("ai loaded");
    const new_chemEngineering = await waitWithTimeout(crawlChemEngineering("url"),1*60*1000);   if(!silentMode) console.log("chemEngineering loaded");
    const new_logistics = await waitWithTimeout(crawlLogistics("url"),1*60*1000);               if(!silentMode) console.log("logistics loaded");
    const new_econ = await waitWithTimeout(crawlEcon("url"),1*60*1000);                         if(!silentMode) console.log("econ loaded");
    const new_physics = await waitWithTimeout(crawlPhysics("url"),1*60*1000);                   if(!silentMode) console.log("physics loaded");
    const new_libInfoScience = await waitWithTimeout(crawlLibInfoScience("url"),1*60*1000);     if(!silentMode) console.log("libInfoScience loaded");
    const new_mediaComm = await waitWithTimeout(crawlMediaComm("url"),1*60*1000);               if(!silentMode) console.log("mediaComm loaded");
    const new_sociology = await waitWithTimeout(crawlSociology("url"),1*60*1000);               if(!silentMode) console.log("sociology loaded");
    const new_socialWelfare = await waitWithTimeout(crawlSocialWelfare("url"),1*60*1000);       if(!silentMode) console.log("socialWelfare loaded");
    const new_russian = await waitWithTimeout(crawlRussian("url"),1*60*1000);                   if(!silentMode) console.log("russian loaded");
    const new_french = await waitWithTimeout(crawlFrench("url"),1*60*1000);                     if(!silentMode) console.log("french loaded");
    const new_german = await waitWithTimeout(crawlGerman("url"),1*60*1000);                     if(!silentMode) console.log("german loaded");
    const new_philosophy = await waitWithTimeout(crawlPhilosophy("url"),1*60*1000);             if(!silentMode) console.log("philosophy loaded");
    const new_history = await waitWithTimeout(crawlHistory("url"),1*60*1000);                   if(!silentMode) console.log("history loaded");
    const new_publicService = await waitWithTimeout(crawlPublicService("url"),1*60*1000);       if(!silentMode) console.log("publicService loaded");
    const new_civilEnvPlanEng = await waitWithTimeout(crawlCivilEnvPlanEng("url"),1*60*1000);   if(!silentMode) console.log("civilEnvPlanEng loaded");
    const new_urbanEngineering = await waitWithTimeout(crawlUrbanEngineering("url"),1*60*1000); if(!silentMode) console.log("urbanEngineering loaded");
    const new_architecture = await waitWithTimeout(crawlArchitecture("url"),1*60*1000);         if(!silentMode) console.log("architecture loaded");
    const new_appliedStat = await waitWithTimeout(crawlAppliedStat("url"),1*60*1000);           if(!silentMode) console.log("appliedStat loaded");
    const new_med = await waitWithTimeout(crawlMed("url"),1*60*1000);                           if(!silentMode) console.log("med loaded");
    const new_pharm = await waitWithTimeout(crawlPharm("url"),1*60*1000);                       if(!silentMode) console.log("pharm loaded");
    const new_adpr = await waitWithTimeout(crawladpr("url"),1*60*1000);                         if(!silentMode) console.log("adpr loaded");

 
    console.timeEnd("** fully loaded in ");
    
    // *****************************************************************
    // *** 2. 기존 목록을 읽어 현재 데이터와 비교한 후, 변경 개수를 저장 ***
    // *****************************************************************
    let storeDifferences = [];
    function readFileAndCompareWithOriginal(majorName,dataObject){
        if(dataObject.error == "true") {console.log(`***** ${majorName} took too long *****`); return -1;} // 로딩이 너무 오래 걸렸던 게시판들
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', `${majorName}.json`),"utf8")
        const oldContent = JSON.parse(rawData);
        // console.log(`${majorName}:`);
        // console.log(oldContent);
        return compareTwoArrays(dataObject.url, oldContent.url);
    }

    storeDifferences.industSec =        readFileAndCompareWithOriginal("industSec",new_industSec);
    storeDifferences.software =         readFileAndCompareWithOriginal("software",new_software);
    storeDifferences.CAUnotice =        readFileAndCompareWithOriginal("CAUnotice",new_CAUnotice);
    storeDifferences.integEngineering = readFileAndCompareWithOriginal("integEngineering",new_integEngineering);
    storeDifferences.korean =           readFileAndCompareWithOriginal("korean",new_korean);
    storeDifferences.mechEngineering =  readFileAndCompareWithOriginal("mechEngineering",new_mechEngineering);
    storeDifferences.psychology =       readFileAndCompareWithOriginal("psychology",new_psychology);
    storeDifferences.business =         readFileAndCompareWithOriginal("business",new_business);
    storeDifferences.elecEngineering =  readFileAndCompareWithOriginal("elecEngineering",new_elecEngineering);
    storeDifferences.english =          readFileAndCompareWithOriginal("english",new_english);
    storeDifferences.enerEngineering =  readFileAndCompareWithOriginal("enerEngineering",new_enerEngineering);
    storeDifferences.urbanPlanRealEstate = readFileAndCompareWithOriginal("urbanPlanRealEstate", new_urbanPlanRealEstate);
    storeDifferences.nursing =          readFileAndCompareWithOriginal("nursing", new_nursing);
    storeDifferences.politics =         readFileAndCompareWithOriginal("politics", new_politics);
    storeDifferences.physicalEd =       readFileAndCompareWithOriginal("physicalEd", new_physicalEd);
    storeDifferences.education =        readFileAndCompareWithOriginal("education", new_education);
    storeDifferences.earlyChildhoodEd = readFileAndCompareWithOriginal("earlyChildhoodEd", new_earlyChildhoodEd);
    storeDifferences.englishEd =        readFileAndCompareWithOriginal("englishEd", new_englishEd);
    storeDifferences.chem =             readFileAndCompareWithOriginal("chem", new_chem);
    storeDifferences.lifeScience =      readFileAndCompareWithOriginal("lifeScience", new_lifeScience);
    storeDifferences.japanese =         readFileAndCompareWithOriginal("japanese", new_japanese);
    storeDifferences.chinese =          readFileAndCompareWithOriginal("chinese", new_chinese);
    storeDifferences.math =             readFileAndCompareWithOriginal("math", new_math);
    storeDifferences.ai =               readFileAndCompareWithOriginal("ai", new_ai);
    storeDifferences.chemEngineering =  readFileAndCompareWithOriginal("chemEngineering", new_chemEngineering);
    storeDifferences.logistics =        readFileAndCompareWithOriginal("logistics", new_logistics);
    storeDifferences.econ =             readFileAndCompareWithOriginal("econ", new_econ);
    storeDifferences.physics =          readFileAndCompareWithOriginal("physics", new_physics);
    storeDifferences.libInfoScience =   readFileAndCompareWithOriginal("libInfoScience", new_libInfoScience);
    storeDifferences.mediaComm =        readFileAndCompareWithOriginal("mediaComm", new_mediaComm);
    storeDifferences.sociology =        readFileAndCompareWithOriginal("sociology", new_sociology);
    storeDifferences.socialWelfare =    readFileAndCompareWithOriginal("socialWelfare", new_socialWelfare);
    storeDifferences.russian =          readFileAndCompareWithOriginal("russian", new_russian);
    storeDifferences.french =           readFileAndCompareWithOriginal("french", new_french);
    storeDifferences.german =           readFileAndCompareWithOriginal("german", new_german);
    storeDifferences.philosophy =       readFileAndCompareWithOriginal("philosophy", new_philosophy);
    storeDifferences.history =          readFileAndCompareWithOriginal("history", new_history);
    storeDifferences.publicService =    readFileAndCompareWithOriginal("publicService", new_publicService);
    storeDifferences.civilEnvPlanEng =  readFileAndCompareWithOriginal("civilEnvPlanEng", new_civilEnvPlanEng);
    storeDifferences.urbanEngineering = readFileAndCompareWithOriginal("urbanEngineering", new_urbanEngineering);
    storeDifferences.architecture =     readFileAndCompareWithOriginal("architecture", new_architecture);
    storeDifferences.appliedStat =      readFileAndCompareWithOriginal("appliedStat", new_appliedStat);
    storeDifferences.med =              readFileAndCompareWithOriginal("med", new_med);
    storeDifferences.pharm =            readFileAndCompareWithOriginal("pharm", new_pharm);
    storeDifferences.adpr =             readFileAndCompareWithOriginal("adpr", new_adpr);
    // storeDiffences.${majorName} = [ 추가된 공지 위치, 추가된 공지 위치 2 ];
    
    // ****************************************************
    // *** 3. 변경 개수를 기반으로 실제 추가된 내용을 저장 ***
    // ****************************************************
    let updatedContentStorage = [];
    function addURLsAndTitlesToStorage(majorName,dataObject,storeDiff){
        if(storeDiff == -1) return;             // 너무 오래 걸려서 패스
        const numberOfDifferences = storeDiff.length;
        if(numberOfDifferences == 0) return;    // 변화 없어서 패스
        let tempUrls = [];
        let tempTitles = [];
        // 예를 들어 n개의 공지([0]~[n-1]) 중 0번 공지랑 3번 공지가 바뀌었다:
        // [0]: 0, [1]: 3
        // 접근: storeDiff[]
        for(let i=0;i<numberOfDifferences;i++){
            tempUrls.push(dataObject.url[storeDiff[i]]);
            tempTitles.push(dataObject.title[storeDiff[i]]);
        }
        // console.log(tempUrls);
        // console.log(tempTitles);
        // **************************
        // *** 3.5. 중복 내용 삭제 ***
        // **************************
        // 일부 게시판들에서 공지와 일반게시글로 동시에 업로드 되는 공지는 크롤링이 두 번 되는 문제가 발생하므로
        // url 내의 공지들을 서로 체크하여 중복되는 공지가 있다면 삭제한다
        let duplicates = [];
        for(let i=0;i<numberOfDifferences;i++){
            for(let j=i+1;j<numberOfDifferences;j++){
                if(tempUrls[i] == tempUrls[j]){
                    duplicates.push(j);
                }
            }
        }
        const count = duplicates.length; // 중복 개수
        for(let i=count-1;i>=0;i--){ // 앞부분부터 자르면 뒤의 원소들이 당겨지므로 뒤부터 자름
            tempUrls.splice(duplicates[i],1);
            tempTitles.splice(duplicates[i],1);
            console.log(`dup updatedContentStorage.${majorName}.${duplicates[i]} deleted`);
        }

        // 결과 저장
        updatedContentStorage[majorName] = {
            majorName: KRname(majorName),
            url: tempUrls,
            title: tempTitles
        };
    }
    addURLsAndTitlesToStorage("industSec",new_industSec,storeDifferences.industSec);
    addURLsAndTitlesToStorage("software",new_software,storeDifferences.software);
    addURLsAndTitlesToStorage("CAUnotice",new_CAUnotice,storeDifferences.CAUnotice);
    addURLsAndTitlesToStorage("integEngineering",new_integEngineering,storeDifferences.integEngineering);
    addURLsAndTitlesToStorage("korean",new_korean,storeDifferences.korean);
    addURLsAndTitlesToStorage("mechEngineering",new_mechEngineering,storeDifferences.mechEngineering);
    addURLsAndTitlesToStorage("psychology",new_psychology,storeDifferences.psychology);
    addURLsAndTitlesToStorage("business",new_business,storeDifferences.business);
    addURLsAndTitlesToStorage("elecEngineering",new_elecEngineering,storeDifferences.elecEngineering);
    addURLsAndTitlesToStorage("english",new_english,storeDifferences.english);
    addURLsAndTitlesToStorage("enerEngineering",new_enerEngineering,storeDifferences.enerEngineering);
    addURLsAndTitlesToStorage("urbanPlanRealEstate", new_urbanPlanRealEstate, storeDifferences.urbanPlanRealEstate);
    addURLsAndTitlesToStorage("nursing", new_nursing, storeDifferences.nursing);
    addURLsAndTitlesToStorage("politics", new_politics, storeDifferences.politics);
    addURLsAndTitlesToStorage("physicalEd", new_physicalEd, storeDifferences.physicalEd);
    addURLsAndTitlesToStorage("education", new_education, storeDifferences.education);
    addURLsAndTitlesToStorage("earlyChildhoodEd", new_earlyChildhoodEd, storeDifferences.earlyChildhoodEd);
    addURLsAndTitlesToStorage("englishEd", new_englishEd, storeDifferences.englishEd);
    addURLsAndTitlesToStorage("chem", new_chem, storeDifferences.chem);
    addURLsAndTitlesToStorage("lifeScience", new_lifeScience, storeDifferences.lifeScience);
    addURLsAndTitlesToStorage("japanese", new_japanese, storeDifferences.japanese);
    addURLsAndTitlesToStorage("chinese", new_chinese, storeDifferences.chinese);
    addURLsAndTitlesToStorage("math", new_math, storeDifferences.math);
    addURLsAndTitlesToStorage("ai", new_ai, storeDifferences.ai);
    addURLsAndTitlesToStorage("chemEngineering", new_chemEngineering, storeDifferences.chemEngineering);
    addURLsAndTitlesToStorage("logistics", new_logistics, storeDifferences.logistics);
    addURLsAndTitlesToStorage("econ", new_econ, storeDifferences.econ);
    addURLsAndTitlesToStorage("physics", new_physics, storeDifferences.physics);
    addURLsAndTitlesToStorage("libInfoScience", new_libInfoScience, storeDifferences.libInfoScience);
    addURLsAndTitlesToStorage("mediaComm", new_mediaComm, storeDifferences.mediaComm);
    addURLsAndTitlesToStorage("sociology", new_sociology, storeDifferences.sociology);
    addURLsAndTitlesToStorage("socialWelfare", new_socialWelfare, storeDifferences.socialWelfare);
    addURLsAndTitlesToStorage("russian", new_russian, storeDifferences.russian);
    addURLsAndTitlesToStorage("french", new_french, storeDifferences.french);
    addURLsAndTitlesToStorage("german", new_german, storeDifferences.german);
    addURLsAndTitlesToStorage("philosophy", new_philosophy, storeDifferences.philosophy);
    addURLsAndTitlesToStorage("history", new_history, storeDifferences.history);
    addURLsAndTitlesToStorage("publicService", new_publicService, storeDifferences.publicService);
    addURLsAndTitlesToStorage("civilEnvPlanEng", new_civilEnvPlanEng, storeDifferences.civilEnvPlanEng);
    addURLsAndTitlesToStorage("urbanEngineering", new_urbanEngineering, storeDifferences.urbanEngineering);
    addURLsAndTitlesToStorage("architecture", new_architecture, storeDifferences.architecture);
    addURLsAndTitlesToStorage("appliedStat", new_appliedStat, storeDifferences.appliedStat);
    addURLsAndTitlesToStorage("med", new_med, storeDifferences.med);
    addURLsAndTitlesToStorage("pharm", new_pharm, storeDifferences.pharm);
    addURLsAndTitlesToStorage("adpr", new_adpr, storeDifferences.adpr);
    
    // console.log(updatedContentStorage.length);

    if(Object.keys(updatedContentStorage).length == 0){
        console.log("*** No Updates!");
        return; // 바뀐 내용이 없으면 조기 리턴하여 연산량을 줄임
    }
    else console.log("*** Updates on the way!");


    // ********************************************************************
    // *** 4. 각 유저의 구독정보 확인 후 해당되는 게시글을 추가해 메일 전송 ***
    // ********************************************************************

    // 메일에서 받는 게시판의 순서를 바꾸려면 여기서 바꾸면 됨
    let dataToSend = [];
    let listOfSuccessfulRecipients = [];
    let sendOrNot = 0;
    const userDataBase = JSON.parse(fs.readFileSync("./userDB_log/userDB.json","utf8"),"utf8");
    for(let i=0;i<nextIdNum;i++){
        if(userDataBase[i].subStatus == "false") continue;
        // console.log(userDataBase[i]);
        if(userDataBase[i].industSec == "true" && updatedContentStorage.industSec != undefined) {dataToSend.push(updatedContentStorage.industSec); sendOrNot++;}
        if(userDataBase[i].software == "true" && updatedContentStorage.software != undefined) {dataToSend.push(updatedContentStorage.software); sendOrNot++;}
        if(userDataBase[i].CAUnotice == "true" && updatedContentStorage.CAUnotice != undefined) {dataToSend.push(updatedContentStorage.CAUnotice); sendOrNot++;}
        if(userDataBase[i].integEngineering == "true" && updatedContentStorage.integEngineering != undefined) {dataToSend.push(updatedContentStorage.integEngineering); sendOrNot++;}
        if(userDataBase[i].korean == "true" && updatedContentStorage.korean != undefined) {dataToSend.push(updatedContentStorage.korean); sendOrNot++;}
        if(userDataBase[i].mechEngineering == "true" && updatedContentStorage.mechEngineering != undefined) {dataToSend.push(updatedContentStorage.mechEngineering); sendOrNot++;}
        if(userDataBase[i].psychology == "true" && updatedContentStorage.psychology != undefined) {dataToSend.push(updatedContentStorage.psychology); sendOrNot++;}
        if(userDataBase[i].business == "true" && updatedContentStorage.business != undefined) {dataToSend.push(updatedContentStorage.business); sendOrNot++;}
        if(userDataBase[i].elecEngineering == "true" && updatedContentStorage.elecEngineering != undefined) {dataToSend.push(updatedContentStorage.elecEngineering); sendOrNot++;}
        if(userDataBase[i].english == "true" && updatedContentStorage.english != undefined) {dataToSend.push(updatedContentStorage.english); sendOrNot++;}
        if(userDataBase[i].enerEngineering == "true" && updatedContentStorage.enerEngineering != undefined) {dataToSend.push(updatedContentStorage.enerEngineering); sendOrNot++;}
        if(userDataBase[i].urbanPlanRealEstate == "true" && updatedContentStorage.urbanPlanRealEstate != undefined) {dataToSend.push(updatedContentStorage.urbanPlanRealEstate); sendOrNot++;}
        if(userDataBase[i].nursing == "true" && updatedContentStorage.nursing != undefined) {dataToSend.push(updatedContentStorage.nursing); sendOrNot++;}
        if(userDataBase[i].politics == "true" && updatedContentStorage.politics != undefined) {dataToSend.push(updatedContentStorage.politics); sendOrNot++;}
        if(userDataBase[i].physicalEd == "true" && updatedContentStorage.physicalEd != undefined) {dataToSend.push(updatedContentStorage.physicalEd); sendOrNot++;}
        if(userDataBase[i].education == "true" && updatedContentStorage.education != undefined) {dataToSend.push(updatedContentStorage.education); sendOrNot++;}
        if(userDataBase[i].earlyChildhoodEd == "true" && updatedContentStorage.earlyChildhoodEd != undefined) {dataToSend.push(updatedContentStorage.earlyChildhoodEd); sendOrNot++;}
        if(userDataBase[i].englishEd == "true" && updatedContentStorage.englishEd != undefined) {dataToSend.push(updatedContentStorage.englishEd); sendOrNot++;}
        if(userDataBase[i].chem == "true" && updatedContentStorage.chem != undefined) {dataToSend.push(updatedContentStorage.chem); sendOrNot++;}
        if(userDataBase[i].lifeScience == "true" && updatedContentStorage.lifeScience != undefined) {dataToSend.push(updatedContentStorage.lifeScience); sendOrNot++;}
        if(userDataBase[i].japanese == "true" && updatedContentStorage.japanese != undefined) {dataToSend.push(updatedContentStorage.japanese); sendOrNot++;}
        if(userDataBase[i].chinese == "true" && updatedContentStorage.chinese != undefined) {dataToSend.push(updatedContentStorage.chinese); sendOrNot++;}
        if(userDataBase[i].math == "true" && updatedContentStorage.math != undefined) {dataToSend.push(updatedContentStorage.math); sendOrNot++;}
        if(userDataBase[i].ai == "true" && updatedContentStorage.ai != undefined) {dataToSend.push(updatedContentStorage.ai); sendOrNot++;}
        if(userDataBase[i].chemEngineering == "true" && updatedContentStorage.chemEngineering != undefined) {dataToSend.push(updatedContentStorage.chemEngineering); sendOrNot++;}
        if(userDataBase[i].logistics == "true" && updatedContentStorage.logistics != undefined) {dataToSend.push(updatedContentStorage.logistics); sendOrNot++;}
        if(userDataBase[i].econ == "true" && updatedContentStorage.econ != undefined) {dataToSend.push(updatedContentStorage.econ); sendOrNot++;}
        if(userDataBase[i].physics == "true" && updatedContentStorage.physics != undefined) {dataToSend.push(updatedContentStorage.physics); sendOrNot++;}
        if(userDataBase[i].libInfoScience == "true" && updatedContentStorage.libInfoScience != undefined) {dataToSend.push(updatedContentStorage.libInfoScience); sendOrNot++;}
        if(userDataBase[i].mediaComm == "true" && updatedContentStorage.mediaComm != undefined) {dataToSend.push(updatedContentStorage.mediaComm); sendOrNot++;}
        if(userDataBase[i].sociology == "true" && updatedContentStorage.sociology != undefined) {dataToSend.push(updatedContentStorage.sociology); sendOrNot++;}
        if(userDataBase[i].socialWelfare == "true" && updatedContentStorage.socialWelfare != undefined) {dataToSend.push(updatedContentStorage.socialWelfare); sendOrNot++;}
        if(userDataBase[i].russian == "true" && updatedContentStorage.russian != undefined) {dataToSend.push(updatedContentStorage.russian); sendOrNot++;}
        if(userDataBase[i].french == "true" && updatedContentStorage.french != undefined) {dataToSend.push(updatedContentStorage.french); sendOrNot++;}
        if(userDataBase[i].german == "true" && updatedContentStorage.german != undefined) {dataToSend.push(updatedContentStorage.german); sendOrNot++;}
        if(userDataBase[i].philosophy == "true" && updatedContentStorage.philosophy != undefined) {dataToSend.push(updatedContentStorage.philosophy); sendOrNot++;}
        if(userDataBase[i].history == "true" && updatedContentStorage.history != undefined) {dataToSend.push(updatedContentStorage.history); sendOrNot++;}
        if(userDataBase[i].publicService == "true" && updatedContentStorage.publicService != undefined) {dataToSend.push(updatedContentStorage.publicService); sendOrNot++;}
        if(userDataBase[i].civilEnvPlanEng == "true" && updatedContentStorage.civilEnvPlanEng != undefined) {dataToSend.push(updatedContentStorage.civilEnvPlanEng); sendOrNot++;}
        if(userDataBase[i].urbanEngineering == "true" && updatedContentStorage.urbanEngineering != undefined) {dataToSend.push(updatedContentStorage.urbanEngineering); sendOrNot++;}
        if(userDataBase[i].architecture == "true" && updatedContentStorage.architecture != undefined) {dataToSend.push(updatedContentStorage.architecture); sendOrNot++;}
        if(userDataBase[i].appliedStat == "true" && updatedContentStorage.appliedStat != undefined) {dataToSend.push(updatedContentStorage.appliedStat); sendOrNot++;}
        if(userDataBase[i].med == "true" && updatedContentStorage.med != undefined) {dataToSend.push(updatedContentStorage.med); sendOrNot++;}
        if(userDataBase[i].pharm == "true" && updatedContentStorage.pharm != undefined) {dataToSend.push(updatedContentStorage.pharm); sendOrNot++;}
        if(userDataBase[i].adpr == "true" && updatedContentStorage.adpr != undefined) {dataToSend.push(updatedContentStorage.adpr); sendOrNot++;}

        if(sendOrNot != 0){
            // console.log(`dataToSend[${moment().format('YYYYMMDD, h:mm:ss a')}]:`);
            // console.log(dataToSend);
            let rcvd = mailHandler(userDataBase[i].name, userDataBase[i].email, dataToSend, i, "false");
            if(rcvd == 0) listOfSuccessfulRecipients.push(userDataBase[i].email);
            // recipientName, recipientEmail, data, id, IsItSubMail
            sendOrNot = 0;
            dataToSend = [];
        }
    }
    console.log("Successfully sent to:");
    console.log(listOfSuccessfulRecipients);
    
    // ********************************************
    // *** 5. 변경 사항이 있었던 게시판들은 초기화 ***
    // ********************************************
    if (storeDifferences.industSec.length != 0) {
        let industSecObject = {
            url: new_industSec.url,
            title: new_industSec.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'industSec.json'), JSON.stringify(industSecObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("industSec updated"); }
        });
    }
    if (storeDifferences.software.length != 0) {
        let softwareObject = {
            url: new_software.url,
            title: new_software.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'software.json'), JSON.stringify(softwareObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("software updated"); }
        });
    }
    if (storeDifferences.CAUnotice.length != 0) {
        let CAUnoticeObject = {
            url: new_CAUnotice.url,
            title: new_CAUnotice.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'CAUnotice.json'), JSON.stringify(CAUnoticeObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("CAUnotice updated"); }
        });
    }
    if (storeDifferences.integEngineering.length != 0) {
        let integEngineeringObject = {
            url: new_integEngineering.url,
            title: new_integEngineering.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'integEngineering.json'), JSON.stringify(integEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("integEngineering updated"); }
        });
    }
    if (storeDifferences.korean.length != 0) {
        let koreanObject = {
            url: new_korean.url,
            title: new_korean.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'korean.json'), JSON.stringify(koreanObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("korean updated"); }
        });
    }
    if (storeDifferences.mechEngineering.length != 0) {
        let mechEngineeringObject = {
            url: new_mechEngineering.url,
            title: new_mechEngineering.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'mechEngineering.json'), JSON.stringify(mechEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("mechEngineering updated"); }
        });
    }
    if (storeDifferences.psychology.length != 0) {
        let psychologyObject = {
            url: new_psychology.url,
            title: new_psychology.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'psychology.json'), JSON.stringify(psychologyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("psychology updated"); }
        });
    }
    if (storeDifferences.business.length != 0) {
        let businessObject = {
            url: new_business.url,
            title: new_business.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'business.json'), JSON.stringify(businessObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("business updated"); }
        });
    }
    if (storeDifferences.elecEngineering.length != 0) {
        let elecEngineeringObject = {
            url: new_elecEngineering.url,
            title: new_elecEngineering.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'elecEngineering.json'), JSON.stringify(elecEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("elecEngineering updated"); }
        });
    }
    if (storeDifferences.english.length != 0) {
        let englishObject = {
            url: new_english.url,
            title: new_english.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'english.json'), JSON.stringify(englishObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("english updated"); }
        });
    }
    if (storeDifferences.enerEngineering.length != 0) {
        let enerEngineeringObject = {
            url: new_enerEngineering.url,
            title: new_enerEngineering.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'enerEngineering.json'), JSON.stringify(enerEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("enerEngineering updated"); }
        });
    }
    if (storeDifferences.urbanPlanRealEstate.length != 0) {
        let urbanPlanRealEstateObject = {
            url: new_urbanPlanRealEstate.url,
            title: new_urbanPlanRealEstate.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'urbanPlanRealEstate.json'), JSON.stringify(urbanPlanRealEstateObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("urbanPlanRealEstate updated"); }
        });
    }
    if (storeDifferences.nursing.length != 0) {
        let nursingObject = {
            url: new_nursing.url,
            title: new_nursing.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'nursing.json'), JSON.stringify(nursingObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("nursing updated"); }
        });
    }
    if (storeDifferences.politics.length != 0) {
        let politicsObject = {
            url: new_politics.url,
            title: new_politics.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'politics.json'), JSON.stringify(politicsObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("politics updated"); }
        });
    }
    if (storeDifferences.physicalEd.length != 0) {
        let physicalEdObject = {
            url: new_physicalEd.url,
            title: new_physicalEd.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'physicalEd.json'), JSON.stringify(physicalEdObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("physicalEd updated"); }
        });
    }
    if (storeDifferences.education.length != 0) {
        let educationObject = {
            url: new_education.url,
            title: new_education.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'education.json'), JSON.stringify(educationObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("education updated"); }
        });
    }
    if (storeDifferences.earlyChildhoodEd.length != 0) {
        let earlyChildhoodEdObject = {
            url: new_earlyChildhoodEd.url,
            title: new_earlyChildhoodEd.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'earlyChildhoodEd.json'), JSON.stringify(earlyChildhoodEdObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("earlyChildhoodEd updated"); }
        });
    }
    if (storeDifferences.englishEd.length != 0) {
        let englishEdObject = {
            url: new_englishEd.url,
            title: new_englishEd.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'englishEd.json'), JSON.stringify(englishEdObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("englishEd updated"); }
        });
    }
    if (storeDifferences.chem.length != 0) {
        let chemObject = {
            url: new_chem.url,
            title: new_chem.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'chem.json'), JSON.stringify(chemObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("chem updated"); }
        });
    }
    if (storeDifferences.lifeScience.length != 0) {
        let lifeScienceObject = {
            url: new_lifeScience.url,
            title: new_lifeScience.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'lifeScience.json'), JSON.stringify(lifeScienceObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("lifeScience updated"); }
        });
    }
    if (storeDifferences.japanese.length != 0) {
        let japaneseObject = {
            url: new_japanese.url,
            title: new_japanese.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'japanese.json'), JSON.stringify(japaneseObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("japanese updated"); }
        });
    }
    if (storeDifferences.chinese.length != 0) {
        let chineseObject = {
            url: new_chinese.url,
            title: new_chinese.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'chinese.json'), JSON.stringify(chineseObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("chinese updated"); }
        });
    }
    if (storeDifferences.math.length != 0) {
        let mathObject = {
            url: new_math.url,
            title: new_math.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'math.json'), JSON.stringify(mathObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("math updated"); }
        });
    }
    if (storeDifferences.ai.length != 0) {
        let aiObject = {
            url: new_ai.url,
            title: new_ai.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'ai.json'), JSON.stringify(aiObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("ai updated"); }
        });
    }
    if (storeDifferences.chemEngineering.length != 0) {
        let chemEngineeringObject = {
            url: new_chemEngineering.url,
            title: new_chemEngineering.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'chemEngineering.json'), JSON.stringify(chemEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("chemEngineering updated"); }
        });
    }
    if (storeDifferences.logistics.length != 0) {
        let logisticsObject = {
            url: new_logistics.url,
            title: new_logistics.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'logistics.json'), JSON.stringify(logisticsObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("logistics updated"); }
        });
    }
    if (storeDifferences.econ.length != 0) {
        let econObject = {
            url: new_econ.url,
            title: new_econ.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'econ.json'), JSON.stringify(econObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("econ updated"); }
        });
    }
    if (storeDifferences.physics.length != 0) {
        let physicsObject = {
            url: new_physics.url,
            title: new_physics.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'physics.json'), JSON.stringify(physicsObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("physics updated"); }
        });
    }
    if (storeDifferences.libInfoScience.length != 0) {
        let libInfoScienceObject = {
            url: new_libInfoScience.url,
            title: new_libInfoScience.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'libInfoScience.json'), JSON.stringify(libInfoScienceObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("libInfoScience updated"); }
        });
    }
    if (storeDifferences.mediaComm.length != 0) {
        let mediaCommObject = {
            url: new_mediaComm.url,
            title: new_mediaComm.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'mediaComm.json'), JSON.stringify(mediaCommObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("mediaComm updated"); }
        });
    }
    if (storeDifferences.sociology.length != 0) {
        let sociologyObject = {
            url: new_sociology.url,
            title: new_sociology.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'sociology.json'), JSON.stringify(sociologyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("sociology updated"); }
        });
    }
    if (storeDifferences.socialWelfare.length != 0) {
        let socialWelfareObject = {
            url: new_socialWelfare.url,
            title: new_socialWelfare.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'socialWelfare.json'), JSON.stringify(socialWelfareObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("socialWelfare updated"); }
        });
    }
    if (storeDifferences.russian.length != 0) {
        let russianObject = {
            url: new_russian.url,
            title: new_russian.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'russian.json'), JSON.stringify(russianObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("russian updated"); }
        });
    }
    if (storeDifferences.french.length != 0) {
        let frenchObject = {
            url: new_french.url,
            title: new_french.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'french.json'), JSON.stringify(frenchObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("french updated"); }
        });
    }
    if (storeDifferences.german.length != 0) {
        let germanObject = {
            url: new_german.url,
            title: new_german.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'german.json'), JSON.stringify(germanObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("german updated"); }
        });
    }
    if (storeDifferences.philosophy.length != 0) {
        let philosophyObject = {
            url: new_philosophy.url,
            title: new_philosophy.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'philosophy.json'), JSON.stringify(philosophyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("philosophy updated"); }
        });
    }
    if (storeDifferences.history.length != 0) {
        let historyObject = {
            url: new_history.url,
            title: new_history.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'history.json'), JSON.stringify(historyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("history updated"); }
        });
    }
    if (storeDifferences.publicService.length != 0) {
        let publicServiceObject = {
            url: new_publicService.url,
            title: new_publicService.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'publicService.json'), JSON.stringify(publicServiceObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("publicService updated"); }
        });
    }
    if (storeDifferences.civilEnvPlanEng.length != 0) {
        let civilEnvPlanEngObject = {
            url: new_civilEnvPlanEng.url,
            title: new_civilEnvPlanEng.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'civilEnvPlanEng.json'), JSON.stringify(civilEnvPlanEngObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("civilEnvPlanEng updated"); }
        });
    }
    if (storeDifferences.urbanEngineering.length != 0) {
        let urbanEngineeringObject = {
            url: new_urbanEngineering.url,
            title: new_urbanEngineering.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'urbanEngineering.json'), JSON.stringify(urbanEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("urbanEngineering updated"); }
        });
    }
    if (storeDifferences.architecture.length != 0) {
        let architectureObject = {
            url: new_architecture.url,
            title: new_architecture.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'architecture.json'), JSON.stringify(architectureObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("architecture updated"); }
        });
    }
    if (storeDifferences.appliedStat.length != 0) {
        let appliedStatObject = {
            url: new_appliedStat.url,
            title: new_appliedStat.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'appliedStat.json'), JSON.stringify(appliedStatObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("appliedStat updated"); }
        });
    }
    if (storeDifferences.med.length != 0) {
        let medObject = {
            url: new_med.url,
            title: new_med.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'med.json'), JSON.stringify(medObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("med updated"); }
        });
    }
    if (storeDifferences.pharm.length != 0) {
        let pharmObject = {
            url: new_pharm.url,
            title: new_pharm.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'pharm.json'), JSON.stringify(pharmObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("pharm updated"); }
        });
    }
    if (storeDifferences.adpr.length != 0) {
        let adprObject = {
            url: new_adpr.url,
            title: new_adpr.title
        };
        fs.writeFile(path.join(__dirname, 'compare_list', 'adpr.json'), JSON.stringify(adprObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("adpr updated"); }
        });
    }
    
}
if(ON == "true") refresh(1);


// 기존 목록의 파일들(json)을 만들고,
// 기존 목록에서 긁어온 목록과 지금의 목록을 대조하고,
// 결과값 리턴

export async function updateFiles(){
    const new_industSec = await waitWithTimeout(crawlIndustSec("url"),1*60*1000); // 이 반환값에 .title 또는 .url을 이용해 값에 접근할 수 있음
    fs.writeFile("./compare_list/industSec.json", JSON.stringify(new_industSec, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("industSec.json written successfully\n");
    });
    const new_software = await waitWithTimeout(crawlSoftware("url"),1*60*1000);
    fs.writeFile("./compare_list/software.json", JSON.stringify(new_software, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("software.json written successfully\n");
    });
    const new_CAUnotice = await waitWithTimeout(crawlCAUnotice("url"),1*60*1000);
    fs.writeFile("./compare_list/CAUnotice.json", JSON.stringify(new_CAUnotice, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("CAUnotice.json written successfully\n");
    });
    const new_integEngineering = await waitWithTimeout(crawlIntegEngineering("url"),1*60*1000);
    fs.writeFile("./compare_list/integEngineering.json", JSON.stringify(new_integEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("integEngineering.json written successfully\n");
    });
    const new_korean = await waitWithTimeout(crawlKorean("url"),1*60*1000);
    fs.writeFile("./compare_list/korean.json", JSON.stringify(new_korean, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("korean.json written successfully\n");
    });
    const new_mechEngineering = await waitWithTimeout(crawlMechEngineering("url"),1*60*1000);
    fs.writeFile("./compare_list/mechEngineering.json", JSON.stringify(new_mechEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("mechEngineering.json written successfully\n");
    });
    const new_psychology = await waitWithTimeout(crawlPsychology("url"),1*60*1000);
    fs.writeFile("./compare_list/psychology.json", JSON.stringify(new_psychology, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("psychology.json written successfully\n");
    });
    const new_business = await waitWithTimeout(crawlBusiness("url"),1*60*1000);
    fs.writeFile("./compare_list/business.json", JSON.stringify(new_business, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("business.json written successfully\n");
    });
    const new_elecEngineering = await waitWithTimeout(crawlElecEngineering("url"),1*60*1000);
    fs.writeFile("./compare_list/elecEngineering.json", JSON.stringify(new_elecEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("elecEngineering.json written successfully\n");
    });
    const new_english = await waitWithTimeout(crawlEnglish("url"),1*60*1000);
    fs.writeFile("./compare_list/english.json", JSON.stringify(new_english, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("english.json written successfully\n");
    });
    const new_enerEngineering = await waitWithTimeout(crawlEnerEngineering("url"),1*60*1000);
    fs.writeFile("./compare_list/enerEngineering.json", JSON.stringify(new_enerEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("enerEngineering.json written successfully\n");
    });
    const new_urbanPlanRealEstate = await waitWithTimeout(crawlUrbanPlanRealEstate("url"),1*60*1000);
    fs.writeFile("./compare_list/urbanPlanRealEstate.json", JSON.stringify(new_urbanPlanRealEstate, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("urbanPlanRealEstate.json written successfully");
    });

    const new_nursing = await waitWithTimeout(crawlNursing("url"),1*60*1000);
    fs.writeFile("./compare_list/nursing.json", JSON.stringify(new_nursing, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("nursing.json written successfully");
    });

    const new_politics = await waitWithTimeout(crawlPolitics("url"),1*60*1000);
    fs.writeFile("./compare_list/politics.json", JSON.stringify(new_politics, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("politics.json written successfully");
    });

    const new_physicalEd = await waitWithTimeout(crawlPhysicalEd("url"),1*60*1000);
    fs.writeFile("./compare_list/physicalEd.json", JSON.stringify(new_physicalEd, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("physicalEd.json written successfully");
    });

    const new_education = await waitWithTimeout(crawlEducation("url"),1*60*1000);
    fs.writeFile("./compare_list/education.json", JSON.stringify(new_education, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("education.json written successfully");
    });

    const new_earlyChildhoodEd = await waitWithTimeout(crawlEarlyChildhoodEd("url"),1*60*1000);
    fs.writeFile("./compare_list/earlyChildhoodEd.json", JSON.stringify(new_earlyChildhoodEd, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("earlyChildhoodEd.json written successfully");
    });

    const new_englishEd = await waitWithTimeout(crawlEnglishEd("url"),1*60*1000);
    fs.writeFile("./compare_list/englishEd.json", JSON.stringify(new_englishEd, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("englishEd.json written successfully");
    });

    const new_chem = await waitWithTimeout(crawlChem("url"),1*60*1000);
    fs.writeFile("./compare_list/chem.json", JSON.stringify(new_chem, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("chem.json written successfully");
    });

    const new_lifeScience = await waitWithTimeout(crawlLifeScience("url"),1*60*1000);
    fs.writeFile("./compare_list/lifeScience.json", JSON.stringify(new_lifeScience, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("lifeScience.json written successfully");
    });

    const new_japanese = await waitWithTimeout(crawlJapanese("url"),1*60*1000);
    fs.writeFile("./compare_list/japanese.json", JSON.stringify(new_japanese, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("japanese.json written successfully");
    });

    const new_chinese = await waitWithTimeout(crawlChinese("url"),1*60*1000);
    fs.writeFile("./compare_list/chinese.json", JSON.stringify(new_chinese, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("chinese.json written successfully");
    });

    const new_math = await waitWithTimeout(crawlMath("url"),1*60*1000);
    fs.writeFile("./compare_list/math.json", JSON.stringify(new_math, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("math.json written successfully");
    });

    const new_ai = await waitWithTimeout(crawlAi("url"),1*60*1000);
    fs.writeFile("./compare_list/ai.json", JSON.stringify(new_ai, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("ai.json written successfully");
    });

    const new_chemEngineering = await waitWithTimeout(crawlChemEngineering("url"),1*60*1000);
    fs.writeFile("./compare_list/chemEngineering.json", JSON.stringify(new_chemEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("chemEngineering.json written successfully");
    });

    const new_logistics = await waitWithTimeout(crawlLogistics("url"),1*60*1000);
    fs.writeFile("./compare_list/logistics.json", JSON.stringify(new_logistics, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("logistics.json written successfully");
    });

    const new_econ = await waitWithTimeout(crawlEcon("url"),1*60*1000);
    fs.writeFile("./compare_list/econ.json", JSON.stringify(new_econ, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("econ.json written successfully");
    });

    const new_physics = await waitWithTimeout(crawlPhysics("url"),1*60*1000);
    fs.writeFile("./compare_list/physics.json", JSON.stringify(new_physics, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("physics.json written successfully");
    });

    const new_libInfoScience = await waitWithTimeout(crawlLibInfoScience("url"),1*60*1000);
    fs.writeFile("./compare_list/libInfoScience.json", JSON.stringify(new_libInfoScience, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("libInfoScience.json written successfully");
    });

    const new_mediaComm = await waitWithTimeout(crawlMediaComm("url"),1*60*1000);
    fs.writeFile("./compare_list/mediaComm.json", JSON.stringify(new_mediaComm, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("mediaComm.json written successfully");
    });

    const new_sociology = await waitWithTimeout(crawlSociology("url"),1*60*1000);
    fs.writeFile("./compare_list/sociology.json", JSON.stringify(new_sociology, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("sociology.json written successfully");
    });

    const new_socialWelfare = await waitWithTimeout(crawlSocialWelfare("url"),1*60*1000);
    fs.writeFile("./compare_list/socialWelfare.json", JSON.stringify(new_socialWelfare, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("socialWelfare.json written successfully");
    });
    const new_russian = await waitWithTimeout(crawlRussian("url"),1*60*1000);
    fs.writeFile("./compare_list/russian.json", JSON.stringify(new_russian, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("russian.json written successfully");
    });
    const new_french = await waitWithTimeout(crawlFrench("url"),1*60*1000);
    fs.writeFile("./compare_list/french.json", JSON.stringify(new_french, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("french.json written successfully");
    });
    const new_german = await waitWithTimeout(crawlGerman("url"),1*60*1000);
    fs.writeFile("./compare_list/german.json", JSON.stringify(new_german, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("german.json written successfully");
    });
    const new_philosophy = await waitWithTimeout(crawlPhilosophy("url"),1*60*1000);
    fs.writeFile("./compare_list/philosophy.json", JSON.stringify(new_philosophy, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("philosophy.json written successfully");
    });
    const new_history = await waitWithTimeout(crawlHistory("url"),1*60*1000);
    fs.writeFile("./compare_list/history.json", JSON.stringify(new_history, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("history.json written successfully");
    });
    const new_publicService = await waitWithTimeout(crawlPublicService("url"),1*60*1000);
    fs.writeFile("./compare_list/publicService.json", JSON.stringify(new_publicService, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("publicService.json written successfully");
    });
    const new_civilEnvPlanEng = await waitWithTimeout(crawlCivilEnvPlanEng("url"),1*60*1000);
    fs.writeFile("./compare_list/civilEnvPlanEng.json", JSON.stringify(new_civilEnvPlanEng, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("civilEnvPlanEng.json written successfully");
    });
    const new_urbanEngineering = await waitWithTimeout(crawlUrbanEngineering("url"),1*60*1000);
    fs.writeFile("./compare_list/urbanEngineering.json", JSON.stringify(new_urbanEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("urbanEngineering.json written successfully");
    });
    const new_architecture = await waitWithTimeout(crawlArchitecture("url"),1*60*1000);
    fs.writeFile("./compare_list/architecture.json", JSON.stringify(new_architecture, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("architecture.json written successfully");
    });
    const new_appliedStat = await waitWithTimeout(crawlAppliedStat("url"),1*60*1000);
    fs.writeFile("./compare_list/appliedStat.json", JSON.stringify(new_appliedStat, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("appliedStat.json written successfully");
    });
    const new_med = await waitWithTimeout(crawlMed("url"),1*60*1000);
    fs.writeFile("./compare_list/med.json", JSON.stringify(new_med, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("med.json written successfully");
    });
    const new_pharm = await waitWithTimeout(crawlPharm("url"),1*60*1000);
    fs.writeFile("./compare_list/pharm.json", JSON.stringify(new_pharm, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("pharm.json written successfully");
    });
    const new_adpr = await waitWithTimeout(crawladpr("url"),1*60*1000);
    fs.writeFile("./compare_list/adpr.json", JSON.stringify(new_adpr, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("adpr.json written successfully");
    });
}
// updateFiles();

// const new_industSec = await waitWithTimeout(crawlIndustSec("url"),1*60*1000); // 이 반환값에 .title 또는 .url을 이용해 값에 접근할 수 있음
// fs.writeFileSync("industSec.json", JSON.stringify(new_industSec), "utf8");
// console.log(new_industSec);
// console.log(JSON.stringify(new_industSec));