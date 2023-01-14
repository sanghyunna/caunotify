// 새 게시판 추가시:
// main.js 에서 post요청 기대값에 추가
// refresh.js 에서 추가
// 프런트에 알림

// Server
import http from "http";
import express from "express";
import bodyParser from "body-parser";

// Util
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment-timezone';

// Personal Code
import { refresh } from "./refresh.js"
import { decryptStringToInt } from "./encrypter.js"
import { DayOrNight } from "./dayOrNight.js";
import { sendTemplateEmail } from "./sendEmail.js";
import { mailHandler } from "./mailHandler.js";

function updateUserDB(src){
    fs.writeFileSync(path.join(__dirname, 'userDB_log', 'userDB.json'), JSON.stringify(userDataBase,null,4), { encoding: "utf8", flag: "w" });
    fs.writeFileSync(`${__dirname}/userDB_log/log_${moment().format('YYMMDD_HH_mm_ss')}.json`, JSON.stringify(userDataBase,null,4), { encoding: "utf8", flag: "a" });
    console.log(`***UserDB updated by ${src}`);
}
function updateBounceDB(){
    fs.writeFileSync(path.join(__dirname, 'mailDB') + '/bounceDB.json', JSON.stringify(bounceDB,null,4), { encoding: "utf8", flag: "w" });
    console.log(`***BounceDB updated`);
}
function updateComplaintDB(){
    fs.writeFileSync(path.join(__dirname, 'mailDB') + '/complaintDB.json', JSON.stringify(complaintDB,null,4), { encoding: "utf8", flag: "w" });
    console.log(`***ComplaintDB updated`);
}
function findUserByEmail(mailAddress,includeUnsubbedUsers){ // includeUnsubbedUsers는 true 또는 false
    if(includeUnsubbedUsers == "true"){
        for(let i=0;i<nextIdNum;i++){
            if(userDataBase[i].email == mailAddress) return i;
        }
    }
    else{ // 비구독자까지 포함한 요청인 경우 배열로 모든 경우를 반환함
        let res = [];
        for(let i=0;i<nextIdNum;i++){
            if(userDataBase[i].email == mailAddress && userDataBase[i].subStatus == "true") res.push(i);
        }
        if(res.length == 0) return -1;
        else return res;
    }
    return -1;
}

// __dirname 생성
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 서버 기본 세팅
const PORT = 80;
const app = express();
const server = http.createServer(app);
const refreshTimeInMinutes = 10; // 30분에 한번씩 refresh() 실행


// 유저별 구독 정보 저장
let nextIdNum = parseInt(fs.readFileSync(path.join(__dirname, 'userDB_log', 'nextIdNum.txt'),"utf8")); // 유저 DB에 사람이 추가될때마다 +1, ID를 지속적으로 부여
let userDBjsonFile = fs.readFileSync(path.join(__dirname, 'userDB_log', 'userDB.json'),"utf8");
let bounceDBjsonFile = fs.readFileSync(path.join(__dirname, 'mailDB', 'bounceDB.json'),"utf8");
let complaintDBjsonFile = fs.readFileSync(path.join(__dirname, 'mailDB', 'complaintDB.json'),"utf8");


// *** DB 읽어오기 ***
let userDataBase = JSON.parse(userDBjsonFile,"utf8");
let bounceDB = JSON.parse(bounceDBjsonFile,"utf8");
let complaintDB = JSON.parse(complaintDBjsonFile,"utf8");

// await refresh(nextIdNum); // 서버 시작시 업데이트하여 충돌 방지

// ***************************************************** 이 밑으로는 서버( express.js ) 코드 *****************************************************


app.use(function(req, res, next) {
    if (req.get('x-amz-sns-message-type')) { // 아마존 헤더이면 json이라 예측할 것
        req.headers['content-type'] = 'application/json';
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'Frontend', 'public')));
app.use('/public', express.static(path.join(__dirname, '..', 'Frontend', 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

app.get('/unsubscribe', function(req, res) { // 구독해지 요청
    const idNum = decryptStringToInt(req.query.id);
    if(idNum != "" && idNum > 0 && idNum < nextIdNum){
        if(userDataBase[idNum].subStatus == "false"){
            return res.send(`이미 해지된 구독입니다. 새로 구독하시려면 홈페이지를 이용해주세요.`);
        }
        else{
            userDataBase[idNum].subStatus = "false";
            updateUserDB("unsubscribe request already false");
            return res.send(`${userDataBase[idNum].name}님의 구독이 성공적으로 해지되었습니다. 이용해주셔서 감사합니다.`);
        }
    }
    else{
        res.send(`이용자를 찾을 수 없습니다.`);
    }
});

app.post('/newuser', (req, res) => { // 정상작동 확인함
    let requestBody = req.body;
    if(requestBody.name != undefined){
        // undefined 인 경우도 잡아냄
        if(requestBody.industSec != "true")         requestBody.industSec = "false";
        if(requestBody.software != "true")          requestBody.software = "false";
        if(requestBody.CAUnotice != "true")         requestBody.CAUnotice = "false";
        if(requestBody.integEngineering != "true")  requestBody.integEngineering = "false";
        if(requestBody.korean != "true")            requestBody.korean = "false";
        if(requestBody.mechEngineering != "true")   requestBody.mechEngineering = "false";
        if(requestBody.psychology != "true")        requestBody.psychology = "false";
        if(requestBody.business != "true")          requestBody.business = "false";
        if(requestBody.elecEngineering != "true")   requestBody.elecEngineering = "false";
        if(requestBody.english != "true")           requestBody.english = "false";
        if(requestBody.enerEngineering != "true")   requestBody.enerEngineering = "false";
        if(requestBody.urbanPlanRealEstate != "true") requestBody.urbanPlanRealEstate = "false";
        if(requestBody.nursing != "true")           requestBody.nursing = "false";
        if(requestBody.politics != "true")          requestBody.politics = "false";
        if(requestBody.physicalEd != "true")        requestBody.physicalEd = "false";
        if(requestBody.education != "true")         requestBody.education = "false";
        if(requestBody.earlyChildhoodEd != "true")  requestBody.earlyChildhoodEd = "false";
        if(requestBody.englishEd != "true")         requestBody.englishEd = "false";
        if(requestBody.chem != "true")              requestBody.chem = "false";
        if(requestBody.lifeScience != "true")       requestBody.lifeScience = "false";
        if(requestBody.japanese != "true")          requestBody.japanese = "false";
        if(requestBody.chinese != "true")           requestBody.chinese = "false";
        if(requestBody.math != "true")              requestBody.math = "false";
        if(requestBody.ai != "true")                requestBody.ai = "false";
        if(requestBody.chemEngineering != "true")   requestBody.chemEngineering = "false";
        if(requestBody.logistics != "true")         requestBody.logistics = "false";
        if(requestBody.econ != "true")              requestBody.econ = "false";
        if(requestBody.physics != "true")           requestBody.physics = "false";
        if(requestBody.libInfoScience != "true")    requestBody.libInfoScience = "false";
        if(requestBody.mediaComm != "true")         requestBody.mediaComm = "false";
        if(requestBody.sociology != "true")         requestBody.sociology = "false";
        if(requestBody.socialWelfare != "true")     requestBody.socialWelfare = "false";
        if(requestBody.russian != "true")           requestBody.russian = "false";
        if(requestBody.french != "true")            requestBody.french = "false";
        if(requestBody.german != "true")            requestBody.german = "false";
        if(requestBody.philosophy != "true")        requestBody.philosophy = "false";
        if(requestBody.history != "true")           requestBody.history = "false";
        if(requestBody.publicService != "true")     requestBody.publicService = "false";
        if(requestBody.civilEnvPlanEng != "true")   requestBody.civilEnvPlanEng = "false";
        if(requestBody.urbanEngineering != "true")  requestBody.urbanEngineering = "false";
        if(requestBody.architecture != "true")      requestBody.architecture = "false";
        if(requestBody.appliedStat != "true")       requestBody.appliedStat = "false";
        if(requestBody.med != "true")               requestBody.med = "false";
        if(requestBody.pharm != "true")             requestBody.pharm = "false";
        // console.log(`<Received>\n\tName:${requestBody.name}\n\tindustSec:${requestBody.industSec}\n\tsoftware:${requestBody.software}\n\tCAUnotice:${requestBody.CAUnotice}`);
        requestBody.id = parseInt(nextIdNum); // key값 추가
        requestBody.subStatus = "true"; 
        nextIdNum++; // 다음 사용자를 위해 증감

        console.log(requestBody);

        // 가끔 id가 string으로 저장되는 오류가 있어서 코드 추가
        fs.writeFileSync(path.join(__dirname, 'userDB_log', 'nextIdNum.txt'), nextIdNum.toString(), "utf8");

        userDataBase.push(requestBody); // DB array에 저장
        // console.log(userDataBase);
        updateUserDB("newuser");
        mailHandler(requestBody.name, requestBody.email, userDataBase[requestBody.id], requestBody.id, "true"); // 가입메일
        // recipientName, recipientEmail, data, id, IsItSubMail
        return res.send("<script>alert('성공적으로 구독하였습니다!');location.href='http://caunotify.me';</script>"); 
    } else {
        return res.send("<script>alert('문제가 발생했습니다. 구독이 완료되지 않았습니다.');location.href='http://caunotify.me';</script>");
    }

    // res.send(requestBody);
    // console.log(req.body);
    
});
app.post('/posttest', (req, res) => { // 정상작동 확인함
    let requestBody = req.body;
    console.log(requestBody);
    res.send("<script>alert('성공적으로 구독하였습니다!');location.href='http://caunotify.me';</script>");
});



// refresh, currentuserDB, delLastUser 이렇게 3가지는 보안 위협이 될 수 있으므로 배포 단계에서 제거할 코드
// ======================================================================
app.post('/refresh', (req, res) => {
    refresh(nextIdNum);
    return res.end("Refreshed")
});
app.post('/currentuserDB', (req, res) => {
    console.log("** Current UserDB Sent")
    console.log(`nextIdNum : ${nextIdNum}`);
    return res.end(JSON.stringify(userDataBase,null,4));
});
app.post('/findUserByEmail', (req, res) => {
    const mailAddress = req.body.email;
    const includeUnsubbedUsers = req.body.includeUnsubbedUsers;
    const idNum = findUserByEmail(mailAddress,includeUnsubbedUsers);
    console.log(`** Data of User[${idNum}](${userDataBase[idNum].name}) Sent`);
    return res.end(JSON.stringify(userDataBase[idNum],null,4));
});
app.post('/findUserById', (req, res) => {
    const idNum = req.body.id;
    console.log(`** Data of User[${idNum}](${userDataBase[idNum].name}) Sent`);
    return res.end(JSON.stringify(userDataBase[idNum],null,4));
});
app.post('/delUserById', (req, res) => {
    const idNum = req.body.id;
    userDataBase[idNum].subStatus = "false";
    console.log(`** Data of User[${idNum}](${userDataBase[idNum].name}) unsubscribed`);
    return res.end(`User[${idNum}](${userDataBase[idNum].name}) unsubbed`);
});
app.post('/delLastUser', (req, res) => {
    console.log("** Deleted last user");
    nextIdNum--;
    console.log(`nextIdNum : ${nextIdNum}`);
    userDataBase.pop();
    updateUserDB("delLastUser");
    return res.end(JSON.stringify(userDataBase,null,4));
});
// ======================================================================


// Mail Error Handling
app.post('/complainthandling', (req, res) => {
    const requestBody = req.body;
    if(requestBody.notificationType == "AmazonSnsSubscriptionSucceeded") return res.status(200).send("OK");
    else if(requestBody.notificationType == "Complaint"){
        // 여기서 필요한 정보는: Complaint한 사람 주소인데, 로그는 전체를 남겨두자
        const user = requestBody.mail.destination.toString();
        console.log(`complain by ${user}`);
        complaintDB.push(requestBody);
        updateComplaintDB();
        const userIdNum = findUserByEmail(user,"false");
        if(userIdNum == -1) return res.status(404).send("Not Found"); // complaint notification이 왔는데 우리 DB에서는 못찾은 상황. 발생 가능성 매우 드묾.
        else{
            userDataBase[userIdNum].subStatus = "false";
            console.log(`user[${userIdNum}] - ${userDataBase[userIdNum].name}, ${userDataBase[userIdNum].email} unsubscribed`);
            return res.status(200).send("OK");
        }
    }
    else return res.status(404).send("Not Found");
});
app.post('/bouncehandling', (req, res) => {
    const requestBody = req.body;
    if(requestBody.notificationType == "AmazonSnsSubscriptionSucceeded") return res.status(200).send("OK");
    else if(requestBody.notificationType == "Bounce"){
        // 여기서 필요한 정보는: bounce한 사람 주소인데, 로그는 전체를 남겨두자
        const user = requestBody.mail.destination.toString();
        console.log(`bounce by ${user}`);
        bounceDB.push(requestBody);
        updateBounceDB();
        const userIdNum = findUserByEmail(user);
        if(userIdNum == -1) return res.status(404).send("Not Found"); // bounce notification이 왔는데 우리 DB에서는 못찾은 상황. 발생 가능성 매우 드묾.
        else{
            userDataBase[userIdNum].subStatus = "false";
            console.log(`user[${userIdNum}] - ${userDataBase[userIdNum].name}, ${userDataBase[userIdNum].email} unsubscribed`);
            return res.status(200).send("OK");
        }
    }
    else return res.status(404).send("Not Found");
});




server.listen(PORT, function(){ 
    console.log(`Server is running at port ${PORT}`);
});

setInterval(() => {
    // refresh(nextIdNum);
    if(DayOrNight == "Day"){
        refresh(nextIdNum);
        console.log("*** interval reached");
    }
    else console.log("* interval skipped - Night");
}, refreshTimeInMinutes*60*1000);
// console.log("refreshed") 가 아니라, refresh() 를 실행시켜야 함.