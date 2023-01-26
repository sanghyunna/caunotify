export function delDup(dataArray){
    const len = dataArray.length;
    let res = [];
    let count = 1;
    let found = 0;
    res.push(dataArray[0]);
    // dataArray에 있는 것을 하나 집어서
    // res의 모든 원소와 대조하고
    // 겹치는 것이 하나도 없었을 경우 (found = -1일 경우)
    // 해당 dataArray[i] 를 res로 push한다
    for(let i=0;i<len;i++){
        for(let j=0;j<count;j++){
            if(dataArray[i] == res[j]){found = 1; break;}
        }
        if(found != 0){ // 발견
            found = 0;
        }
        else{ // 발견 안됨
            res.push(dataArray[i]);
            count++;
        }
    }
    return res;
}
// 만들기는 했는데 생각해보니 쓸 필요가 없는 함수여서 일단은 패스