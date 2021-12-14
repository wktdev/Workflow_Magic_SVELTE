const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}




function timeVoiceConverstion(time) {

    let originalTime = time; //"7 PM";
    let upcaseTime = time.toUpperCase()
    let timeNoWhiteSpace = upcaseTime.replace(/ /g, "");
    console.log(timeNoWhiteSpace);
    let splitTime = timeNoWhiteSpace.split("");

    let answer = splitTime.map((val, index, arr) => {
        let unTouched = val;
        let result = parseInt(val);

        if (isNaN(result)) {
            return val
        } else {
            return result
        }
    });


    console.log(answer)
    if (typeof answer[1] !== "number") {
        let x = answer.unshift(0);
        console.log(answer)
    }


    if (answer[2] !== ":") {
        answer.splice(2, 0, ":00")
    }


    answer.splice(answer.length - 2, 0, " ")
    return answer.join("");

}

let result = timeVoiceConverstion("4:00pm");

console.log(result)
console.log(convertTime12to24('01:02 PM'));
console.log(convertTime12to24('05:06 PM'));
console.log(convertTime12to24('12:00 PM'));
console.log(convertTime12to24('12:00 AM'));

