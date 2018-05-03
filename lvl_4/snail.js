const snail = arr => {
  return arr.reduce((acc,cur,index) => {
    if (acc.length === 0) {
      acc += cur;
      return acc;
    }
    return acc;
  }, []);
}


// TESTS
const Test = { assertEquals: (actual, expected) => {
  if (actual !== expected) {
    console.log({ actual, expected });
    throw new Error('FAILED!');
  }
  console.log('PASSED!');
}};

Test.assertEquals(snail([[1,2,3],[4,5,6],[7,8,9]]), [1,2,3,6,9,8,7,4,5]);
Test.assertEquals(snail([[1,2,3,4],[16,17,18,19,5],[15,25,20,6],[14,24,21,7],[13,23,22,8],[12,11,10,9],]), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
