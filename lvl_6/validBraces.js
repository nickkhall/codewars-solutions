function isValid(b) {
  const asciiArr = [40, 41, 91, 93, 123, 125];
  const endAsciiArr = asciiArr.filter((a,i) => i % 2 !== 0);


}

function validBraces(braces){
  if (isValid(braces)) return true;

  return false;
}


// TESTS
const Test = {
  assertEquals: (actual, expected) => {
    if (actual !== expected) {
      console.error(false);
      return;
    }
    console.log('SUCCESS');
  }
};

Test.assertEquals(validBraces( "()" ), true);
Test.assertEquals(validBraces( "[(])" ), false);
