function solve(str) {


}


// TESTS
console.log(solve("3(ab)"));
console.log('SHOULD BE:', "ababab");
console.log(solve("2(a3(b))"));
console.log('SHOULD BE:', "abbbabbb");
console.log(solve("3(b(2(c)))"));
console.log('SHOULD BE:', "bccbccbcc");
console.log(solve("k(a3(b(a2(c))))"));
console.log('SHOULD BE:', "kabaccbaccbacc");
