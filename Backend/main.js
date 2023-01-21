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
import { decryptStringToInt, encryptIntToString } from "./encrypter.js"
import { DayOrNight } from "./dayOrNight.js";
import { sendTemplateEmail } from "./sendEmail.js";
import { mailHandler } from "./mailHandler.js";
import { simpleUserInfo } from "./simpleUserInfo.js";
import { isItAuthed } from "./commandAuth.js";

function updateUserDB(src){
    fs.writeFileSync(path.join(__dirname, 'userDB_log', 'userDB.json'), JSON.stringify(userDataBase,null,4), { encoding: "utf8", flag: "w" });
    fs.writeFileSync(`${__dirname}/userDB_log/log_${moment().tz("Asia/Seoul").format('YYMMDD_HH_mm_ss')}.json`, JSON.stringify(userDataBase,null,4), { encoding: "utf8", flag: "a" });
    console.log(`***UserDB updated by ${src}\n`);
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
    if(includeUnsubbedUsers == "false"){
        for(let i=0;i<nextIdNum;i++){
            if(userDataBase[i].email == mailAddress && userDataBase[i].subStatus == "true") return i;
        }
    }
    else if(includeUnsubbedUsers == "true"){ // 비구독자까지 포함한 요청인 경우 배열로 모든 경우를 반환함
        let res = [];
        for(let i=0;i<nextIdNum;i++){
            if(userDataBase[i].email == mailAddress && userDataBase[i].subStatus == "true") res.push(i);
        }
        if(res.length == 0) return -1;
        else return res;
    }
    return -1;
}
function findUserByName(username){
    for(let i=0;i<nextIdNum;i++){
        if(userDataBase[i].name == username) return i;
    }
    return -1;
}

// __dirname 생성
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 서버 기본 세팅
const PORT = 3000;
const app = express();
const server = http.createServer(app);
const refreshTimeInMinutes = 30; // 30분에 한번씩 refresh() 실행


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
app.get('/css/main3.css', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'css', 'main3.css'));
});

app.get('/unsubscribe', function(req, res) { // 구독해지 요청
    const idNum = decryptStringToInt(req.query.id);
    if(idNum != "" && idNum > 0 && idNum < nextIdNum){
        if(userDataBase[idNum].subStatus == "false"){
            return res.send(`이미 해지된 구독입니다. 새로 구독하시려면 홈페이지를 이용해주세요.`);
        }
        else{
            userDataBase[idNum].subStatus = "false";
            console.log(`*** unsubbed: ${simpleUserInfo(userDataBase[idNum],"true")}`);
            updateUserDB("unsubscribe request");
            return res.send(`성공적으로 해지되었습니다.<script>alert(${userDataBase[idNum].name}님의 구독이 성공적으로 해지되었습니다. 이용해주셔서 감사합니다.);</script>`);
        }
    }
    else{
        res.send(`이용자를 찾을 수 없습니다.`);
    }
});

app.post('/newuser', (req, res) => { // 정상작동 확인함
    let requestBody = req.body;
    if(requestBody.name != undefined){
        if(findUserByEmail(requestBody.email,"false") != -1){
            const idNum = findUserByEmail(requestBody.email,"false");
            const subbedNotices = simpleUserInfo(userDataBase[idNum],"false");
            const urlHash = encryptIntToString(idNum);
            const unsubscribeUrl = `https://caunotify.me/unsubscribe?id=${urlHash}`;
            const reply = `function cc(){return confirm("[${subbedNotices}]를 구독하는 ${requestBody.email} 이메일이 존재합니다. 새로 구독하시려면 먼저 구독을 해지해야 합니다. '확인'을 누르시면 기존 구독이 해지됩니다.")}!0==cc()?(alert("기존 구독이 해지되었습니다. 새 구독 정보를 입력해주세요."),location.href="${unsubscribeUrl}"):(alert("기존 구독을 해지하지 않았습니다."),location.href="https://caunotify.me");`;
            return res.send(`<script>${reply}</script>`);
        }

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
        if(requestBody.adpr != "true")              requestBody.adpr = "false";
        if(requestBody.dorm != "true")              requestBody.dorm = "false";
        if(requestBody.upreJob != "true")           requestBody.upreJob = "false";
        if(requestBody.davinci != "true")           requestBody.davinci = "false";
        if(requestBody.polaris != "true")           requestBody.polaris = "false";
        // console.log(`<Received>\n\tName:${requestBody.name}\n\tindustSec:${requestBody.industSec}\n\tsoftware:${requestBody.software}\n\tCAUnotice:${requestBody.CAUnotice}`);
        requestBody.id = parseInt(nextIdNum); // key값 추가
        requestBody.subStatus = "true"; 
        nextIdNum++; // 다음 사용자를 위해 증감
        fs.writeFileSync(path.join(__dirname, 'userDB_log', 'nextIdNum.txt'), nextIdNum.toString(), "utf8");

        console.log(`*** New User: ${simpleUserInfo(requestBody,"true")}`);

        // 가끔 id가 string으로 저장되는 오류가 있어서 코드 추가

        userDataBase.push(requestBody); // DB array에 저장
        // console.log(userDataBase);
        updateUserDB("newuser");
        mailHandler(requestBody.name, requestBody.email, userDataBase[requestBody.id], requestBody.id, "true"); // 가입메일
        // recipientName, recipientEmail, data, id, IsItSubMail
        return res.send("<script>alert('성공적으로 구독하였습니다!');location.href='https://caunotify.me';</script>"); 
    } else {
        return res.send("<script>alert('문제가 발생했습니다. 구독이 완료되지 않았습니다.');location.href='https://caunotify.me';</script>");
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
    if(isItAuthed(req.body.auth) != 0) return res.send("Not authorized");
    console.log("refresh requested\n");
    refresh(nextIdNum,0);
    return res.send("Refreshed");
});
app.post('/currentuserDB', (req, res) => {
    if(isItAuthed(req.body.auth) != 0) return res.send("Not authorized");
    console.log("** Current UserDB Sent")
    console.log(`nextIdNum : ${nextIdNum}\n`);
    let simpleInfoStorage = [];
    for(let i=0;i<nextIdNum;i++){
        simpleInfoStorage.push(simpleUserInfo(userDataBase[i],"true"));
    }
    return res.send(simpleInfoStorage);
});
app.post('/findUserByEmail', (req, res) => {
    if(isItAuthed(req.body.auth) != 0) return res.send("Not authorized");
    const mailAddress = req.body.email;
    // console.log(`mailaddress = ${mailAddress}`);
    const includeUnsubbedUsers = req.body.includeUnsubbedUsers;
    // console.log(`include unsubbed : ${includeUnsubbedUsers}`);
    const idNum = findUserByEmail(mailAddress,includeUnsubbedUsers);
    if(idNum == -1) return res.send("Not Found");
    console.log(`** Data of User[${idNum}](${userDataBase[idNum].name}) Sent\n`);
    return res.send(simpleUserInfo(userDataBase[idNum],"true"));
});
app.post('/findUserByName', (req, res) => {
    if(isItAuthed(req.body.auth) != 0) return res.send("Not authorized");
    const username = req.body.name;
    const idNum = findUserByName(username);
    if(idNum == -1) return res.send("Not Found");
    console.log(`** Data of User[${idNum}](${userDataBase[idNum].name}) Sent\n`);
    return res.send(simpleUserInfo(userDataBase[idNum],"true"));
});
app.post('/findUserById', (req, res) => {
    if(isItAuthed(req.body.auth) != 0) return res.send("Not authorized");
    const idNum = req.body.id;
    if (userDataBase[idNum].name == undefined) return res.send("Not Found");
    console.log(`** Data of User[${idNum}](${userDataBase[idNum].name}) Sent\n`);
    return res.send(simpleUserInfo(userDataBase[idNum],"true"));
});
app.post('/delUserById', (req, res) => {
    if(isItAuthed(req.body.auth) != 0) return res.send("Not authorized");
    const idNum = req.body.id;
    if (userDataBase[idNum].name == undefined) return res.send("Not Found");
    userDataBase[idNum].subStatus = "false";
    console.log(`** Data of User[${idNum}](${userDataBase[idNum].name}) unsubscribed`);
    updateUserDB("delUserById");
    return res.send(`User[${idNum}](${userDataBase[idNum].name}) unsubbed`);
});
app.post('/delLastUser', (req, res) => {
    if(isItAuthed(req.body.auth) != 0) return res.send("Not authorized");
    console.log("** Deleted last user");
    nextIdNum--;
    console.log(`nextIdNum : ${nextIdNum}`);
    fs.writeFileSync(path.join(__dirname, 'userDB_log', 'nextIdNum.txt'), nextIdNum.toString(), "utf8");
    userDataBase.pop();
    updateUserDB("delLastUser");
    return res.send(JSON.stringify(userDataBase,null,4));
});
// ======================================================================


// Mail Error Handling
app.post('/complainthandling', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    // if(requestBody.notificationType == "AmazonSnsSubscriptionSucceeded") return res.status(200).send("OK");
    if(requestBody.notificationType == "Complaint"){
        // 여기서 필요한 정보는: Complaint한 사람 주소인데, 로그는 전체를 남겨두자
        const user = requestBody.mail.destination.toString();
        console.log(`complain by ${user}`);
        complaintDB.push(requestBody);
        updateComplaintDB();
        const userIdNum = findUserByEmail(user,"true");
        if(userIdNum == -1) return res.status(404).send("Not Found"); // complaint notification이 왔는데 우리 DB에서는 못찾은 상황. 발생 가능성 매우 드묾.
        else{
            userDataBase[userIdNum].subStatus = "false";
            updateUserDB("complaint");
            console.log(`user[${userIdNum}] - ${userDataBase[userIdNum].name}, ${userDataBase[userIdNum].email} unsubscribed`);
            return res.status(200).send("OK");
        }
    }
    else return res.status(404).send("Not Found");
});
app.post('/bouncehandling', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    // if(requestBody.notificationType == "AmazonSnsSubscriptionSucceeded") return res.status(200).send("OK");
    if(requestBody.notificationType == "Bounce"){
        // 여기서 필요한 정보는: bounce한 사람 주소인데, 로그는 전체를 남겨두자
        const user = requestBody.mail.destination.toString();
        console.log(`bounce by ${user}`);
        bounceDB.push(requestBody);
        updateBounceDB();
        const userIdNum = findUserByEmail(user,"true");
        if(userIdNum == -1) return res.status(404).send("Not Found"); // bounce notification이 왔는데 우리 DB에서는 못찾은 상황. 발생 가능성 매우 드묾.
        else{
            userDataBase[userIdNum].subStatus = "false";
            updateUserDB("bounce");
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
    // console.log(`\n${moment().tz("Asia/Seoul").format('YYMMDD_HH_mm_ss')}`);
    // refresh(nextIdNum,1);
    if(DayOrNight() == "Day"){
        console.log(`\n${moment().tz("Asia/Seoul").format('YYMMDD_HH_mm_ss')}`);
        refresh(nextIdNum,1);
        console.log("*** interval reached");
    }
    else console.log("* interval skipped - Night\n");
}, refreshTimeInMinutes*60*1000);
// console.log("refreshed") 가 아니라, refresh() 를 실행시켜야 함.
