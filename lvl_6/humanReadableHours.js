const readableTimetable = days => {
  if (!days || days.length < 1) return [];
  let dayArr = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

  days.sort((a,b) => {
    console.log(dayArr.indexOf(a.day), days.indexOf(a))
    if (dayArr.indexOf(a.day) < days.indexOf(a.day)) return -1;
    if (dayArr.indexOf(a.day) > days.indexOf(a.day)) return 1;
    return 0;
  });

  console.log({ days })

  return days.reduce((acc,cur,index,arr) => {
    const next = arr[index+1];
    console.log({ cur, next })
    if (next && next.to !== cur.to) {
      acc += `${cur.day.toUpperCase()}: ${cur.from} - ${cur.to}\n`;
      return acc;
    }

    return acc;
  }, '');
};


// TESTS
const test0 = [
    { "day": "wed", "from": "11:00", "to": "23:00" },
    { "day": "sat", "from": "10:00", "to": "22:00" },
    { "day": "mon", "from": "11:00", "to": "23:00" },
    { "day": "thu", "from": "12:00", "to": "22:00" },
    { "day": "tue", "from": "11:00", "to": "22:00" },
    { "day": "sun", "from": "11:00", "to": "23:00" },
    { "day": "fri", "from": "12:00", "to": "23:00" }
];

const test1 = [
    { "day": "mon", "from": "11:00", "to": "23:00" },
    { "day": "tue", "from": "11:00", "to": "23:00" },
    { "day": "wed", "from": "11:00", "to": "23:00" },
    { "day": "thu", "from": "12:00", "to": "23:00" },
    { "day": "fri", "from": "12:00", "to": "23:00" },
    { "day": "sat", "from": "10:00", "to": "23:00" },
    { "day": "sun", "from": "11:00", "to": "23:00" }
];

const test2 = [
    { "day": "mon", "from": "11:00", "to": "23:00" },
    { "day": "tue", "from": "11:00", "to": "23:00" },
    { "day": "thu", "from": "11:00", "to": "23:00" },
    { "day": "sat", "from": "11:00", "to": "23:00" },
    { "day": "sun", "from": "11:00", "to": "23:00" }
];

const Test = { assertEquals: (actual, expected) => {
  console.log('actual:', actual, '\nexpected:', expected)
}};
//
// Test.assertEquals(readableTimetable([]), []);
//
Test.assertEquals(readableTimetable(test0), `MON: 11:00 - 23:00
TUE: 11:00 - 22:00
WED: 11:00 - 23:00
THU: 12:00 - 22:00
FRI: 12:00 - 23:00
SAT: 10:00 - 22:00
SUN: 11:00 - 23:00`);

// Test.assertEquals(readableTimetable(test1), `MON - WED: 11:00 - 23:00
// THU - FRI: 12:00 - 23:00
// SAT: 10:00 - 23:00
// SUN: 11:00 - 23:00`);
//
// Test.assertEquals(readableTimetable(test2), `MON - TUE: 11:00 - 23:00
// THU: 11:00 - 23:00
// SAT - SUN: 11:00 - 23:00`);
