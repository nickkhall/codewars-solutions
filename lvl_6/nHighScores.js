function topScores(records, nTop) {
  if (nTop <= 0) return [];

  const finalRecords = records.reduce((acc,cur,index) => {
    const name = cur[0];
    const score = cur[1];
    const duplicate = acc.find(a => a[0] === name);

    if (!duplicate) {
      acc.push(cur);
      return acc;
    }

    if (score > duplicate[1]) {
      duplicate[1] = score;
    }

    return acc;
  }, []);


  finalRecords.sort((a,b) => {
    const diff = b[1] - a[1];
    if (diff !== 0) return diff;

    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  return finalRecords.slice(0, nTop);
}







// TESTS
// console.log(topScores([["John", 100],["John", 120],["John", 300]], 2));
// console.log('\n');
// console.log('Should be: \n', [["John", 300]]);
// console.log('-----------------------------------------');
// console.log(topScores([["Peter", 100],["Parker", 120],["Mary", 50],["Jane", 600]], 3));
// console.log('\n');
// console.log('Should be: \n', [["Jane", 600],["Parker", 120],["Peter", 100]]);
// console.log('-----------------------------------------');
// console.log(topScores([["Sauron", 1000],["Frodo", 500],["Frank", 500],["Bilbo", 100]], 3));
// console.log('\n');
// console.log('Should be: \n', [["Sauron", 1000],["Frank", 500],["Frodo", 500]]);
// console.log('-----------------------------------------');
// console.log(topScores([["No", 100],["Results", 250],["From", 600],["Negative", 100],["Numbers", 10]], -1));
// console.log('\n');
// console.log('Should be: \n', []);
// console.log('-----------------------------------------');
console.log(topScores([["Sauron", 1000],["Frodo", 500],["Frank", 500],["Nick", 1429],["Ben", 229],["John", 419],["Jimmy", 959],["Jennifer", 4209],["Bilbo", 100]], 5));
console.log('\n');
console.log('Should be: \n', [["Jennifer", 4209],["Nick", 1429],["Sauron", 1000],["Jimmy", 959],["Frank", 500]]);
console.log('-----------------------------------------');
