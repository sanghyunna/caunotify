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
export function sendTemplateEmail(recipientEmail,recipientName,id){
	const urlHash = encryptIntToString(id);
  console.log(`${id} => ${urlHash}`);
  const unsubscribeUrl = `caunotify.me/unsubscribe?id=${urlHash}`;
	const bodyContent = ``;
  	let params = {
      	"Source": "mail@caunotify.me",
      	"Template": "ExampleTemplate",
      	"Destination": {
            "ToAddresses": [recipientEmail]
      	},
      	"TemplateData": `${bodyContent}`,
      	"ReplyToAddresses": [
        "admin@caunotify.me"
      	]
    };
	console.log(`** subscription mail sent to: ${recipientName}(${recipientEmail})`);
    return AWS_SES.sendTemplatedEmail(params).promise();
};
// console.log(SES_CONFIG);
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
