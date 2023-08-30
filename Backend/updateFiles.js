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

import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

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


async function updateFiles(){
    console.log("Updating initiated");
    // 1페이지
    console.time("Page 1 finished in");
    const new_CAUnotice = 	    await waitWithTimeout(crawlCAUnotice("url",1),1*60*1000);			
    const new_adpr = 		    await waitWithTimeout(crawladpr("url",1),1*60*1000);			    
    const new_ai = 			    await waitWithTimeout(crawlAi("url",1),1*60*1000);			        
    const new_appliedStat =     await waitWithTimeout(crawlAppliedStat("url",1),1*60*1000);			
    const new_architecture =    await waitWithTimeout(crawlArchitecture("url",1),1*60*1000);		
    const new_business = 	    await waitWithTimeout(crawlBusiness("url",1),1*60*1000);			
    const new_chem = 		    await waitWithTimeout(crawlChem("url",1),1*60*1000);			    
    const new_chemEngineering = await waitWithTimeout(crawlChemEngineering("url",1),1*60*1000);		
    const new_chinese = 	    await waitWithTimeout(crawlChinese("url",1),1*60*1000);			    
    const new_civilEnvPlanEng = await waitWithTimeout(crawlCivilEnvPlanEng("url",1),1*60*1000);		
    const new_davinci = 	    await waitWithTimeout(crawlDavinci("url",1),1*60*1000);			    
    const new_dorm = 		    await waitWithTimeout(crawlDorm("url",1),1*60*1000);			    
    const new_earlyChildhoodEd = await waitWithTimeout(crawlEarlyChildhoodEd("url",1),1*60*1000);	
//    const new_econ = 		    await waitWithTimeout(crawlEcon("url",1),1*60*1000);			    
    const new_education = 	    await waitWithTimeout(crawlEducation("url",1),1*60*1000);			
    const new_elecEngineering = await waitWithTimeout(crawlElecEngineering("url",1),1*60*1000);		
    const new_enerEngineering = await waitWithTimeout(crawlEnerEngineering("url",1),1*60*1000);		
    const new_english = 	    await waitWithTimeout(crawlEnglish("url",1),1*60*1000);             
    const new_englishEd = 	    await waitWithTimeout(crawlEnglishEd("url",1),1*60*1000);			
    const new_french = 	        await waitWithTimeout(crawlFrench("url",1),1*60*1000);			    
    const new_german = 		    await waitWithTimeout(crawlGerman("url",1),1*60*1000);			    
    const new_history = 	    await waitWithTimeout(crawlHistory("url",1),1*60*1000);			    
    const new_industSec = 	    await waitWithTimeout(crawlIndustSec("url",1),1*60*1000);			
    const new_integEngineering = await waitWithTimeout(crawlIntegEngineering("url",1),1*60*1000);	
    const new_japanese = 	    await waitWithTimeout(crawlJapanese("url",1),1*60*1000);			
    const new_korean = 		    await waitWithTimeout(crawlKorean("url",1),1*60*1000);			    
    const new_libInfoScience = 	await waitWithTimeout(crawlLibInfoScience("url",1),1*60*1000);		
    const new_lifeScience =     await waitWithTimeout(crawlLifeScience("url",1),1*60*1000);			
    const new_logistics = 	    await waitWithTimeout(crawlLogistics("url",1),1*60*1000);			
    const new_math = 		    await waitWithTimeout(crawlMath("url",1),1*60*1000);			    
    const new_mechEngineering = await waitWithTimeout(crawlMechEngineering("url",1),1*60*1000);		
    const new_med = 		    await waitWithTimeout(crawlMed("url",1),1*60*1000);			        
    const new_mediaComm = 	    await waitWithTimeout(crawlMediaComm("url",1),1*60*1000);			
    const new_nursing = 	    await waitWithTimeout(crawlNursing("url",1),1*60*1000);			    
    const new_pharm = 		    await waitWithTimeout(crawlPharm("url",1),1*60*1000);			    
    const new_philosophy = 	    await waitWithTimeout(crawlPhilosophy("url",1),1*60*1000);			
    const new_physicalEd = 	    await waitWithTimeout(crawlPhysicalEd("url",1),1*60*1000);			
    const new_physics = 	    await waitWithTimeout(crawlPhysics("url",1),1*60*1000);			    
    const new_polaris = 	    await waitWithTimeout(crawlPolaris("url",1),1*60*1000);			    
    const new_politics = 	    await waitWithTimeout(crawlPolitics("url",1),1*60*1000);			
    const new_psychology = 	    await waitWithTimeout(crawlPsychology("url",1),1*60*1000);			
    const new_publicService =   await waitWithTimeout(crawlPublicService("url",1),1*60*1000);		
    const new_russian = 	    await waitWithTimeout(crawlRussian("url",1),1*60*1000);			    
    const new_socialWelfare =   await waitWithTimeout(crawlSocialWelfare("url",1),1*60*1000);		
    const new_sociology = 	    await waitWithTimeout(crawlSociology("url",1),1*60*1000);			
    const new_software = 	    await waitWithTimeout(crawlSoftware("url",1),1*60*1000);			
    const new_upreJob = 	    await waitWithTimeout(crawlupreJob("url",1),1*60*1000);			    
    const new_urbanEngineering = await waitWithTimeout(crawlUrbanEngineering("url",1),1*60*1000);	
    const new_urbanPlanRealEstate = await waitWithTimeout(crawlUrbanPlanRealEstate("url",1),1*60*1000);	
    console.timeEnd("Page 1 finished in");
    // 2 페이지
    console.time("Page 2 finished in");
    const sec_CAUnotice = 	    await waitWithTimeout(crawlCAUnotice("url",2),1*60*1000);			
    const sec_adpr = 		    await waitWithTimeout(crawladpr("url",2),1*60*1000);			    
    const sec_ai = 			    await waitWithTimeout(crawlAi("url",2),1*60*1000);			        
    const sec_appliedStat =     await waitWithTimeout(crawlAppliedStat("url",2),1*60*1000);			
    const sec_architecture =    await waitWithTimeout(crawlArchitecture("url",2),1*60*1000);		
    const sec_business = 	    await waitWithTimeout(crawlBusiness("url",2),1*60*1000);			
    const sec_chem = 		    await waitWithTimeout(crawlChem("url",2),1*60*1000);			    
    const sec_chemEngineering = await waitWithTimeout(crawlChemEngineering("url",2),1*60*1000);		
    const sec_chinese = 	    await waitWithTimeout(crawlChinese("url",2),1*60*1000);			    
    const sec_civilEnvPlanEng = await waitWithTimeout(crawlCivilEnvPlanEng("url",2),1*60*1000);		
    const sec_davinci = 	    await waitWithTimeout(crawlDavinci("url",2),1*60*1000);			    
    const sec_dorm = 		    await waitWithTimeout(crawlDorm("url",2),1*60*1000);			    
    const sec_earlyChildhoodEd = await waitWithTimeout(crawlEarlyChildhoodEd("url",2),1*60*1000);	
//    const sec_econ = 		    await waitWithTimeout(crawlEcon("url",2),1*60*1000);			    
    const sec_education = 	    await waitWithTimeout(crawlEducation("url",2),1*60*1000);			
    const sec_elecEngineering = await waitWithTimeout(crawlElecEngineering("url",2),1*60*1000);		
    const sec_enerEngineering = await waitWithTimeout(crawlEnerEngineering("url",2),1*60*1000);		
    const sec_english = 	    await waitWithTimeout(crawlEnglish("url",2),1*60*1000);             
    const sec_englishEd = 	    await waitWithTimeout(crawlEnglishEd("url",2),1*60*1000);			
    const sec_french = 	        await waitWithTimeout(crawlFrench("url",2),1*60*1000);			    
    const sec_german = 		    await waitWithTimeout(crawlGerman("url",2),1*60*1000);			    
    const sec_history = 	    await waitWithTimeout(crawlHistory("url",2),1*60*1000);			    
    const sec_industSec = 	    await waitWithTimeout(crawlIndustSec("url",2),1*60*1000);			
    const sec_integEngineering = await waitWithTimeout(crawlIntegEngineering("url",2),1*60*1000);	
    const sec_japanese = 	    await waitWithTimeout(crawlJapanese("url",2),1*60*1000);			
    const sec_korean = 		    await waitWithTimeout(crawlKorean("url",2),1*60*1000);			    
    const sec_libInfoScience = 	await waitWithTimeout(crawlLibInfoScience("url",2),1*60*1000);		
    const sec_lifeScience =     await waitWithTimeout(crawlLifeScience("url",2),1*60*1000);			
    const sec_logistics = 	    await waitWithTimeout(crawlLogistics("url",2),1*60*1000);			
    const sec_math = 		    await waitWithTimeout(crawlMath("url",2),1*60*1000);			    
    const sec_mechEngineering = await waitWithTimeout(crawlMechEngineering("url",2),1*60*1000);		
    const sec_med = 		    await waitWithTimeout(crawlMed("url",2),1*60*1000);			        
    const sec_mediaComm = 	    await waitWithTimeout(crawlMediaComm("url",2),1*60*1000);			
    const sec_nursing = 	    await waitWithTimeout(crawlNursing("url",2),1*60*1000);			    
    const sec_pharm = 		    await waitWithTimeout(crawlPharm("url",2),1*60*1000);			    
    const sec_philosophy = 	    await waitWithTimeout(crawlPhilosophy("url",2),1*60*1000);			
    const sec_physicalEd = 	    await waitWithTimeout(crawlPhysicalEd("url",2),1*60*1000);			
    const sec_physics = 	    await waitWithTimeout(crawlPhysics("url",2),1*60*1000);			    
    const sec_polaris = 	    await waitWithTimeout(crawlPolaris("url",2),1*60*1000);			    
    const sec_politics = 	    await waitWithTimeout(crawlPolitics("url",2),1*60*1000);			
    const sec_psychology = 	    await waitWithTimeout(crawlPsychology("url",2),1*60*1000);			
    const sec_publicService =   await waitWithTimeout(crawlPublicService("url",2),1*60*1000);		
    const sec_russian = 	    await waitWithTimeout(crawlRussian("url",2),1*60*1000);			    
    const sec_socialWelfare =   await waitWithTimeout(crawlSocialWelfare("url",2),1*60*1000);		
    const sec_sociology = 	    await waitWithTimeout(crawlSociology("url",2),1*60*1000);			
    const sec_software = 	    await waitWithTimeout(crawlSoftware("url",2),1*60*1000);			
    const sec_upreJob = 	    await waitWithTimeout(crawlupreJob("url",2),1*60*1000);			    
    const sec_urbanEngineering = await waitWithTimeout(crawlUrbanEngineering("url",2),1*60*1000);	
    const sec_urbanPlanRealEstate = await waitWithTimeout(crawlUrbanPlanRealEstate("url",2),1*60*1000);	
    console.timeEnd("Page 2 finished in");

    function combineTwoPages(newObject, secObject){
        const newLength = newObject.url.length;
        const secLength = secObject.url.length;
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

    console.time("Combining finished in");
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
//    const comb_econ = combineTwoPages(new_econ, sec_econ);
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
    console.timeEnd("Combining finished in");

    fs.writeFile("./compare_list/CAUnotice.json", JSON.stringify(comb_CAUnotice, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("CAUnotice.json written successfully");
    });
    fs.writeFile("./compare_list/adpr.json", JSON.stringify(comb_adpr, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("adpr.json written successfully");
    });
    fs.writeFile("./compare_list/ai.json", JSON.stringify(comb_ai, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("ai.json written successfully");
    });
    fs.writeFile("./compare_list/appliedStat.json", JSON.stringify(comb_appliedStat, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("appliedStat.json written successfully");
    });
    fs.writeFile("./compare_list/architecture.json", JSON.stringify(comb_architecture, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("architecture.json written successfully");
    });
    fs.writeFile("./compare_list/business.json", JSON.stringify(comb_business, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("business.json written successfully");
    });
    fs.writeFile("./compare_list/chem.json", JSON.stringify(comb_chem, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("chem.json written successfully");
    });
    fs.writeFile("./compare_list/chemEngineering.json", JSON.stringify(comb_chemEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("chemEngineering.json written successfully");
    });
    fs.writeFile("./compare_list/chinese.json", JSON.stringify(comb_chinese, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("chinese.json written successfully");
    });
    fs.writeFile("./compare_list/civilEnvPlanEng.json", JSON.stringify(comb_civilEnvPlanEng, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("civilEnvPlanEng.json written successfully");
    });
    fs.writeFile("./compare_list/davinci.json", JSON.stringify(comb_davinci, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("davinci.json written successfully");
    });
    fs.writeFile("./compare_list/dorm.json", JSON.stringify(comb_dorm, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("dorm.json written successfully");
    });
    fs.writeFile("./compare_list/earlyChildhoodEd.json", JSON.stringify(comb_earlyChildhoodEd, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("earlyChildhoodEd.json written successfully");
    });
/*    fs.writeFile("./compare_list/econ.json", JSON.stringify(comb_econ, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("econ.json written successfully");
    });*/
    fs.writeFile("./compare_list/education.json", JSON.stringify(comb_education, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("education.json written successfully");
    });
    fs.writeFile("./compare_list/elecEngineering.json", JSON.stringify(comb_elecEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("elecEngineering.json written successfully");
    });
    fs.writeFile("./compare_list/enerEngineering.json", JSON.stringify(comb_enerEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("enerEngineering.json written successfully");
    });
    fs.writeFile("./compare_list/english.json", JSON.stringify(comb_english, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("english.json written successfully");
    });
    fs.writeFile("./compare_list/englishEd.json", JSON.stringify(comb_englishEd, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("englishEd.json written successfully");
    });
    fs.writeFile("./compare_list/french.json", JSON.stringify(comb_french, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("french.json written successfully");
    });
    fs.writeFile("./compare_list/german.json", JSON.stringify(comb_german, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("german.json written successfully");
    });
    fs.writeFile("./compare_list/history.json", JSON.stringify(comb_history, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("history.json written successfully");
    });
    fs.writeFile("./compare_list/industSec.json", JSON.stringify(comb_industSec, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("industSec.json written successfully");
    });
    fs.writeFile("./compare_list/integEngineering.json", JSON.stringify(comb_integEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("integEngineering.json written successfully");
    });
    fs.writeFile("./compare_list/japanese.json", JSON.stringify(comb_japanese, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("japanese.json written successfully");
    });
    fs.writeFile("./compare_list/korean.json", JSON.stringify(comb_korean, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("korean.json written successfully");
    });
    fs.writeFile("./compare_list/libInfoScience.json", JSON.stringify(comb_libInfoScience, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("libInfoScience.json written successfully");
    });
    fs.writeFile("./compare_list/lifeScience.json", JSON.stringify(comb_lifeScience, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("lifeScience.json written successfully");
    });
    fs.writeFile("./compare_list/logistics.json", JSON.stringify(comb_logistics, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("logistics.json written successfully");
    });
    fs.writeFile("./compare_list/math.json", JSON.stringify(comb_math, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("math.json written successfully");
    });
    fs.writeFile("./compare_list/mechEngineering.json", JSON.stringify(comb_mechEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("mechEngineering.json written successfully");
    });
    fs.writeFile("./compare_list/med.json", JSON.stringify(comb_med, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("med.json written successfully");
    });
    fs.writeFile("./compare_list/mediaComm.json", JSON.stringify(comb_mediaComm, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("mediaComm.json written successfully");
    });
    fs.writeFile("./compare_list/nursing.json", JSON.stringify(comb_nursing, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("nursing.json written successfully");
    });
    fs.writeFile("./compare_list/pharm.json", JSON.stringify(comb_pharm, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("pharm.json written successfully");
    });
    fs.writeFile("./compare_list/philosophy.json", JSON.stringify(comb_philosophy, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("philosophy.json written successfully");
    });
    fs.writeFile("./compare_list/physicalEd.json", JSON.stringify(comb_physicalEd, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("physicalEd.json written successfully");
    });
    fs.writeFile("./compare_list/physics.json", JSON.stringify(comb_physics, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("physics.json written successfully");
    });
    fs.writeFile("./compare_list/polaris.json", JSON.stringify(comb_polaris, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("polaris.json written successfully");
    });
    fs.writeFile("./compare_list/politics.json", JSON.stringify(comb_politics, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("politics.json written successfully");
    });
    fs.writeFile("./compare_list/psychology.json", JSON.stringify(comb_psychology, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("psychology.json written successfully");
    });
    fs.writeFile("./compare_list/publicService.json", JSON.stringify(comb_publicService, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("publicService.json written successfully");
    });
    fs.writeFile("./compare_list/russian.json", JSON.stringify(comb_russian, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("russian.json written successfully");
    });
    fs.writeFile("./compare_list/socialWelfare.json", JSON.stringify(comb_socialWelfare, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("socialWelfare.json written successfully");
    });
    fs.writeFile("./compare_list/sociology.json", JSON.stringify(comb_sociology, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("sociology.json written successfully");
    });
    fs.writeFile("./compare_list/software.json", JSON.stringify(comb_software, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("software.json written successfully");
    });
    fs.writeFile("./compare_list/upreJob.json", JSON.stringify(comb_upreJob, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("upreJob.json written successfully");
    });
    fs.writeFile("./compare_list/urbanEngineering.json", JSON.stringify(comb_urbanEngineering, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("urbanEngineering.json written successfully");
    });
    fs.writeFile("./compare_list/urbanPlanRealEstate.json", JSON.stringify(comb_urbanPlanRealEstate, null, 4), "utf8", (err) => {
        if (err) console.log(err);
        else console.log("urbanPlanRealEstate.json written successfully");
    });
    

    
}
updateFiles();
