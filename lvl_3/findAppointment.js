function getStartTime(schedules, duration) {
  let earliest;
  let latest;

  for (let i = 0; i < schedules.length; i++) {
    const employeeSchedule = schedules[i];
    const earliestTime = employeeSchedule[i];

    for (let x = 0; x < employeeSchedule.length; x++) {
      const employeeTimeArr = employeeSchedule[x];
      const employeeEarliest = employeeTimeArr[0];
      const employeeLatest = employeeTimeArr[1];

      console.log({ employeeEarliest, employeeLatest });
    }

  }
}




// TESTS ---------------------------------------------------------------------------------------------------
var schedulesArr = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
console.log(getStartTime(schedulesArr, 60), '\n-------------\nPASSED:', getStartTime(schedulesArr, 60) === '12:15', '\n');
console.log(getStartTime(schedulesArr, 90), '\n-------------\nPASSED:', getStartTime(schedulesArr, 90) === null, '\n');
