function isValid(b) {
  console.log({ b });
  return b.split('').reduce((acc,cur,index) => {
    if (index === 0) {
      acc += cur;
      return acc;
    }


  }, '');
}

function validBraces(braces){
  if (isValid(braces)) return true;

  return false;
}


// TESTS
const Test = {
  assertEquals: (actual, expected) => {
    if (!actual === expected) {
      console.error(false);
      return;
    }
    console.log('SUCCESS');
  }
};

Test.assertEquals(validBraces( "()" ), true);
Test.assertEquals(validBraces( "[(])" ), false);
