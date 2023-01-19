function setTimeDone(){
    timeIsDone = "true";
}


let timeIsDone = false;

console.log("started");

setTimeout(setTimeDone,2000);

console.log(timeIsDone);

while(1){
    if(timeIsDone == "true") break;
} 