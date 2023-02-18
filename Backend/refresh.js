import fs from "fs";
import { compareTwoArrays } from "./compare.js"
import { mailHandler } from "./mailHandler.js";
import path from 'path';
import { fileURLToPath } from 'url';
import KRname from "./name_en2kr.js"


import crawlIndustSec from "./crawlers/url_scraper_indust_sec.js";
import crawlSoftware from "./crawlers/url_scraper_software.js";
import crawlCAUnotice from "./crawlers/url_scraper_cauNotice.js"; // 특이점
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
import crawladpr from "./crawlers/url_scraper_adprr.js"; // 특이점
import crawlDorm from "./crawlers/url_scraper_dorm.js";
import crawlupreJob from "./crawlers/url_scraper_upre_job.js"; // 특이점
import crawlDavinci from "./crawlers/url_scraper_davinci.js";
import crawlPolaris from "./crawlers/url_scraper_polaris.js";
 
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

    async function actualPromise(asyncPromise){
        try {
            asyncPromise;
        } catch (error) {
            console.log(error);
            return {"error":"true"};
        }
    }

    return Promise.race([asyncPromise, timeoutPromise]).then(result => {
        clearTimeout(timeoutHandle);
        return result;
    })
}

// refresh 함수에서는
// 크롤러 실행 -> 기존 목록과 대조 -> 변화 있으면 sendMail() 후 원래 목록 대체, 없으면 행동하지 않음 -> 다음 크롤러 실행.
export async function refresh(nextIdNum, silentMode, sendMail){

    console.log("*** Refreshing Started ***")

    // *********************************
    // *** 1. 크롤러로부터 데이터 로드 ***
    // *********************************
    // 하나의 오류 발생시 전체 코드 충돌 방지를 위해 타임아웃 제한
    

    // if문은 0만 아니면 실행한다. 즉, 0 은 false고, 0을 제외한 모든 값은 true이다.
    // 즉 silentMode의 값이 1이라면,
    // if(!silentMode) console.log 는 silentMode일 때 실행 X


    console.time("** fully loaded 1 in "); // 로딩시간 기록
    // const naw_integEngineering = await waitWithTimeout(crawlIntegEngineerin("url",2),1*60*1000);
    const new_CAUnotice = 	    await waitWithTimeout(crawlCAUnotice("url",1),1*60*1000);			if(!silentMode) console.log("CAUnotice loaded");
    console.log(new_CAUnotice);
    const new_adpr = 		    await waitWithTimeout(crawladpr("url",1),1*60*1000);			    if(!silentMode) console.log("adpr loaded");
    const new_ai = 			    await waitWithTimeout(crawlAi("url",1),1*60*1000);			        if(!silentMode) console.log("ai loaded");
    console.log(new_ai);
    const new_appliedStat =     await waitWithTimeout(crawlAppliedStat("url",1),1*60*1000);			if(!silentMode) console.log("appliedStat loaded");
    console.log(new_appliedStat);
    const new_architecture =    await waitWithTimeout(crawlArchitecture("url",1),1*60*1000);		if(!silentMode) console.log("architecture loaded");
    const new_business = 	    await waitWithTimeout(crawlBusiness("url",1),1*60*1000);			if(!silentMode) console.log("business loaded");
    const new_chem = 		    await waitWithTimeout(crawlChem("url",1),1*60*1000);			    if(!silentMode) console.log("chem loaded");
    const new_chemEngineering = await waitWithTimeout(crawlChemEngineering("url",1),1*60*1000);		if(!silentMode) console.log("chemEngineering loaded");
    const new_chinese = 	    await waitWithTimeout(crawlChinese("url",1),1*60*1000);			    if(!silentMode) console.log("chinese loaded");
    const new_civilEnvPlanEng = await waitWithTimeout(crawlCivilEnvPlanEng("url",1),1*60*1000);		if(!silentMode) console.log("civilEnvPlanEng loaded");
    const new_davinci = 	    await waitWithTimeout(crawlDavinci("url",1),1*60*1000);			    if(!silentMode) console.log("davinci loaded");
    const new_dorm = 		    await waitWithTimeout(crawlDorm("url",1),1*60*1000);			    if(!silentMode) console.log("dorm loaded");
    const new_earlyChildhoodEd = await waitWithTimeout(crawlEarlyChildhoodEd("url",1),1*60*1000);	if(!silentMode) console.log("earlyChildhoodEd loaded");
    const new_econ = 		    await waitWithTimeout(crawlEcon("url",1),1*60*1000);			    if(!silentMode) console.log("econ loaded");
    const new_education = 	    await waitWithTimeout(crawlEducation("url",1),1*60*1000);			if(!silentMode) console.log("education loaded");
    const new_elecEngineering = await waitWithTimeout(crawlElecEngineering("url",1),1*60*1000);		if(!silentMode) console.log("elecEngineering loaded");
    const new_enerEngineering = await waitWithTimeout(crawlEnerEngineering("url",1),1*60*1000);		if(!silentMode) console.log("enerEngineering loaded");
    const new_english = 	    await waitWithTimeout(crawlEnglish("url",1),1*60*1000);             if(!silentMode) console.log("english loaded");
    const new_englishEd = 	    await waitWithTimeout(crawlEnglishEd("url",1),1*60*1000);			if(!silentMode) console.log("englishEd loaded");
    const new_french = 	        await waitWithTimeout(crawlFrench("url",1),1*60*1000);			    if(!silentMode) console.log("french loaded");
    const new_german = 		    await waitWithTimeout(crawlGerman("url",1),1*60*1000);			    if(!silentMode) console.log("german loaded");
    const new_history = 	    await waitWithTimeout(crawlHistory("url",1),1*60*1000);			    if(!silentMode) console.log("history loaded");
    const new_industSec = 	    await waitWithTimeout(crawlIndustSec("url",1),1*60*1000);			if(!silentMode) console.log("industSec loaded");
    const new_integEngineering = await waitWithTimeout(crawlIntegEngineering("url",1),1*60*1000);	if(!silentMode) console.log("integEngineering loaded");
    const new_japanese = 	    await waitWithTimeout(crawlJapanese("url",1),1*60*1000);			if(!silentMode) console.log("japanese loaded");
    const new_korean = 		    await waitWithTimeout(crawlKorean("url",1),1*60*1000);			    if(!silentMode) console.log("korean loaded");
    const new_libInfoScience = 	await waitWithTimeout(crawlLibInfoScience("url",1),1*60*1000);		if(!silentMode) console.log("libInfoScience loaded");
    const new_lifeScience =     await waitWithTimeout(crawlLifeScience("url",1),1*60*1000);			if(!silentMode) console.log("lifeScience loaded");
    const new_logistics = 	    await waitWithTimeout(crawlLogistics("url",1),1*60*1000);			if(!silentMode) console.log("logistics loaded");
    const new_math = 		    await waitWithTimeout(crawlMath("url",1),1*60*1000);			    if(!silentMode) console.log("math loaded");
    const new_mechEngineering = await waitWithTimeout(crawlMechEngineering("url",1),1*60*1000);		if(!silentMode) console.log("mechEngineering loaded");
    const new_med = 		    await waitWithTimeout(crawlMed("url",1),1*60*1000);			        if(!silentMode) console.log("med loaded");
    const new_mediaComm = 	    await waitWithTimeout(crawlMediaComm("url",1),1*60*1000);			if(!silentMode) console.log("mediaComm loaded");
    const new_nursing = 	    await waitWithTimeout(crawlNursing("url",1),1*60*1000);			    if(!silentMode) console.log("nursing loaded");
    const new_pharm = 		    await waitWithTimeout(crawlPharm("url",1),1*60*1000);			    if(!silentMode) console.log("pharm loaded");
    const new_philosophy = 	    await waitWithTimeout(crawlPhilosophy("url",1),1*60*1000);			if(!silentMode) console.log("philosophy loaded");
    const new_physicalEd = 	    await waitWithTimeout(crawlPhysicalEd("url",1),1*60*1000);			if(!silentMode) console.log("physicalEd loaded");
    const new_physics = 	    await waitWithTimeout(crawlPhysics("url",1),1*60*1000);			    if(!silentMode) console.log("physics loaded");
    const new_polaris = 	    await waitWithTimeout(crawlPolaris("url",1),1*60*1000);			    if(!silentMode) console.log("polaris loaded");
    const new_politics = 	    await waitWithTimeout(crawlPolitics("url",1),1*60*1000);			if(!silentMode) console.log("politics loaded");
    const new_psychology = 	    await waitWithTimeout(crawlPsychology("url",1),1*60*1000);			if(!silentMode) console.log("psychology loaded");
    const new_publicService =   await waitWithTimeout(crawlPublicService("url",1),1*60*1000);		if(!silentMode) console.log("publicService loaded");
    const new_russian = 	    await waitWithTimeout(crawlRussian("url",1),1*60*1000);			    if(!silentMode) console.log("russian loaded");
    const new_socialWelfare =   await waitWithTimeout(crawlSocialWelfare("url",1),1*60*1000);		if(!silentMode) console.log("socialWelfare loaded");
    const new_sociology = 	    await waitWithTimeout(crawlSociology("url",1),1*60*1000);			if(!silentMode) console.log("sociology loaded");
    const new_software = 	    await waitWithTimeout(crawlSoftware("url",1),1*60*1000);			if(!silentMode) console.log("software loaded");
    const new_upreJob = 	    await waitWithTimeout(crawlupreJob("url",1),1*60*1000);			    if(!silentMode) console.log("upreJob loaded");
    const new_urbanEngineering = await waitWithTimeout(crawlUrbanEngineering("url",1),1*60*1000);	if(!silentMode) console.log("urbanEngineering loaded");
    const new_urbanPlanRealEstate = await waitWithTimeout(crawlUrbanPlanRealEstate("url",1),1*60*1000);	if(!silentMode) console.log("urbanPlanRealEstate loaded");

    console.timeEnd("** fully loaded 1 in ");
    if(!silentMode) console.log("\n");
    console.time("** fully loaded 2 in ");

    const sec_CAUnotice = 	    await waitWithTimeout(crawlCAUnotice("url",2),1*60*1000);			if(!silentMode) console.log("CAUnotice loaded");
    const sec_adpr = 		    await waitWithTimeout(crawladpr("url",2),1*60*1000);			    if(!silentMode) console.log("adpr loaded");
    const sec_ai = 			    await waitWithTimeout(crawlAi("url",2),1*60*1000);			        if(!silentMode) console.log("ai loaded");
    const sec_appliedStat =     await waitWithTimeout(crawlAppliedStat("url",2),1*60*1000);			if(!silentMode) console.log("appliedStat loaded");
    const sec_architecture =    await waitWithTimeout(crawlArchitecture("url",2),1*60*1000);		if(!silentMode) console.log("architecture loaded");
    const sec_business = 	    await waitWithTimeout(crawlBusiness("url",2),1*60*1000);			if(!silentMode) console.log("business loaded");
    const sec_chem = 		    await waitWithTimeout(crawlChem("url",2),1*60*1000);			    if(!silentMode) console.log("chem loaded");
    const sec_chemEngineering = await waitWithTimeout(crawlChemEngineering("url",2),1*60*1000);		if(!silentMode) console.log("chemEngineering loaded");
    const sec_chinese = 	    await waitWithTimeout(crawlChinese("url",2),1*60*1000);			    if(!silentMode) console.log("chinese loaded");
    const sec_civilEnvPlanEng = await waitWithTimeout(crawlCivilEnvPlanEng("url",2),1*60*1000);		if(!silentMode) console.log("civilEnvPlanEng loaded");
    const sec_davinci = 	    await waitWithTimeout(crawlDavinci("url",2),1*60*1000);			    if(!silentMode) console.log("davinci loaded");
    const sec_dorm = 		    await waitWithTimeout(crawlDorm("url",2),1*60*1000);			    if(!silentMode) console.log("dorm loaded");
    const sec_earlyChildhoodEd = await waitWithTimeout(crawlEarlyChildhoodEd("url",2),1*60*1000);	if(!silentMode) console.log("earlyChildhoodEd loaded");
    const sec_econ = 		    await waitWithTimeout(crawlEcon("url",2),1*60*1000);			    if(!silentMode) console.log("econ loaded");
    const sec_education = 	    await waitWithTimeout(crawlEducation("url",2),1*60*1000);			if(!silentMode) console.log("education loaded");
    const sec_elecEngineering = await waitWithTimeout(crawlElecEngineering("url",2),1*60*1000);		if(!silentMode) console.log("elecEngineering loaded");
    const sec_enerEngineering = await waitWithTimeout(crawlEnerEngineering("url",2),1*60*1000);		if(!silentMode) console.log("enerEngineering loaded");
    const sec_english = 	    await waitWithTimeout(crawlEnglish("url",2),1*60*1000);             if(!silentMode) console.log("english loaded");
    const sec_englishEd = 	    await waitWithTimeout(crawlEnglishEd("url",2),1*60*1000);			if(!silentMode) console.log("englishEd loaded");
    const sec_french = 	        await waitWithTimeout(crawlFrench("url",2),1*60*1000);			    if(!silentMode) console.log("french loaded");
    const sec_german = 		    await waitWithTimeout(crawlGerman("url",2),1*60*1000);			    if(!silentMode) console.log("german loaded");
    const sec_history = 	    await waitWithTimeout(crawlHistory("url",2),1*60*1000);			    if(!silentMode) console.log("history loaded");
    const sec_industSec = 	    await waitWithTimeout(crawlIndustSec("url",2),1*60*1000);			if(!silentMode) console.log("industSec loaded");
    const sec_integEngineering = await waitWithTimeout(crawlIntegEngineering("url",2),1*60*1000);	if(!silentMode) console.log("integEngineering loaded");
    const sec_japanese = 	    await waitWithTimeout(crawlJapanese("url",2),1*60*1000);			if(!silentMode) console.log("japanese loaded");
    const sec_korean = 		    await waitWithTimeout(crawlKorean("url",2),1*60*1000);			    if(!silentMode) console.log("korean loaded");
    const sec_libInfoScience = 	await waitWithTimeout(crawlLibInfoScience("url",2),1*60*1000);		if(!silentMode) console.log("libInfoScience loaded");
    const sec_lifeScience =     await waitWithTimeout(crawlLifeScience("url",2),1*60*1000);			if(!silentMode) console.log("lifeScience loaded");
    const sec_logistics = 	    await waitWithTimeout(crawlLogistics("url",2),1*60*1000);			if(!silentMode) console.log("logistics loaded");
    const sec_math = 		    await waitWithTimeout(crawlMath("url",2),1*60*1000);			    if(!silentMode) console.log("math loaded");
    const sec_mechEngineering = await waitWithTimeout(crawlMechEngineering("url",2),1*60*1000);		if(!silentMode) console.log("mechEngineering loaded");
    const sec_med = 		    await waitWithTimeout(crawlMed("url",2),1*60*1000);			        if(!silentMode) console.log("med loaded");
    const sec_mediaComm = 	    await waitWithTimeout(crawlMediaComm("url",2),1*60*1000);			if(!silentMode) console.log("mediaComm loaded");
    const sec_nursing = 	    await waitWithTimeout(crawlNursing("url",2),1*60*1000);			    if(!silentMode) console.log("nursing loaded");
    const sec_pharm = 		    await waitWithTimeout(crawlPharm("url",2),1*60*1000);			    if(!silentMode) console.log("pharm loaded");
    const sec_philosophy = 	    await waitWithTimeout(crawlPhilosophy("url",2),1*60*1000);			if(!silentMode) console.log("philosophy loaded");
    const sec_physicalEd = 	    await waitWithTimeout(crawlPhysicalEd("url",2),1*60*1000);			if(!silentMode) console.log("physicalEd loaded");
    const sec_physics = 	    await waitWithTimeout(crawlPhysics("url",2),1*60*1000);			    if(!silentMode) console.log("physics loaded");
    const sec_polaris = 	    await waitWithTimeout(crawlPolaris("url",2),1*60*1000);			    if(!silentMode) console.log("polaris loaded");
    const sec_politics = 	    await waitWithTimeout(crawlPolitics("url",2),1*60*1000);			if(!silentMode) console.log("politics loaded");
    const sec_psychology = 	    await waitWithTimeout(crawlPsychology("url",2),1*60*1000);			if(!silentMode) console.log("psychology loaded");
    const sec_publicService =   await waitWithTimeout(crawlPublicService("url",2),1*60*1000);		if(!silentMode) console.log("publicService loaded");
    const sec_russian = 	    await waitWithTimeout(crawlRussian("url",2),1*60*1000);			    if(!silentMode) console.log("russian loaded");
    const sec_socialWelfare =   await waitWithTimeout(crawlSocialWelfare("url",2),1*60*1000);		if(!silentMode) console.log("socialWelfare loaded");
    const sec_sociology = 	    await waitWithTimeout(crawlSociology("url",2),1*60*1000);			if(!silentMode) console.log("sociology loaded");
    const sec_software = 	    await waitWithTimeout(crawlSoftware("url",2),1*60*1000);			if(!silentMode) console.log("software loaded");
    const sec_upreJob = 	    await waitWithTimeout(crawlupreJob("url",2),1*60*1000);			    if(!silentMode) console.log("upreJob loaded");
    const sec_urbanEngineering = await waitWithTimeout(crawlUrbanEngineering("url",2),1*60*1000);	if(!silentMode) console.log("urbanEngineering loaded");
    const sec_urbanPlanRealEstate = await waitWithTimeout(crawlUrbanPlanRealEstate("url",2),1*60*1000);	if(!silentMode) console.log("urbanPlanRealEstate loaded");
    
    console.timeEnd("** fully loaded 2 in ");

    // ******************************************
    // *** 1.5. 1페이지와 2페이지의 통합본 생성 ***
    // ******************************************
    function combineTwoPages(newObject, secObject){
        console.log(newObject)
        console.log(secObject)
        const newLength = newObject.url.length;
        const secLength = secObject.url.length;
        let combLength = newLength+secLength;
        let res = {}; // call by reference 로 돼버릴까봐 res = newObject는 하지 않고, 일일이 대입해줌
        res.url = [];
        res.title = [];
        let count = newLength;
        let found = 0;

        for(let i=0;i<newLength;i++){
            res.url.push(newObject.url[i]);
            res.title.push(newObject.title[i]);
        } // newObject는 res로 전부 옮김

        for(let i=0;i<secLength;i++){
            for(let j=0;j<count;j++){
                if(secObject.url[i] == res.url[j]) {found = 1; break;}
            }
            if(found == 1) {found = 0;}
            else if(found == 0){
                res.url.push(secObject.url[i]);
                res.title.push(secObject.title[i]);
                count++;
            }
        } // res에 있는지 확인해보고 없으면 push함

        return res;
    }

    const comb_CAUnotice = combineTwoPages(new_CAUnotice, sec_CAUnotice);
    const comb_adpr = combineTwoPages(new_adpr, sec_adpr);
    const comb_ai = combineTwoPages(new_ai, sec_ai);
    const comb_appliedStat = combineTwoPages(new_appliedStat, sec_appliedStat);
    const comb_architecture = combineTwoPages(new_architecture, sec_architecture);
    const comb_business = combineTwoPages(new_business, sec_business);
    const comb_chem = combineTwoPages(new_chem, sec_chem);
    const comb_chemEngineering = combineTwoPages(new_chemEngineering, sec_chemEngineering);
    const comb_chinese = combineTwoPages(new_chinese, sec_chinese);
    const comb_civilEnvPlanEng = combineTwoPages(new_civilEnvPlanEng, sec_civilEnvPlanEng);
    const comb_davinci = combineTwoPages(new_davinci, sec_davinci);
    const comb_dorm = combineTwoPages(new_dorm, sec_dorm);
    const comb_earlyChildhoodEd = combineTwoPages(new_earlyChildhoodEd, sec_earlyChildhoodEd);
    const comb_econ = combineTwoPages(new_econ, sec_econ);
    const comb_education = combineTwoPages(new_education, sec_education);
    const comb_elecEngineering = combineTwoPages(new_elecEngineering, sec_elecEngineering);
    const comb_enerEngineering = combineTwoPages(new_enerEngineering, sec_enerEngineering);
    const comb_english = combineTwoPages(new_english, sec_english);
    const comb_englishEd = combineTwoPages(new_englishEd, sec_englishEd);
    const comb_french = combineTwoPages(new_french, sec_french);
    const comb_german = combineTwoPages(new_german, sec_german);
    const comb_history = combineTwoPages(new_history, sec_history);
    const comb_industSec = combineTwoPages(new_industSec, sec_industSec);
    const comb_integEngineering = combineTwoPages(new_integEngineering, sec_integEngineering);
    const comb_japanese = combineTwoPages(new_japanese, sec_japanese);
    const comb_korean = combineTwoPages(new_korean, sec_korean);
    const comb_libInfoScience = combineTwoPages(new_libInfoScience, sec_libInfoScience);
    const comb_lifeScience = combineTwoPages(new_lifeScience, sec_lifeScience);
    const comb_logistics = combineTwoPages(new_logistics, sec_logistics);
    const comb_math = combineTwoPages(new_math, sec_math);
    const comb_mechEngineering = combineTwoPages(new_mechEngineering, sec_mechEngineering);
    const comb_med = combineTwoPages(new_med, sec_med);
    const comb_mediaComm = combineTwoPages(new_mediaComm, sec_mediaComm);
    const comb_nursing = combineTwoPages(new_nursing, sec_nursing);
    const comb_pharm = combineTwoPages(new_pharm, sec_pharm);
    const comb_philosophy = combineTwoPages(new_philosophy, sec_philosophy);
    const comb_physicalEd = combineTwoPages(new_physicalEd, sec_physicalEd);
    const comb_physics = combineTwoPages(new_physics, sec_physics);
    const comb_polaris = combineTwoPages(new_polaris, sec_polaris);
    const comb_politics = combineTwoPages(new_politics, sec_politics);
    const comb_psychology = combineTwoPages(new_psychology, sec_psychology);
    const comb_publicService = combineTwoPages(new_publicService, sec_publicService);
    const comb_russian = combineTwoPages(new_russian, sec_russian);
    const comb_socialWelfare = combineTwoPages(new_socialWelfare, sec_socialWelfare);
    const comb_sociology = combineTwoPages(new_sociology, sec_sociology);
    const comb_software = combineTwoPages(new_software, sec_software);
    const comb_upreJob = combineTwoPages(new_upreJob, sec_upreJob);
    const comb_urbanEngineering = combineTwoPages(new_urbanEngineering, sec_urbanEngineering);
    const comb_urbanPlanRealEstate = combineTwoPages(new_urbanPlanRealEstate, sec_urbanPlanRealEstate);

    // *****************************************************************
    // *** 2. 기존 목록을 읽어 현재 데이터와 비교한 후, 변경 개수를 저장 ***
    // *****************************************************************
    let storeDifferences = [];
    
    function readFileAndCompareWithOriginal(majorName,dataObject){
        if(dataObject.error == "true") {console.log(`***** ${majorName} took too long *****`); return -1;} // 로딩이 너무 오래 걸렸던 게시판들
        if(dataObject.url == undefined) {console.log("dataObject is undefined for some reason"); return -1;}
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', `${majorName}.json`),"utf8")
        const oldContent = JSON.parse(rawData);
        // console.log(`${majorName}:`);
        // console.log(oldContent);
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
    storeDifferences.dorm =             readFileAndCompareWithOriginal("dorm", new_dorm);
    storeDifferences.upreJob =          readFileAndCompareWithOriginal("upreJob", new_upreJob);
    storeDifferences.davinci =          readFileAndCompareWithOriginal("davinci", new_davinci);
    storeDifferences.polaris =          readFileAndCompareWithOriginal("polaris", new_polaris);
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
                    if(duplicates.includes(j) == false) duplicates.push(j);
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
    addURLsAndTitlesToStorage("dorm", new_dorm, storeDifferences.dorm);
    addURLsAndTitlesToStorage("upreJob", new_upreJob, storeDifferences.upreJob);
    addURLsAndTitlesToStorage("davinci", new_davinci, storeDifferences.davinci);
    addURLsAndTitlesToStorage("polaris", new_polaris, storeDifferences.polaris);

    // ****************************************************
    // *** 3.75. updatedContentStorage 중 과거 공지 삭제 ***
    // ****************************************************
    function compareWithCombinedList(newObject, combObject){ // new에는 updatedContentStorage가, comb 에는 통합본 목록이 들어감
        const newLen = newObject.url.length;
        const combLen = combObject.url.length;
        for(let i=newLen-1;i>=0;i--){
            for(let j=combLen-1;j>=0;j--){
                if(newObject.url[i].localeCompare(combObject.url[j]) == 0){
                    // console.log(newObject.url[i])
                    // console.log(newObject)
                    // console.log(newObject.url[i])
                    // console.log(combObject.url[j])
                    // console.log(`i:${i}, j:${j}`);
                    console.log(`deleted old notice ${newObject.url[i]}`);
                    newObject.url.splice(i,1);
                    newObject.title.splice(i,1);
                    break;
                }
            }
        }
        return newObject; // 중복 전부 제거한 상태
    }
    // 업데이트 내용이 있었으면? -> 통합본과 비교 -> 중복부분 삭제 -> 빈 객체면 0처리
    if (updatedContentStorage.CAUnotice != undefined && updatedContentStorage.CAUnotice.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'CAUnotice.json'), "utf8");
        const DB_CAUnotice = JSON.parse(rawData);
        updatedContentStorage.CAUnotice = compareWithCombinedList(updatedContentStorage.CAUnotice, DB_CAUnotice);
        if (updatedContentStorage.CAUnotice.url.length == 0) delete updatedContentStorage.CAUnotice;
    }
    if (updatedContentStorage.adpr != undefined && updatedContentStorage.adpr.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'adpr.json'), "utf8");
        const DB_adpr = JSON.parse(rawData);
        updatedContentStorage.adpr = compareWithCombinedList(updatedContentStorage.adpr, DB_adpr);
        if (updatedContentStorage.adpr.url.length == 0) delete updatedContentStorage.adpr;
    }
    if (updatedContentStorage.ai != undefined && updatedContentStorage.ai.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'ai.json'), "utf8");
        const DB_ai = JSON.parse(rawData);
        updatedContentStorage.ai = compareWithCombinedList(updatedContentStorage.ai, DB_ai);
        if (updatedContentStorage.ai.url.length == 0) delete updatedContentStorage.ai;
    }
    if (updatedContentStorage.appliedStat != undefined && updatedContentStorage.appliedStat.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'appliedStat.json'), "utf8");
        const DB_appliedStat = JSON.parse(rawData);
        updatedContentStorage.appliedStat = compareWithCombinedList(updatedContentStorage.appliedStat, DB_appliedStat);
        if (updatedContentStorage.appliedStat.url.length == 0) delete updatedContentStorage.appliedStat;
    }
    if (updatedContentStorage.architecture != undefined && updatedContentStorage.architecture.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'architecture.json'), "utf8");
        const DB_architecture = JSON.parse(rawData);
        updatedContentStorage.architecture = compareWithCombinedList(updatedContentStorage.architecture, DB_architecture);
        if (updatedContentStorage.architecture.url.length == 0) delete updatedContentStorage.architecture;
    }
    if (updatedContentStorage.business != undefined && updatedContentStorage.business.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'business.json'), "utf8");
        const DB_business = JSON.parse(rawData);
        updatedContentStorage.business = compareWithCombinedList(updatedContentStorage.business, DB_business);
        if (updatedContentStorage.business.url.length == 0) delete updatedContentStorage.business;
    }
    if (updatedContentStorage.chem != undefined && updatedContentStorage.chem.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'chem.json'), "utf8");
        const DB_chem = JSON.parse(rawData);
        updatedContentStorage.chem = compareWithCombinedList(updatedContentStorage.chem, DB_chem);
        if (updatedContentStorage.chem.url.length == 0) delete updatedContentStorage.chem;
    }
    if (updatedContentStorage.chemEngineering != undefined && updatedContentStorage.chemEngineering.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'chemEngineering.json'), "utf8");
        const DB_chemEngineering = JSON.parse(rawData);
        updatedContentStorage.chemEngineering = compareWithCombinedList(updatedContentStorage.chemEngineering, DB_chemEngineering);
        if (updatedContentStorage.chemEngineering.url.length == 0) delete updatedContentStorage.chemEngineering;
    }
    if (updatedContentStorage.chinese != undefined && updatedContentStorage.chinese.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'chinese.json'), "utf8");
        const DB_chinese = JSON.parse(rawData);
        updatedContentStorage.chinese = compareWithCombinedList(updatedContentStorage.chinese, DB_chinese);
        if (updatedContentStorage.chinese.url.length == 0) delete updatedContentStorage.chinese;
    }
    if (updatedContentStorage.civilEnvPlanEng != undefined && updatedContentStorage.civilEnvPlanEng.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'civilEnvPlanEng.json'), "utf8");
        const DB_civilEnvPlanEng = JSON.parse(rawData);
        updatedContentStorage.civilEnvPlanEng = compareWithCombinedList(updatedContentStorage.civilEnvPlanEng, DB_civilEnvPlanEng);
        if (updatedContentStorage.civilEnvPlanEng.url.length == 0) delete updatedContentStorage.civilEnvPlanEng;
    }
    if (updatedContentStorage.davinci != undefined && updatedContentStorage.davinci.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'davinci.json'), "utf8");
        const DB_davinci = JSON.parse(rawData);
        updatedContentStorage.davinci = compareWithCombinedList(updatedContentStorage.davinci, DB_davinci);
        if (updatedContentStorage.davinci.url.length == 0) delete updatedContentStorage.davinci;
    }
    if (updatedContentStorage.dorm != undefined && updatedContentStorage.dorm.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'dorm.json'), "utf8");
        const DB_dorm = JSON.parse(rawData);
        updatedContentStorage.dorm = compareWithCombinedList(updatedContentStorage.dorm, DB_dorm);
        if (updatedContentStorage.dorm.url.length == 0) delete updatedContentStorage.dorm;
    }
    if (updatedContentStorage.earlyChildhoodEd != undefined && updatedContentStorage.earlyChildhoodEd.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'earlyChildhoodEd.json'), "utf8");
        const DB_earlyChildhoodEd = JSON.parse(rawData);
        updatedContentStorage.earlyChildhoodEd = compareWithCombinedList(updatedContentStorage.earlyChildhoodEd, DB_earlyChildhoodEd);
        if (updatedContentStorage.earlyChildhoodEd.url.length == 0) delete updatedContentStorage.earlyChildhoodEd;
    }
    if (updatedContentStorage.econ != undefined && updatedContentStorage.econ.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'econ.json'), "utf8");
        const DB_econ = JSON.parse(rawData);
        updatedContentStorage.econ = compareWithCombinedList(updatedContentStorage.econ, DB_econ);
        if (updatedContentStorage.econ.url.length == 0) delete updatedContentStorage.econ;
    }
    if (updatedContentStorage.education != undefined && updatedContentStorage.education.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'education.json'), "utf8");
        const DB_education = JSON.parse(rawData);
        updatedContentStorage.education = compareWithCombinedList(updatedContentStorage.education, DB_education);
        if (updatedContentStorage.education.url.length == 0) delete updatedContentStorage.education;
    }
    if (updatedContentStorage.elecEngineering != undefined && updatedContentStorage.elecEngineering.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'elecEngineering.json'), "utf8");
        const DB_elecEngineering = JSON.parse(rawData);
        updatedContentStorage.elecEngineering = compareWithCombinedList(updatedContentStorage.elecEngineering, DB_elecEngineering);
        if (updatedContentStorage.elecEngineering.url.length == 0) delete updatedContentStorage.elecEngineering;
    }
    if (updatedContentStorage.enerEngineering != undefined && updatedContentStorage.enerEngineering.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'enerEngineering.json'), "utf8");
        const DB_enerEngineering = JSON.parse(rawData);
        updatedContentStorage.enerEngineering = compareWithCombinedList(updatedContentStorage.enerEngineering, DB_enerEngineering);
        if (updatedContentStorage.enerEngineering.url.length == 0) delete updatedContentStorage.enerEngineering;
    }
    if (updatedContentStorage.english != undefined && updatedContentStorage.english.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'english.json'), "utf8");
        const DB_english = JSON.parse(rawData);
        updatedContentStorage.english = compareWithCombinedList(updatedContentStorage.english, DB_english);
        if (updatedContentStorage.english.url.length == 0) delete updatedContentStorage.english;
    }
    if (updatedContentStorage.englishEd != undefined && updatedContentStorage.englishEd.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'englishEd.json'), "utf8");
        const DB_englishEd = JSON.parse(rawData);
        updatedContentStorage.englishEd = compareWithCombinedList(updatedContentStorage.englishEd, DB_englishEd);
        if (updatedContentStorage.englishEd.url.length == 0) delete updatedContentStorage.englishEd;
    }
    if (updatedContentStorage.french != undefined && updatedContentStorage.french.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'french.json'), "utf8");
        const DB_french = JSON.parse(rawData);
        updatedContentStorage.french = compareWithCombinedList(updatedContentStorage.french, DB_french);
        if (updatedContentStorage.french.url.length == 0) delete updatedContentStorage.french;
    }
    if (updatedContentStorage.german != undefined && updatedContentStorage.german.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'german.json'), "utf8");
        const DB_german = JSON.parse(rawData);
        updatedContentStorage.german = compareWithCombinedList(updatedContentStorage.german, DB_german);
        if (updatedContentStorage.german.url.length == 0) delete updatedContentStorage.german;
    }
    if (updatedContentStorage.history != undefined && updatedContentStorage.history.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'history.json'), "utf8");
        const DB_history = JSON.parse(rawData);
        updatedContentStorage.history = compareWithCombinedList(updatedContentStorage.history, DB_history);
        if (updatedContentStorage.history.url.length == 0) delete updatedContentStorage.history;
    }
    if (updatedContentStorage.industSec != undefined && updatedContentStorage.industSec.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'industSec.json'), "utf8");
        const DB_industSec = JSON.parse(rawData);
        updatedContentStorage.industSec = compareWithCombinedList(updatedContentStorage.industSec, DB_industSec);
        if (updatedContentStorage.industSec.url.length == 0) delete updatedContentStorage.industSec;
    }
    if (updatedContentStorage.integEngineering != undefined && updatedContentStorage.integEngineering.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'integEngineering.json'), "utf8");
        const DB_integEngineering = JSON.parse(rawData);
        updatedContentStorage.integEngineering = compareWithCombinedList(updatedContentStorage.integEngineering, DB_integEngineering);
        if (updatedContentStorage.integEngineering.url.length == 0) delete updatedContentStorage.integEngineering;
    }
    if (updatedContentStorage.japanese != undefined && updatedContentStorage.japanese.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'japanese.json'), "utf8");
        const DB_japanese = JSON.parse(rawData);
        updatedContentStorage.japanese = compareWithCombinedList(updatedContentStorage.japanese, DB_japanese);
        if (updatedContentStorage.japanese.url.length == 0) delete updatedContentStorage.japanese;
    }
    if (updatedContentStorage.korean != undefined && updatedContentStorage.korean.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'korean.json'), "utf8");
        const DB_korean = JSON.parse(rawData);
        updatedContentStorage.korean = compareWithCombinedList(updatedContentStorage.korean, DB_korean);
        if (updatedContentStorage.korean.url.length == 0) delete updatedContentStorage.korean;
    }
    if (updatedContentStorage.libInfoScience != undefined && updatedContentStorage.libInfoScience.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'libInfoScience.json'), "utf8");
        const DB_libInfoScience = JSON.parse(rawData);
        updatedContentStorage.libInfoScience = compareWithCombinedList(updatedContentStorage.libInfoScience, DB_libInfoScience);
        if (updatedContentStorage.libInfoScience.url.length == 0) delete updatedContentStorage.libInfoScience;
    }
    if (updatedContentStorage.lifeScience != undefined && updatedContentStorage.lifeScience.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'lifeScience.json'), "utf8");
        const DB_lifeScience = JSON.parse(rawData);
        updatedContentStorage.lifeScience = compareWithCombinedList(updatedContentStorage.lifeScience, DB_lifeScience);
        if (updatedContentStorage.lifeScience.url.length == 0) delete updatedContentStorage.lifeScience;
    }
    if (updatedContentStorage.logistics != undefined && updatedContentStorage.logistics.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'logistics.json'), "utf8");
        const DB_logistics = JSON.parse(rawData);
        updatedContentStorage.logistics = compareWithCombinedList(updatedContentStorage.logistics, DB_logistics);
        if (updatedContentStorage.logistics.url.length == 0) delete updatedContentStorage.logistics;
    }
    if (updatedContentStorage.math != undefined && updatedContentStorage.math.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'math.json'), "utf8");
        const DB_math = JSON.parse(rawData);
        updatedContentStorage.math = compareWithCombinedList(updatedContentStorage.math, DB_math);
        if (updatedContentStorage.math.url.length == 0) delete updatedContentStorage.math;
    }
    if (updatedContentStorage.mechEngineering != undefined && updatedContentStorage.mechEngineering.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'mechEngineering.json'), "utf8");
        const DB_mechEngineering = JSON.parse(rawData);
        updatedContentStorage.mechEngineering = compareWithCombinedList(updatedContentStorage.mechEngineering, DB_mechEngineering);
        if (updatedContentStorage.mechEngineering.url.length == 0) delete updatedContentStorage.mechEngineering;
    }
    if (updatedContentStorage.med != undefined && updatedContentStorage.med.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'med.json'), "utf8");
        const DB_med = JSON.parse(rawData);
        updatedContentStorage.med = compareWithCombinedList(updatedContentStorage.med, DB_med);
        if (updatedContentStorage.med.url.length == 0) delete updatedContentStorage.med;
    }
    if (updatedContentStorage.mediaComm != undefined && updatedContentStorage.mediaComm.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'mediaComm.json'), "utf8");
        const DB_mediaComm = JSON.parse(rawData);
        updatedContentStorage.mediaComm = compareWithCombinedList(updatedContentStorage.mediaComm, DB_mediaComm);
        if (updatedContentStorage.mediaComm.url.length == 0) delete updatedContentStorage.mediaComm;
    }
    if (updatedContentStorage.nursing != undefined && updatedContentStorage.nursing.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'nursing.json'), "utf8");
        const DB_nursing = JSON.parse(rawData);
        updatedContentStorage.nursing = compareWithCombinedList(updatedContentStorage.nursing, DB_nursing);
        if (updatedContentStorage.nursing.url.length == 0) delete updatedContentStorage.nursing;
    }
    if (updatedContentStorage.pharm != undefined && updatedContentStorage.pharm.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'pharm.json'), "utf8");
        const DB_pharm = JSON.parse(rawData);
        updatedContentStorage.pharm = compareWithCombinedList(updatedContentStorage.pharm, DB_pharm);
        if (updatedContentStorage.pharm.url.length == 0) delete updatedContentStorage.pharm;
    }
    if (updatedContentStorage.philosophy != undefined && updatedContentStorage.philosophy.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'philosophy.json'), "utf8");
        const DB_philosophy = JSON.parse(rawData);
        updatedContentStorage.philosophy = compareWithCombinedList(updatedContentStorage.philosophy, DB_philosophy);
        if (updatedContentStorage.philosophy.url.length == 0) delete updatedContentStorage.philosophy;
    }
    if (updatedContentStorage.physicalEd != undefined && updatedContentStorage.physicalEd.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'physicalEd.json'), "utf8");
        const DB_physicalEd = JSON.parse(rawData);
        updatedContentStorage.physicalEd = compareWithCombinedList(updatedContentStorage.physicalEd, DB_physicalEd);
        if (updatedContentStorage.physicalEd.url.length == 0) delete updatedContentStorage.physicalEd;
    }
    if (updatedContentStorage.physics != undefined && updatedContentStorage.physics.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'physics.json'), "utf8");
        const DB_physics = JSON.parse(rawData);
        updatedContentStorage.physics = compareWithCombinedList(updatedContentStorage.physics, DB_physics);
        if (updatedContentStorage.physics.url.length == 0) delete updatedContentStorage.physics;
    }
    if (updatedContentStorage.polaris != undefined && updatedContentStorage.polaris.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'polaris.json'), "utf8");
        const DB_polaris = JSON.parse(rawData);
        updatedContentStorage.polaris = compareWithCombinedList(updatedContentStorage.polaris, DB_polaris);
        if (updatedContentStorage.polaris.url.length == 0) delete updatedContentStorage.polaris;
    }
    if (updatedContentStorage.politics != undefined && updatedContentStorage.politics.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'politics.json'), "utf8");
        const DB_politics = JSON.parse(rawData);
        updatedContentStorage.politics = compareWithCombinedList(updatedContentStorage.politics, DB_politics);
        if (updatedContentStorage.politics.url.length == 0) delete updatedContentStorage.politics;
    }
    if (updatedContentStorage.psychology != undefined && updatedContentStorage.psychology.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'psychology.json'), "utf8");
        const DB_psychology = JSON.parse(rawData);
        updatedContentStorage.psychology = compareWithCombinedList(updatedContentStorage.psychology, DB_psychology);
        if (updatedContentStorage.psychology.url.length == 0) delete updatedContentStorage.psychology;
    }
    if (updatedContentStorage.publicService != undefined && updatedContentStorage.publicService.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'publicService.json'), "utf8");
        const DB_publicService = JSON.parse(rawData);
        updatedContentStorage.publicService = compareWithCombinedList(updatedContentStorage.publicService, DB_publicService);
        if (updatedContentStorage.publicService.url.length == 0) delete updatedContentStorage.publicService;
    }
    if (updatedContentStorage.russian != undefined && updatedContentStorage.russian.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'russian.json'), "utf8");
        const DB_russian = JSON.parse(rawData);
        updatedContentStorage.russian = compareWithCombinedList(updatedContentStorage.russian, DB_russian);
        if (updatedContentStorage.russian.url.length == 0) delete updatedContentStorage.russian;
    }
    if (updatedContentStorage.socialWelfare != undefined && updatedContentStorage.socialWelfare.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'socialWelfare.json'), "utf8");
        const DB_socialWelfare = JSON.parse(rawData);
        updatedContentStorage.socialWelfare = compareWithCombinedList(updatedContentStorage.socialWelfare, DB_socialWelfare);
        if (updatedContentStorage.socialWelfare.url.length == 0) delete updatedContentStorage.socialWelfare;
    }
    if (updatedContentStorage.sociology != undefined && updatedContentStorage.sociology.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'sociology.json'), "utf8");
        const DB_sociology = JSON.parse(rawData);
        updatedContentStorage.sociology = compareWithCombinedList(updatedContentStorage.sociology, DB_sociology);
        if (updatedContentStorage.sociology.url.length == 0) delete updatedContentStorage.sociology;
    }
    if (updatedContentStorage.software != undefined && updatedContentStorage.software.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'software.json'), "utf8");
        const DB_software = JSON.parse(rawData);
        updatedContentStorage.software = compareWithCombinedList(updatedContentStorage.software, DB_software);
        if (updatedContentStorage.software.url.length == 0) delete updatedContentStorage.software;
    }
    if (updatedContentStorage.upreJob != undefined && updatedContentStorage.upreJob.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'upreJob.json'), "utf8");
        const DB_upreJob = JSON.parse(rawData);
        updatedContentStorage.upreJob = compareWithCombinedList(updatedContentStorage.upreJob, DB_upreJob);
        if (updatedContentStorage.upreJob.url.length == 0) delete updatedContentStorage.upreJob;
    }
    if (updatedContentStorage.urbanEngineering != undefined && updatedContentStorage.urbanEngineering.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'urbanEngineering.json'), "utf8");
        const DB_urbanEngineering = JSON.parse(rawData);
        updatedContentStorage.urbanEngineering = compareWithCombinedList(updatedContentStorage.urbanEngineering, DB_urbanEngineering);
        if (updatedContentStorage.urbanEngineering.url.length == 0) delete updatedContentStorage.urbanEngineering;
    }
    if (updatedContentStorage.urbanPlanRealEstate != undefined && updatedContentStorage.urbanPlanRealEstate.url.length > 0) {
        const rawData = fs.readFileSync(path.join(__dirname, 'compare_list', 'urbanPlanRealEstate.json'), "utf8");
        const DB_urbanPlanRealEstate = JSON.parse(rawData);
        updatedContentStorage.urbanPlanRealEstate = compareWithCombinedList(updatedContentStorage.urbanPlanRealEstate, DB_urbanPlanRealEstate);
        if (updatedContentStorage.urbanPlanRealEstate.url.length == 0) delete updatedContentStorage.urbanPlanRealEstate;
    }    

    if(Object.keys(updatedContentStorage).length == 0){ // 길이가 0인 경우 뿐만 아니라 빈 객체인 경우도 고려해야
        console.log("*** No Updates!\n");
        return; // 바뀐 내용이 없으면 조기 리턴하여 연산량을 줄임
    }
    else{
        console.log("*** Updates on the way!\n");
        console.log(updatedContentStorage);
    }
    
    
    // ********************************************************************
    // *** 4. 각 유저의 구독정보 확인 후 해당되는 게시글을 추가해 메일 전송 ***
    // ********************************************************************
    
    // 메일에서 받는 게시판의 순서를 바꾸려면 여기서 바꾸면 됨
    let dataToSend = [];
    let listOfSuccessfulRecipients = [];
    let sendOrNot = 0;
    let timeIsDone = "false";
    const userDataBase = JSON.parse(fs.readFileSync("./userDB_log/userDB.json","utf8"),"utf8");
    for(let i=0;i<nextIdNum;i++){
        if(userDataBase[i].subStatus == "false") continue;
        // console.log(userDataBase[i]);
        // 전체
        if(userDataBase[i].CAUnotice == "true" && updatedContentStorage.CAUnotice != undefined) {dataToSend.push(updatedContentStorage.CAUnotice); sendOrNot++;}
        if(userDataBase[i].davinci == "true" && updatedContentStorage.davinci != undefined) {dataToSend.push(updatedContentStorage.davinci); sendOrNot++;}
        if(userDataBase[i].dorm == "true" && updatedContentStorage.dorm != undefined) {dataToSend.push(updatedContentStorage.dorm); sendOrNot++;}
        // 경경
        if(userDataBase[i].business == "true" && updatedContentStorage.business != undefined) {dataToSend.push(updatedContentStorage.business); sendOrNot++;}
        if(userDataBase[i].appliedStat == "true" && updatedContentStorage.appliedStat != undefined) {dataToSend.push(updatedContentStorage.appliedStat); sendOrNot++;}
        if(userDataBase[i].adpr == "true" && updatedContentStorage.adpr != undefined) {dataToSend.push(updatedContentStorage.adpr); sendOrNot++;}
        if(userDataBase[i].industSec == "true" && updatedContentStorage.industSec != undefined) {dataToSend.push(updatedContentStorage.industSec); sendOrNot++;}
        if(userDataBase[i].logistics == "true" && updatedContentStorage.logistics != undefined) {dataToSend.push(updatedContentStorage.logistics); sendOrNot++;}
        if(userDataBase[i].econ == "true" && updatedContentStorage.econ != undefined) {dataToSend.push(updatedContentStorage.econ); sendOrNot++;}
        // 사과
        if(userDataBase[i].mediaComm == "true" && updatedContentStorage.mediaComm != undefined) {dataToSend.push(updatedContentStorage.mediaComm); sendOrNot++;}
        if(userDataBase[i].psychology == "true" && updatedContentStorage.psychology != undefined) {dataToSend.push(updatedContentStorage.psychology); sendOrNot++;}
        if(userDataBase[i].libInfoScience == "true" && updatedContentStorage.libInfoScience != undefined) {dataToSend.push(updatedContentStorage.libInfoScience); sendOrNot++;}
        if(userDataBase[i].socialWelfare == "true" && updatedContentStorage.socialWelfare != undefined) {dataToSend.push(updatedContentStorage.socialWelfare); sendOrNot++;}
        if(userDataBase[i].publicService == "true" && updatedContentStorage.publicService != undefined) {dataToSend.push(updatedContentStorage.publicService); sendOrNot++;}
        if(userDataBase[i].urbanPlanRealEstate == "true" && updatedContentStorage.urbanPlanRealEstate != undefined) {dataToSend.push(updatedContentStorage.urbanPlanRealEstate); sendOrNot++;}
        if(userDataBase[i].politics == "true" && updatedContentStorage.politics != undefined) {dataToSend.push(updatedContentStorage.politics); sendOrNot++;}
        if(userDataBase[i].sociology == "true" && updatedContentStorage.sociology != undefined) {dataToSend.push(updatedContentStorage.sociology); sendOrNot++;}
        // 인문
        if(userDataBase[i].english == "true" && updatedContentStorage.english != undefined) {dataToSend.push(updatedContentStorage.english); sendOrNot++;}
        if(userDataBase[i].korean == "true" && updatedContentStorage.korean != undefined) {dataToSend.push(updatedContentStorage.korean); sendOrNot++;}
        if(userDataBase[i].japanese == "true" && updatedContentStorage.japanese != undefined) {dataToSend.push(updatedContentStorage.japanese); sendOrNot++;}
        if(userDataBase[i].chinese == "true" && updatedContentStorage.chinese != undefined) {dataToSend.push(updatedContentStorage.chinese); sendOrNot++;}
        if(userDataBase[i].russian == "true" && updatedContentStorage.russian != undefined) {dataToSend.push(updatedContentStorage.russian); sendOrNot++;}
        if(userDataBase[i].french == "true" && updatedContentStorage.french != undefined) {dataToSend.push(updatedContentStorage.french); sendOrNot++;}
        if(userDataBase[i].german == "true" && updatedContentStorage.german != undefined) {dataToSend.push(updatedContentStorage.german); sendOrNot++;}
        if(userDataBase[i].philosophy == "true" && updatedContentStorage.philosophy != undefined) {dataToSend.push(updatedContentStorage.philosophy); sendOrNot++;}
        if(userDataBase[i].history == "true" && updatedContentStorage.history != undefined) {dataToSend.push(updatedContentStorage.history); sendOrNot++;}
        // 창아공
        if(userDataBase[i].elecEngineering == "true" && updatedContentStorage.elecEngineering != undefined) {dataToSend.push(updatedContentStorage.elecEngineering); sendOrNot++;}
        if(userDataBase[i].integEngineering == "true" && updatedContentStorage.integEngineering != undefined) {dataToSend.push(updatedContentStorage.integEngineering); sendOrNot++;}
        if(userDataBase[i].polaris == "true" && updatedContentStorage.polaris != undefined) {dataToSend.push(updatedContentStorage.polaris); sendOrNot++;}
        // 공과
        if(userDataBase[i].mechEngineering == "true" && updatedContentStorage.mechEngineering != undefined) {dataToSend.push(updatedContentStorage.mechEngineering); sendOrNot++;}
        if(userDataBase[i].enerEngineering == "true" && updatedContentStorage.enerEngineering != undefined) {dataToSend.push(updatedContentStorage.enerEngineering); sendOrNot++;}
        if(userDataBase[i].chemEngineering == "true" && updatedContentStorage.chemEngineering != undefined) {dataToSend.push(updatedContentStorage.chemEngineering); sendOrNot++;}
        if(userDataBase[i].civilEnvPlanEng == "true" && updatedContentStorage.civilEnvPlanEng != undefined) {dataToSend.push(updatedContentStorage.civilEnvPlanEng); sendOrNot++;}
        if(userDataBase[i].urbanEngineering == "true" && updatedContentStorage.urbanEngineering != undefined) {dataToSend.push(updatedContentStorage.urbanEngineering); sendOrNot++;}
        if(userDataBase[i].architecture == "true" && updatedContentStorage.architecture != undefined) {dataToSend.push(updatedContentStorage.architecture); sendOrNot++;}
        // 솦
        if(userDataBase[i].software == "true" && updatedContentStorage.software != undefined) {dataToSend.push(updatedContentStorage.software); sendOrNot++;}
        if(userDataBase[i].ai == "true" && updatedContentStorage.ai != undefined) {dataToSend.push(updatedContentStorage.ai); sendOrNot++;}
        // 자연
        if(userDataBase[i].math == "true" && updatedContentStorage.math != undefined) {dataToSend.push(updatedContentStorage.math); sendOrNot++;}
        if(userDataBase[i].physics == "true" && updatedContentStorage.physics != undefined) {dataToSend.push(updatedContentStorage.physics); sendOrNot++;}
        if(userDataBase[i].chem == "true" && updatedContentStorage.chem != undefined) {dataToSend.push(updatedContentStorage.chem); sendOrNot++;}
        if(userDataBase[i].lifeScience == "true" && updatedContentStorage.lifeScience != undefined) {dataToSend.push(updatedContentStorage.lifeScience); sendOrNot++;}
        // 교육
        if(userDataBase[i].education == "true" && updatedContentStorage.education != undefined) {dataToSend.push(updatedContentStorage.education); sendOrNot++;}
        if(userDataBase[i].physicalEd == "true" && updatedContentStorage.physicalEd != undefined) {dataToSend.push(updatedContentStorage.physicalEd); sendOrNot++;}
        if(userDataBase[i].englishEd == "true" && updatedContentStorage.englishEd != undefined) {dataToSend.push(updatedContentStorage.englishEd); sendOrNot++;}
        if(userDataBase[i].earlyChildhoodEd == "true" && updatedContentStorage.earlyChildhoodEd != undefined) {dataToSend.push(updatedContentStorage.earlyChildhoodEd); sendOrNot++;}
        // 의약간
        if(userDataBase[i].med == "true" && updatedContentStorage.med != undefined) {dataToSend.push(updatedContentStorage.med); sendOrNot++;}
        if(userDataBase[i].pharm == "true" && updatedContentStorage.pharm != undefined) {dataToSend.push(updatedContentStorage.pharm); sendOrNot++;}
        if(userDataBase[i].nursing == "true" && updatedContentStorage.nursing != undefined) {dataToSend.push(updatedContentStorage.nursing); sendOrNot++;}
        
        if(userDataBase[i].upreJob == "true" && updatedContentStorage.upreJob != undefined) {dataToSend.push(updatedContentStorage.upreJob); sendOrNot++;}


        if(sendOrNot != 0){
            mailHandler(userDataBase[i].name, userDataBase[i].email, dataToSend, i, "false");
            // recipientName, recipientEmail, data, id, IsItSubMail

            // console.log(dataToSend);
            listOfSuccessfulRecipients.push(JSON.stringify(userDataBase[i].email));
            sendOrNot = 0;
            dataToSend = [];
            await new Promise(resolve => setTimeout(resolve, 80)); // AWS SES 최대 전송속도는 초당 14개이므로 71ms당 한 개임. 네트워크 오차로 더 빠르게 보내질 수도 있으므로 안전하게 80ms당 하나 보냄
        }
    }
    console.log("Successfully sent to:");
    console.log(listOfSuccessfulRecipients);
    // try {
    //     sendEmail("na_sanghyun@naver.com",`<p>${JSON.stringify(updatedContentStorage, null, 4)}<br><br>${JSON.stringify(listOfSuccessfulRecipients,null,4)}</p>`,"New mail sent");
    // } catch (error) {
    //     console.log("error sending email to admin");
    // }
    
    // ********************************************
    // *** 5. 변경 사항이 있었던 게시판들은 초기화 ***
    // ********************************************
    if (storeDifferences.CAUnotice.length != 0) {
        let CAUnoticeObject = {
            url: comb_CAUnotice.url,
            title: comb_CAUnotice.title
        };
        fs.writeFile("./compare_list/CAUnotice.json", JSON.stringify(CAUnoticeObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("CAUnotice updated"); }
        });
    }
    if (storeDifferences.adpr.length != 0) {
        let adprObject = {
            url: comb_adpr.url,
            title: comb_adpr.title
        };
        fs.writeFile("./compare_list/adpr.json", JSON.stringify(adprObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("adpr updated"); }
        });
    }
    if (storeDifferences.ai.length != 0) {
        let aiObject = {
            url: comb_ai.url,
            title: comb_ai.title
        };
        fs.writeFile("./compare_list/ai.json", JSON.stringify(aiObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("ai updated"); }
        });
    }
    if (storeDifferences.appliedStat.length != 0) {
        let appliedStatObject = {
            url: comb_appliedStat.url,
            title: comb_appliedStat.title
        };
        fs.writeFile("./compare_list/appliedStat.json", JSON.stringify(appliedStatObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("appliedStat updated"); }
        });
    }
    if (storeDifferences.architecture.length != 0) {
        let architectureObject = {
            url: comb_architecture.url,
            title: comb_architecture.title
        };
        fs.writeFile("./compare_list/architecture.json", JSON.stringify(architectureObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("architecture updated"); }
        });
    }
    if (storeDifferences.business.length != 0) {
        let businessObject = {
            url: comb_business.url,
            title: comb_business.title
        };
        fs.writeFile("./compare_list/business.json", JSON.stringify(businessObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("business updated"); }
        });
    }
    if (storeDifferences.chem.length != 0) {
        let chemObject = {
            url: comb_chem.url,
            title: comb_chem.title
        };
        fs.writeFile("./compare_list/chem.json", JSON.stringify(chemObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("chem updated"); }
        });
    }
    if (storeDifferences.chemEngineering.length != 0) {
        let chemEngineeringObject = {
            url: comb_chemEngineering.url,
            title: comb_chemEngineering.title
        };
        fs.writeFile("./compare_list/chemEngineering.json", JSON.stringify(chemEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("chemEngineering updated"); }
        });
    }
    if (storeDifferences.chinese.length != 0) {
        let chineseObject = {
            url: comb_chinese.url,
            title: comb_chinese.title
        };
        fs.writeFile("./compare_list/chinese.json", JSON.stringify(chineseObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("chinese updated"); }
        });
    }
    if (storeDifferences.civilEnvPlanEng.length != 0) {
        let civilEnvPlanEngObject = {
            url: comb_civilEnvPlanEng.url,
            title: comb_civilEnvPlanEng.title
        };
        fs.writeFile("./compare_list/civilEnvPlanEng.json", JSON.stringify(civilEnvPlanEngObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("civilEnvPlanEng updated"); }
        });
    }
    if (storeDifferences.davinci.length != 0) {
        let davinciObject = {
            url: comb_davinci.url,
            title: comb_davinci.title
        };
        fs.writeFile("./compare_list/davinci.json", JSON.stringify(davinciObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("davinci updated"); }
        });
    }
    if (storeDifferences.dorm.length != 0) {
        let dormObject = {
            url: comb_dorm.url,
            title: comb_dorm.title
        };
        fs.writeFile("./compare_list/dorm.json", JSON.stringify(dormObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("dorm updated"); }
        });
    }
    if (storeDifferences.earlyChildhoodEd.length != 0) {
        let earlyChildhoodEdObject = {
            url: comb_earlyChildhoodEd.url,
            title: comb_earlyChildhoodEd.title
        };
        fs.writeFile("./compare_list/earlyChildhoodEd.json", JSON.stringify(earlyChildhoodEdObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("earlyChildhoodEd updated"); }
        });
    }
    if (storeDifferences.econ.length != 0) {
        let econObject = {
            url: comb_econ.url,
            title: comb_econ.title
        };
        fs.writeFile("./compare_list/econ.json", JSON.stringify(econObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("econ updated"); }
        });
    }
    if (storeDifferences.education.length != 0) {
        let educationObject = {
            url: comb_education.url,
            title: comb_education.title
        };
        fs.writeFile("./compare_list/education.json", JSON.stringify(educationObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("education updated"); }
        });
    }
    if (storeDifferences.elecEngineering.length != 0) {
        let elecEngineeringObject = {
            url: comb_elecEngineering.url,
            title: comb_elecEngineering.title
        };
        fs.writeFile("./compare_list/elecEngineering.json", JSON.stringify(elecEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("elecEngineering updated"); }
        });
    }
    if (storeDifferences.enerEngineering.length != 0) {
        let enerEngineeringObject = {
            url: comb_enerEngineering.url,
            title: comb_enerEngineering.title
        };
        fs.writeFile("./compare_list/enerEngineering.json", JSON.stringify(enerEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("enerEngineering updated"); }
        });
    }
    if (storeDifferences.english.length != 0) {
        let englishObject = {
            url: comb_english.url,
            title: comb_english.title
        };
        fs.writeFile("./compare_list/english.json", JSON.stringify(englishObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("english updated"); }
        });
    }
    if (storeDifferences.englishEd.length != 0) {
        let englishEdObject = {
            url: comb_englishEd.url,
            title: comb_englishEd.title
        };
        fs.writeFile("./compare_list/englishEd.json", JSON.stringify(englishEdObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("englishEd updated"); }
        });
    }
    if (storeDifferences.french.length != 0) {
        let frenchObject = {
            url: comb_french.url,
            title: comb_french.title
        };
        fs.writeFile("./compare_list/french.json", JSON.stringify(frenchObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("french updated"); }
        });
    }
    if (storeDifferences.german.length != 0) {
        let germanObject = {
            url: comb_german.url,
            title: comb_german.title
        };
        fs.writeFile("./compare_list/german.json", JSON.stringify(germanObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("german updated"); }
        });
    }
    if (storeDifferences.history.length != 0) {
        let historyObject = {
            url: comb_history.url,
            title: comb_history.title
        };
        fs.writeFile("./compare_list/history.json", JSON.stringify(historyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("history updated"); }
        });
    }
    if (storeDifferences.industSec.length != 0) {
        let industSecObject = {
            url: comb_industSec.url,
            title: comb_industSec.title
        };
        fs.writeFile("./compare_list/industSec.json", JSON.stringify(industSecObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("industSec updated"); }
        });
    }
    if (storeDifferences.integEngineering.length != 0) {
        let integEngineeringObject = {
            url: comb_integEngineering.url,
            title: comb_integEngineering.title
        };
        fs.writeFile("./compare_list/integEngineering.json", JSON.stringify(integEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("integEngineering updated"); }
        });
    }
    if (storeDifferences.japanese.length != 0) {
        let japaneseObject = {
            url: comb_japanese.url,
            title: comb_japanese.title
        };
        fs.writeFile("./compare_list/japanese.json", JSON.stringify(japaneseObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("japanese updated"); }
        });
    }
    if (storeDifferences.korean.length != 0) {
        let koreanObject = {
            url: comb_korean.url,
            title: comb_korean.title
        };
        fs.writeFile("./compare_list/korean.json", JSON.stringify(koreanObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("korean updated"); }
        });
    }
    if (storeDifferences.libInfoScience.length != 0) {
        let libInfoScienceObject = {
            url: comb_libInfoScience.url,
            title: comb_libInfoScience.title
        };
        fs.writeFile("./compare_list/libInfoScience.json", JSON.stringify(libInfoScienceObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("libInfoScience updated"); }
        });
    }
    if (storeDifferences.lifeScience.length != 0) {
        let lifeScienceObject = {
            url: comb_lifeScience.url,
            title: comb_lifeScience.title
        };
        fs.writeFile("./compare_list/lifeScience.json", JSON.stringify(lifeScienceObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("lifeScience updated"); }
        });
    }
    if (storeDifferences.logistics.length != 0) {
        let logisticsObject = {
            url: comb_logistics.url,
            title: comb_logistics.title
        };
        fs.writeFile("./compare_list/logistics.json", JSON.stringify(logisticsObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("logistics updated"); }
        });
    }
    if (storeDifferences.math.length != 0) {
        let mathObject = {
            url: comb_math.url,
            title: comb_math.title
        };
        fs.writeFile("./compare_list/math.json", JSON.stringify(mathObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("math updated"); }
        });
    }
    if (storeDifferences.mechEngineering.length != 0) {
        let mechEngineeringObject = {
            url: comb_mechEngineering.url,
            title: comb_mechEngineering.title
        };
        fs.writeFile("./compare_list/mechEngineering.json", JSON.stringify(mechEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("mechEngineering updated"); }
        });
    }
    if (storeDifferences.med.length != 0) {
        let medObject = {
            url: comb_med.url,
            title: comb_med.title
        };
        fs.writeFile("./compare_list/med.json", JSON.stringify(medObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("med updated"); }
        });
    }
    if (storeDifferences.mediaComm.length != 0) {
        let mediaCommObject = {
            url: comb_mediaComm.url,
            title: comb_mediaComm.title
        };
        fs.writeFile("./compare_list/mediaComm.json", JSON.stringify(mediaCommObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("mediaComm updated"); }
        });
    }
    if (storeDifferences.nursing.length != 0) {
        let nursingObject = {
            url: comb_nursing.url,
            title: comb_nursing.title
        };
        fs.writeFile("./compare_list/nursing.json", JSON.stringify(nursingObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("nursing updated"); }
        });
    }
    if (storeDifferences.pharm.length != 0) {
        let pharmObject = {
            url: comb_pharm.url,
            title: comb_pharm.title
        };
        fs.writeFile("./compare_list/pharm.json", JSON.stringify(pharmObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("pharm updated"); }
        });
    }
    if (storeDifferences.philosophy.length != 0) {
        let philosophyObject = {
            url: comb_philosophy.url,
            title: comb_philosophy.title
        };
        fs.writeFile("./compare_list/philosophy.json", JSON.stringify(philosophyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("philosophy updated"); }
        });
    }
    if (storeDifferences.physicalEd.length != 0) {
        let physicalEdObject = {
            url: comb_physicalEd.url,
            title: comb_physicalEd.title
        };
        fs.writeFile("./compare_list/physicalEd.json", JSON.stringify(physicalEdObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("physicalEd updated"); }
        });
    }
    if (storeDifferences.physics.length != 0) {
        let physicsObject = {
            url: comb_physics.url,
            title: comb_physics.title
        };
        fs.writeFile("./compare_list/physics.json", JSON.stringify(physicsObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("physics updated"); }
        });
    }
    if (storeDifferences.polaris.length != 0) {
        let polarisObject = {
            url: comb_polaris.url,
            title: comb_polaris.title
        };
        fs.writeFile("./compare_list/polaris.json", JSON.stringify(polarisObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("polaris updated"); }
        });
    }
    if (storeDifferences.politics.length != 0) {
        let politicsObject = {
            url: comb_politics.url,
            title: comb_politics.title
        };
        fs.writeFile("./compare_list/politics.json", JSON.stringify(politicsObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("politics updated"); }
        });
    }
    if (storeDifferences.psychology.length != 0) {
        let psychologyObject = {
            url: comb_psychology.url,
            title: comb_psychology.title
        };
        fs.writeFile("./compare_list/psychology.json", JSON.stringify(psychologyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("psychology updated"); }
        });
    }
    if (storeDifferences.publicService.length != 0) {
        let publicServiceObject = {
            url: comb_publicService.url,
            title: comb_publicService.title
        };
        fs.writeFile("./compare_list/publicService.json", JSON.stringify(publicServiceObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("publicService updated"); }
        });
    }
    if (storeDifferences.russian.length != 0) {
        let russianObject = {
            url: comb_russian.url,
            title: comb_russian.title
        };
        fs.writeFile("./compare_list/russian.json", JSON.stringify(russianObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("russian updated"); }
        });
    }
    if (storeDifferences.socialWelfare.length != 0) {
        let socialWelfareObject = {
            url: comb_socialWelfare.url,
            title: comb_socialWelfare.title
        };
        fs.writeFile("./compare_list/socialWelfare.json", JSON.stringify(socialWelfareObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("socialWelfare updated"); }
        });
    }
    if (storeDifferences.sociology.length != 0) {
        let sociologyObject = {
            url: comb_sociology.url,
            title: comb_sociology.title
        };
        fs.writeFile("./compare_list/sociology.json", JSON.stringify(sociologyObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("sociology updated"); }
        });
    }
    if (storeDifferences.software.length != 0) {
        let softwareObject = {
            url: comb_software.url,
            title: comb_software.title
        };
        fs.writeFile("./compare_list/software.json", JSON.stringify(softwareObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("software updated"); }
        });
    }
    if (storeDifferences.upreJob.length != 0) {
        let upreJobObject = {
            url: comb_upreJob.url,
            title: comb_upreJob.title
        };
        fs.writeFile("./compare_list/upreJob.json", JSON.stringify(upreJobObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("upreJob updated"); }
        });
    }
    if (storeDifferences.urbanEngineering.length != 0) {
        let urbanEngineeringObject = {
            url: comb_urbanEngineering.url,
            title: comb_urbanEngineering.title
        };
        fs.writeFile("./compare_list/urbanEngineering.json", JSON.stringify(urbanEngineeringObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("urbanEngineering updated"); }
        });
    }
    if (storeDifferences.urbanPlanRealEstate.length != 0) {
        let urbanPlanRealEstateObject = {
            url: comb_urbanPlanRealEstate.url,
            title: comb_urbanPlanRealEstate.title
        };
        fs.writeFile("./compare_list/urbanPlanRealEstate.json", JSON.stringify(urbanPlanRealEstateObject, null, 4), (err) => {
            if (err) { console.log(err); } else { console.log("urbanPlanRealEstate updated"); }
        });
    }
    
    // 가독성을 위해 line breaking
    if(Object.keys(updatedContentStorage).length != 0){
        console.log("\n");
    }

}
if(ON == "true") refresh(1,0,"false");


// 기존 목록의 파일들(json)을 만들고,
// 기존 목록에서 긁어온 목록과 지금의 목록을 대조하고,
// 결과값 리턴


// const new_industSec = await waitWithTimeout(crawlIndustSe("url",2),1*60*1000); // 이 반환값에 .title 또는 .url을 이용해 값에 접근할 수 있음
// fs.writeFileSync("industSec.json", JSON.stringify(new_industSec), "utf8");
// console.log(new_industSec);
// console.log(JSON.stringify(new_industSec));