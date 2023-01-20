import KRname from "./name_en2kr.js"

export function simpleUserInfo(user,forAdmin){
    let res = ``;
    if(forAdmin == "true") res = res.concat(`${user.name}, ${user.email}, id:${user.id}, subStatus:${user.subStatus}`);

    // 전체 공지
    if(user.CAUnotice == "true") res = res.concat(', ',KRname("CAUnotice"));
    if(user.dorm == "true") res = res.concat(', ',KRname("dorm"));
    if(user.davinci == "true") res = res.concat(', ',KRname("davinci"));
    
    // 경경대
    if(user.business == "true") res = res.concat(', ',KRname("business"));
    if(user.logistics == "true") res = res.concat(', ',KRname("logistics"));
    if(user.econ == "true") res = res.concat(', ',KRname("econ"));
    if(user.industSec == "true") res = res.concat(', ',KRname("industSec"));
    if(user.appliedStat == "true") res = res.concat(', ',KRname("appliedStat"));
    if(user.adpr == "true") res = res.concat(', ',KRname("adpr"));

    // 인문대
    if(user.korean == "true") res = res.concat(', ',KRname("korean"));
    if(user.english == "true") res = res.concat(', ',KRname("english"));
    if(user.japanese == "true") res = res.concat(', ',KRname("japanese"));
    if(user.chinese == "true") res = res.concat(', ',KRname("chinese"));
    if(user.russian == "true") res = res.concat(', ',KRname("russian"));
    if(user.french == "true") res = res.concat(', ',KRname("french"));
    if(user.german == "true") res = res.concat(', ',KRname("german"));
    if(user.philosophy == "true") res = res.concat(', ',KRname("philosophy"));
    if(user.history == "true") res = res.concat(', ',KRname("history"));

    // 사과대
    if(user.publicService == "true") res = res.concat(', ',KRname("publicService"));
    if(user.psychology == "true") res = res.concat(', ',KRname("psychology"));
    if(user.politics == "true") res = res.concat(', ',KRname("politics"));
    if(user.urbanPlanRealEstate == "true") res = res.concat(', ',KRname("urbanPlanRealEstate"));
    if(user.libInfoScience == "true") res = res.concat(', ',KRname("libInfoScience"));
    if(user.mediaComm == "true") res = res.concat(', ',KRname("mediaComm"));
    if(user.sociology == "true") res = res.concat(', ',KRname("sociology"));
    if(user.socialWelfare == "true") res = res.concat(', ',KRname("socialWelfare"));

    // 사범대
    if(user.education == "true") res = res.concat(', ',KRname("education"));
    if(user.earlyChildhoodEd == "true") res = res.concat(', ',KRname("earlyChildhoodEd"));
    if(user.englishEd == "true") res = res.concat(', ',KRname("englishEd"));
    if(user.physicalEd == "true") res = res.concat(', ',KRname("physicalEd"));

    // 자연대
    if(user.physics == "true") res = res.concat(', ',KRname("physics"));
    if(user.chem == "true") res = res.concat(', ',KRname("chem"));
    if(user.lifeScience == "true") res = res.concat(', ',KRname("lifeScience"));
    if(user.math == "true") res = res.concat(', ',KRname("math"));

    // 공과대
    if(user.chemEngineering == "true") res = res.concat(', ',KRname("chemEngineering"));
    if(user.civilEnvPlanEng == "true") res = res.concat(', ',KRname("civilEnvPlanEng"));
    if(user.urbanEngineering == "true") res = res.concat(', ',KRname("urbanEngineering"));
    if(user.mechEngineering == "true") res = res.concat(', ',KRname("mechEngineering"));
    if(user.enerEngineering == "true") res = res.concat(', ',KRname("enerEngineering"));
    if(user.architecture == "true") res = res.concat(', ',KRname("architecture"));

    // 창의ICT
    if(user.integEngineering == "true") res = res.concat(', ',KRname("integEngineering"));
    if(user.elecEngineering == "true") res = res.concat(', ',KRname("elecEngineering"));
    if(user.polaris == "true") res = res.concat(', ',KRname("polaris"));

    // 소프트
    if(user.software == "true") res = res.concat(', ',KRname("software"));
    if(user.ai == "true") res = res.concat(', ',KRname("ai"));

    // 의
    if(user.med == "true") res = res.concat(', ',KRname("med"));

    // 약
    if(user.pharm == "true") res = res.concat(', ',KRname("pharm"));

    // 간
    if(user.nursing == "true") res = res.concat(', ',KRname("nursing"));

    // 특수
    if(user.upreJob == "true") res = res.concat(', ',KRname("upreJob"));

    if(res.startsWith(", ")){
        let len = res.length;
        res = res.slice(2,len);
    }
    
    return res;
}
