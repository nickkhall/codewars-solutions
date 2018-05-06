const snail = arr => {
  let final = [];

  while (arr.length > 0) {
    // first column
    final = final.concat.apply(final, arr.splice(0,1));

    // last items in columns
    for (let c = 0; c < arr.length - 1; c++) {
      final = final.concat.apply(final, arr[c].splice(arr.length))
    }

    //grab the last row
    let temp = [].concat.apply([], arr.splice(arr.length-1, 1)).reverse();
    final = final.concat.apply(final, temp);

    //grab the first column
    for (let fC = arr.length - 1; fC >= 0; fC--) {
      final = final.concat(arr[fC].splice(0,1));
    }
  }
  return final;
}



// TESTS
console.log(snail([[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]));
console.log('-------------------------------------------------------------------');
console.log('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]');
console.log('-------------------------------------------------------------------');
console.log(snail([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]));
console.log('-------------------------------------------------------------------');
console.log('[1,2,3,4,5,10,15,20,25,24,23,22,21,16,11,6,7,8,9,14,19,18,17,12,13]');
// console.log('-------------------------------------------------------------------');
// console.log(snail([[1,2,3,4,5,6],[20,21,22,23,24,7],[19,32,33,34,25,8],[18,31,36,35,26,9],[17,30,29,28,27,10],[16,15,14,13,12,11]]));
// console.log('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]');
// [1,2,3,4]

// [12,13,14,5]
// [11,16,15,6]

// [10,9,8,7]
