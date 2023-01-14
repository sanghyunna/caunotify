import moment from 'moment-timezone';
function DayOrNight(){
    const krTimeHr = parseInt(moment().tz("Asia/Seoul").format('H'));
    if(krTimeHr < 9 || krTimeHr >= 22) return "Night";
    else return "Day";
}
console.log(parseInt(moment().tz("Asia/Seoul").format('HHmmss')));

console.log(DayOrNight());