function getStartTime(schedules, duration) {
  let earliest = 0;
  console.log({ schedules: schedules.map(s => console.log({ s })), duration });

  for (let i = 0; i < schedules.length; i++) {
    const employeeSchedule = schedules[i];
    const earliestTime = employeeSchedule[i];

    for (let x = 0; x < employeeSchedule.length; x++) {
      const employeeTimeArr = employeeSchedule[x];
      const employeeEarliestHour = parseInt(employeeTimeArr[0].split(':')[0]);
      const employeeEarliestMinute = parseInt(employeeTimeArr[0].split(':')[1]);

      const employeeLatestHour = parseInt(employeeTimeArr[1].split(':')[0]);
      const employeeLatestMinute = parseInt(employeeTimeArr[1].split(':')[1]);

      const employeeLatestFullTime = employeeLatestHour + getTime(employeeLatestMinute);

      if (x === 0) {
        earliest = employeeLatestFullTime;
      }
      if (employeeLatestFullTime < earliest) { console.log('we have a better time available') }

      console.log({ employeeEarliestHour, employeeEarliestMinute, employeeLatestHour, employeeLatestMinute });
      console.log('\n');
      console.log({ employeeLatestFullTime });
      console.log('\n');
      console.log('--------------------------------------------------------------------------------------------------------');
    }
    console.log({ earliest });
    if (earliest.match(/\./g)) {
      console.log('you have a deci deci brah!', earliest)

    }

    console.log('you can return reggy')
  }
}

function getTime(time) {
  return time / 60;
}




// TESTS ---------------------------------------------------------------------------------------------------
var schedulesArr = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
console.log(getStartTime(schedulesArr, 60), '\n-------------\nPASSED:', getStartTime(schedulesArr, 60) === '12:15', '\n');
// console.log(getStartTime(schedulesArr, 90), '\n-------------\nPASSED:', getStartTime(schedulesArr, 90) === null, '\n');



// INSTRUCTIONS
//
// The businesspeople among you will know that it's often not easy to find an appointment.
// In this kata we want to find such an appointment automatically.
// You will be given the calendars of our businessperson and a duration for the meeting.
// Your task is to find the earliest time, when every businessperson is free for at least that duration.

// RULES
//
// - All times in the calendars will be given in 24h format "hh:mm", the result must also be in that format
// - A meeting is represented by its start time (inclusively) and end time (exclusively) -> if a meeting takes place from 09:00 - 11:00, the next possible start time would be 11:00
// - The businesspeople work from 09:00 (inclusively) - 19:00 (exclusively), the appointment must start and end within that range
// - If the meeting does not fit into the schedules, return null or None as result
// - The duration of the meeting will be provided as an integer in minutes