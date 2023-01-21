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
import crawladpr from "./crawlers/url_scraper_adprr.js";
import crawlDorm from "./crawlers/url_scraper_dorm.js";
import crawlupreJob from "./crawlers/url_scraper_upre_job.js";
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

export async function crawlSecond(){ // 반드시      await 해줄 것
    let res = []; // url만 담음

    const second_industSec =           await waitWithTimeout(crawlIndustSec("url",2),1*60*1000);                 
    const second_software =            await waitWithTimeout(crawlSoftware("url",2),1*60*1000);                  
    const second_CAUnotice =           await waitWithTimeout(crawlCAUnotice("url",2),1*60*1000);                 
    const second_integEngineering =    await waitWithTimeout(crawlIntegEngineering("url",2),1*60*1000);     
    const second_korean =              await waitWithTimeout(crawlKorean("url",2),1*60*1000);                    
    const second_mechEngineering =     await waitWithTimeout(crawlMechEngineering("url",2),1*60*1000);       
    const second_psychology =          await waitWithTimeout(crawlPsychology("url",2),1*60*1000);                
    const second_business =            await waitWithTimeout(crawlBusiness("url",2),1*60*1000);                  
    const second_elecEngineering =     await waitWithTimeout(crawlElecEngineering("url",2),1*60*1000);       
    const second_english =             await waitWithTimeout(crawlEnglish("url",2),1*60*1000);                   
    const second_enerEngineering =     await waitWithTimeout(crawlEnerEngineering("url",2),1*60*1000);       
    const second_urbanPlanRealEstate = await waitWithTimeout(crawlUrbanPlanRealEstate("url",2),1*60*1000); 
    const second_nursing =             await waitWithTimeout(crawlNursing("url",2),1*60*1000);                   
    const second_politics =            await waitWithTimeout(crawlPolitics("url",2),1*60*1000);                  
    const second_physicalEd =          await waitWithTimeout(crawlPhysicalEd("url",2),1*60*1000);                
    const second_education =           await waitWithTimeout(crawlEducation("url",2),1*60*1000);                 
    const second_earlyChildhoodEd =    await waitWithTimeout(crawlEarlyChildhoodEd("url",2),1*60*1000);     
    const second_englishEd =           await waitWithTimeout(crawlEnglishEd("url",2),1*60*1000);                 
    const second_chem =                await waitWithTimeout(crawlChem("url",2),1*60*1000);                      
    const second_lifeScience =         await waitWithTimeout(crawlLifeScience("url",2),1*60*1000);               
    const second_japanese =            await waitWithTimeout(crawlJapanese("url",2),1*60*1000);                  
    const second_chinese =             await waitWithTimeout(crawlChinese("url",2),1*60*1000);                   
    const second_math =                await waitWithTimeout(crawlMath("url",2),1*60*1000);                      
    const second_ai =                  await waitWithTimeout(crawlAi("url",2),1*60*1000);                        
    const second_chemEngineering =     await waitWithTimeout(crawlChemEngineering("url",2),1*60*1000);       
    const second_logistics =           await waitWithTimeout(crawlLogistics("url",2),1*60*1000);                 
    const second_econ =                await waitWithTimeout(crawlEcon("url",2),1*60*1000);                      
    const second_physics =             await waitWithTimeout(crawlPhysics("url",2),1*60*1000);                   
    const second_libInfoScience =      await waitWithTimeout(crawlLibInfoScience("url",2),1*60*1000);         
    const second_mediaComm =           await waitWithTimeout(crawlMediaComm("url",2),1*60*1000);                 
    const second_sociology =           await waitWithTimeout(crawlSociology("url",2),1*60*1000);                 
    const second_socialWelfare =       await waitWithTimeout(crawlSocialWelfare("url",2),1*60*1000);           
    const second_russian =             await waitWithTimeout(crawlRussian("url",2),1*60*1000);                   
    const second_french =              await waitWithTimeout(crawlFrench("url",2),1*60*1000);                    
    const second_german =              await waitWithTimeout(crawlGerman("url",2),1*60*1000);                    
    const second_philosophy =          await waitWithTimeout(crawlPhilosophy("url",2),1*60*1000);                
    const second_history =             await waitWithTimeout(crawlHistory("url",2),1*60*1000);                   
    const second_publicService =       await waitWithTimeout(crawlPublicService("url",2),1*60*1000);           
    const second_civilEnvPlanEng =     await waitWithTimeout(crawlCivilEnvPlanEng("url",2),1*60*1000);       
    const second_urbanEngineering =    await waitWithTimeout(crawlUrbanEngineering("url",2),1*60*1000);     
    const second_architecture =        await waitWithTimeout(crawlArchitecture("url",2),1*60*1000);             
    const second_appliedStat =         await waitWithTimeout(crawlAppliedStat("url",2),1*60*1000);               
    const second_med =                 await waitWithTimeout(crawlMed("url",2),1*60*1000);                       
    const second_pharm =               await waitWithTimeout(crawlPharm("url",2),1*60*1000);                     
    const second_adpr =                await waitWithTimeout(crawladpr("url",2),1*60*1000);                      
    const second_dorm =                await waitWithTimeout(crawlDorm("url",2),1*60*1000);                      
    const second_upreJob =             await waitWithTimeout(crawlupreJob("url",2),1*60*1000);                   
    const second_davinci =             await waitWithTimeout(crawlDavinci("url",2),1*60*1000);                   
    const second_polaris =             await waitWithTimeout(crawlPolaris("url",2),1*60*1000);                   


    return res;
}