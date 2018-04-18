function topScores(records, nTop) {
  if (nTop <= 0) return [];

  const finalRecords = records.reduce((acc,cur,index) => {
    const name = cur[0];

    if (acc.find(a => a[0] === name)) {
      acc = acc.filter(v => !v.find(x => x === name));
    }

    acc.push(cur);

    acc = acc.sort((a,b) => {
      if (a[1] > b[1]) return -1;
      if (a[1] < b[1]) return 1;
      return 0;
    });

    return acc;
  }, []);

  return finalRecords.slice(0, nTop);
}








// TESTS
console.log(topScores([["John", 100],["John", 120],["John", 300]], 2));
console.log('\n');
console.log('Should be:', [["John", 300]]);
console.log('-----------------------------------------');
console.log(topScores([["Peter", 100],["Parker", 120],["Mary", 50],["Jane", 600]], 3));
console.log('\n');
console.log('Should be:', [["Jane", 600],["Parker", 120],["Peter", 100]]);
console.log('-----------------------------------------');
console.log(topScores([["Sauron", 1000],["Frodo", 500],["Frank", 500],["Bilbo", 100]], 3));
console.log('\n');
console.log('Should be:', [["Sauron", 1000],["Frank", 500],["Frodo", 500]]);
console.log('-----------------------------------------');
console.log(topScores([["No", 100],["Results", 250],["From", 600],["Negative", 100],["Numbers", 10]], -1));
console.log('\n');
console.log('Should be:', []);
console.log('-----------------------------------------');
console.log(topScores([["Sauron", 1000],["Frodo", 500],["Frank", 500],["Nick", 1429],["Ben", 229],["John", 419],["Jimmy", 959],["Jennifer", 4209],["Bilbo", 100]], 5));
console.log('\n');
console.log('Should be:', [["Jennifer", 4209],["Nick", 1429],["Sauron", 1000],["Jimmy", 959],["Frank", 500]]);
console.log('-----------------------------------------');
