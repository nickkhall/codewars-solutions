const grabLastInArr = arr => arr[arr.length - 1];
const grabFirstInArr = arr => arr[0];

const snail = arr => {
  if (arr.length <= 0) return 'you fucking suck dude gimme an array';
  if (arr.length === 1) return arr;
  let finalArr = [];
  const firstArr = arr[0];
  finalArr = finalArr.concat(arr[0]);
  arr.shift();
  const lastArr = arr[arr.length-1];
  // arr.pop();
  let tempArr = [];

  for (let a = 0; a < arr.length; a++) {
    for (let i = 0; i < arr[a].length; i++) {
      tempArr.push(arr[a][i]);
    }
  }

  console.log({ tempArr })

  for (let n = 0; n < tempArr.length; n++) {
    const len = n % arr.length;
    const item = arr[len];
    const switchToFirst = item.length + arr.length;
    console.log({ len, item, switchToFirst })
    if (item === lastArr) {
      console.log('DING DING DING!!! LAST ARR', { item, lastArr })
      finalArr = finalArr.concat(grabLastInArr(item));
      item.pop();
      lastArr.pop();
      continue;
    }
    if (n > switchToFirst) {
      console.log('this is after the last row has been all ADDED')
      finalArr = finalArr.concat(grabFirstInArr(item));
      item.shift();
      continue;
    }
    finalArr = finalArr.concat(grabLastInArr(item));
    item.pop();
  }

  return finalArr;
}


// TESTS
console.log(snail([[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]));
console.log('-------------------------------------------------------------------');
console.log([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);

// [1,2,3,4]

// [12,13,14,5]
// [11,16,15,6]

// [10,9,8,7]
