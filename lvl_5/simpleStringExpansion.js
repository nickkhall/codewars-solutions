function solve(str) {


}

// TESTS

const Test = { assertEquals: (actual, expected) => {
  console.log({ actual, expected });
}};

Test.assertEquals(solve("k(a3(b(a2(c))))"),"kabaccbaccbacc");
