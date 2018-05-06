function memAlloc(banks) {
  const highestBankIndex = banks.indexOf(Math.max(...banks));
  const highestBank = Math.max(...banks);
  let infiniteLoop = false;
  // My bank 'vault', to keep track of dispersing highestBank (currentBankValue)
  let currentBankValue = highestBank;

  for (let b = 0; b < highestBank; b++) {
    const p = (b + highestBankIndex) % banks.length;
    let currentBank = banks[p];
    currentBankValue -= 1;
    console.log({ currentBank, currentBankValue, b, highestBank });
  }
}





// TESTS
const Test = { assertEquals: (actual, expected, testNumber) => {
  if (expected !== actual) {
    throw new Error(`\nGot: ${actual} \n---------------\nExpected: ${expected}\n\n`);
  }
  console.info(`SUCCESS for test number ${testNumber}!`);
}};

Test.assertEquals(memAlloc([5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 600]), 70, 1);
Test.assertEquals(memAlloc([53, 21, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 60]), 316, 2);
Test.assertEquals(memAlloc([14, 21, 10, 0, 1, 7, 0, 14, 3, 12, 8, 10, 17, 12, 0, 19]), 826, 3);
Test.assertEquals(memAlloc([5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6]), 5042, 4);
Test.assertEquals(memAlloc([17, 17, 3, 5, 1, 10, 6, 2, 0, 12, 8, 11, 16, 2, 1, 6]), 158378, 5);


// RULES:
// The reallocation routine operates in cycles. In each cycle, it finds the memory bank with the most blocks
//   (ties won by the lowest-numbered memory bank) and redistributes those blocks among the banks.
// To do this, it removes all of the blocks from the selected bank, then moves to the next (by index) memory bank and inserts one of the blocks.
// It continues doing this until it runs out of blocks; if it reaches the last memory bank, it wraps around to the first one.
//
// WHAT TO RETURN:
// We need to know how many redistributions can be done before a blocks-in-banks configuration is produced that has been seen before.
