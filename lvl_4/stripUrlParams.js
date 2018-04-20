function stripUrlParams(url, paramsToStrip){
  const urlCopy = url;

  const splitArr = urlCopy.split('.');

  console.log({ splitArr });
}


// TESTS
console.log(stripUrlParams('www.codewars.com?a=1&b=2&a=2'));
console.log('SHOULD BE:',  'www.codewars.com?a=1&b=2');
console.log(stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']));
console.log('SHOULD BE:',  'www.codewars.com?a=1');
console.log(stripUrlParams('www.codewars.com', ['b']));
console.log('SHOULD BE:',  'www.codewars.com');
