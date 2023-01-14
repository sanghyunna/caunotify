// import * as keys from "../../SES_Access_Key.json" assert { type: "json" }
import AWS from 'aws-sdk'
import fs from "fs"
import { encryptIntToString } from "./encrypter.js"

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let keys = '';

const data = fs.readFileSync("../../SES_Access_Key.json", "utf-8")
keys = JSON.parse(data);

// console.log(data);
// console.log(keys.accessKey);
// console.log(keys.secretAccessKey);

const SES_CONFIG = {
    accessKeyId: keys.accessKey,
    secretAccessKey: keys.secretAccessKey,
    region: 'ap-northeast-1', 
};// ap-northeast-1 은 도쿄라서 바꾸긴 했는데 안되면 원래대로 바꿀것.

const AWS_SES = new AWS.SES(SES_CONFIG);

export function sendEmail(recipientEmail, bodyContent, mailTitle){ // Title 에 수신자 이름 포함할 것
	  let params = {
      Source: "mail@caunotify.me",
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
          Charset: "UTF-8",
          Data: bodyContent
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: mailTitle
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};
// export function sendTemplateEmail(recipientEmail,recipientName,id){
// 	const urlHash = encryptIntToString(id);
//   console.log(`${id} => ${urlHash}`);
//   const unsubscribeUrl = `caunotify.me/unsubscribe?id=${urlHash}`;
// 	const bodyContent = `<html lang="ko">
//   <title>caunotify.me Mail</title>
//   <head>
//     <meta charset="UTF-8">
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
//     <style>
//       @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

//       a:visited {
//         color: #4a4a4a;
//         background-color: transparent;
//         text-decoration: none;
//       }

//       a:active {
//         color: yellow;
//         background-color: transparent;
//       }
//     </style>
//   </head>
//   <body>
//     <table align="center" width="600" border="0" cellpadding="0" cellspacing="0">
//       <tbody>
//         <tr>
//           <td style="border-bottom:4px solid #374670;">
//             <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
//               <tbody>
//                 <tr>
//                   <td>
//                     <img src="https://caunotify.s3.ap-northeast-1.amazonaws.com/logo_smaller.png" width="150" loading="lazy">
//                   </td>
//                 </tr>
//                 <tr>
//                   <td height="7" colspan="2"></td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//         <tr bgcolor="#FFFFFF">
//           <td style="border-left:4px solid #2155a4; border-right:4px solid #2155a4; padding:20px 20px 15px 20px;">
//             <table width="556" align="center" border="0" cellspacing="0" cellpadding="0">
//               <tbody align="center">
//                 <tr>
//                   <td width="555" height="70">
//                     <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size:21px; font-family: 'Nanum Gothic', sans-serif; line-height:27px; letter-spacing:-1.5px; color:#666666;">
//                       <tbody>
//                         <tr>
//                           <td align="center" width="150" style="padding-bottom:10px">
//                             <img src="https://caunotify.s3.ap-northeast-1.amazonaws.com/mail_smaller.png" width="80" loading="lazy">
//                           </td>
//                           <td style="padding-right:20px">
//                             <strong>${recipientName}님, <br>구독해주셔서 감사합니다. </strong>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td height="70" align="left" style="font-size: 13px; font-family: 'Nanum Gothic', sans-serif; word-wrap: break-word; letter-spacing:-1px; color:#373737; border:3px solid #373737; padding:25px 35px 35px">
//                     <p> ${recipientName}님의 구독이 성공적으로 완료되었습니다.</p>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table width="556" border="0" align="center" cellspacing="0" cellpadding="0">
//               <tbody>
//                 <tr>
//                   <td height="25"></td>
//                 </tr>
//                 <tr align="center">
//                   <td align="center">
//                     <a href="http://caunotify.me" target="_blank" rel="noreferrer noopener">
//                       <img src="https://caunotify.s3.ap-northeast-1.amazonaws.com/button_smaller.jpg" alt="caunotify.me 바로가기" width="200" align="right" loading="lazy">
//                     </a>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td height="12"></td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//         <tr>
//           <td bgcolor="#2155a4" style="border-left:4px solid #2155a4; border-right:4px solid #2155a4;">
//             <table width="100%" border="0" cellpadding="0" cellspacing="0">
//               <tbody>
//                 <tr>
//                   <td align="left" valign="top" style="font-family: 'Nanum Gothic', sans-serif; font-size:11px; color:#e6e6e6; line-height:120%; padding:21px 10px 20px 20px;" bgcolor="#2155a4"> 더 이상 공지를 받고 싶지 않으시다면, <strong>
//                       <a href="${unsubscribeUrl}" target="_blank" style="color:#e6e6e6; text-decoration:none;" rel="noreferrer noopener"> 구독 해지 </a>
//                     </strong> 를 눌러 해지해주세요! <br>문의사항은 <strong>
//                       <a href="mailto: admin@caunotify.me" target="_blank" style="color:#e6e6e6; text-decoration:none;" rel="noreferrer noopener"> admin@caunotify.me </a>
//                     </strong> 로 전달해주세요!&#128513; </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
// </html>`;
//   	let params = {
//       	"Source": "mail@caunotify.me",
//       	"Template": "ExampleTemplate",
//       	"Destination": {
//             "ToAddresses": [recipientEmail]
//       	},
//       	"TemplateData": `${bodyContent}`,
//       	"ReplyToAddresses": [
//         "admin@caunotify.me"
//       	]
//     };
// 	console.log(`** subscription mail sent to: ${recipientName}(${recipientEmail})`);
//     return AWS_SES.sendTemplatedEmail(params).promise();
// };
// // console.log(SES_CONFIG);
// sendTemplateEmail("na_sanghyun@naver.com","나나상현",99);

// Handle promise's fulfilled/rejected states
// sendEmail_("na_sanghyun@naver.com").then(
//   function(data) {
//     console.log(data);
//   }).catch(
//     function(err) {
//     console.error(err, err.stack);
//   });

// sendTemplateEmail("na_sanghyun@naver.com");

// export default {
//     sendEmail,
//     sendTemplateEmail,
// };
