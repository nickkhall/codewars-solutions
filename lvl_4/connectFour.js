const whoIsWinner = list => {
  // console.log(list);
  let a = [],
    b = [],
    c = [],
    d = [],
    e = [],
    f = [],
    g = [];
  let board = [a,b,c,d,e,f,g];
  let winner = "Draw";
  let turn = 0;

  const populateBoard = () => {
    const cur = list[turn].split('_');
    board[cur[0].toLowerCase().charCodeAt(0) - 97].push(cur[1].substring(0, 1).toLowerCase());
  }

  const determineWinner = () => {
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 6; y++) {
        const cur = board[x][y];

        if (cur) {
          if (board[x][y-1] && board[x][y-2] && board[x][y-3]) {
            if (cur === board[x][y-1] && cur === board[x][y-2] && cur === board[x][y-3]) {
              if (cur.toLowerCase() === 'y') {
                winner = 'Yellow';
                return;
              } else {
                winner = 'Red';
                return;
              }
            }
          } else if ((board[x+1] && board[x+2] && board[x+3]) && board[x+1][y] && board[x+2][y] && board[x+3][y]) {
            if (cur === board[x+1][y] && cur === board[x+2][y] && cur === board[x+3][y]) {
              if (cur.toLowerCase() === 'y') {
                winner = 'Yellow';
                return;
              } else {
                winner = 'Red';
                return;
              }
            }
          } else if (board[x-1] && board[x-2] && board[x-3] && board[x-1][y-3] && board[x-2][y-3] && board[x-3][y-3]) {
            if (cur === board[x-1][y-1] && cur === board[x-2][y-2] && cur === board[x-3][y-3]) {
              if (cur.toLowerCase() === 'y') {
                winner = 'Yellow';
                return;
              } else {
                winner = 'Red';
                return;
              }
            }
          }
        }
      }
    };

    return winner;
  }

  while (turn < list.length) {
    populateBoard();
    determineWinner();
    turn += 1;
  }

  console.log(`Winner: ${winner}`)
  return winner;
}


// NOTES
// ACROSS
//      A   B   C   D   E   F   G
//    ┌---------------------------┐
// 0  |   |   |   |   |   |   |   |
// 1  |   |   |   |   |   |   |   |
// 2  |   |   |   |   |   |   |   |
// 3  |   |   | Y | Y |   |   |   |
// 4  |   | Y | R | R |   |   | Y |
// 5  | Y | R | R | R | R | Y | Y |
//    └---------------------------┘

// TESTS
// 1
console.log('1 -');
whoIsWinner([
  "A_Yellow",
  "B_Red",
  "B_Yellow",
  "C_Red",
  "G_Yellow",
  "C_Red",
  "C_Yellow",
  "D_Red",
  "G_Yellow",
  "D_Red",
  "G_Yellow",
  "D_Red",
  "F_Yellow",
  "E_Red",
  "D_Yellow"
]);
console.log('Expected: ', "Red");


// 2
console.log('2 -');
whoIsWinner([
  "C_Yellow",
  "E_Red",
  "G_Yellow",
  "B_Red",
  "D_Yellow",
  "B_Red",
  "B_Yellow",
  "G_Red",
  "C_Yellow",
  "C_Red",
  "D_Yellow",
  "F_Red",
  "E_Yellow",
  "A_Red",
  "A_Yellow",
  "G_Red",
  "A_Yellow",
  "F_Red",
  "F_Yellow",
  "D_Red",
  "B_Yellow",
  "E_Red",
  "D_Yellow",
  "A_Red",
  "G_Yellow",
  "D_Red",
  "D_Yellow",
  "C_Red"
]);
console.log('Expected: ', "Yellow");

//3
console.log('3 -');
whoIsWinner([
  "A_Red",
  "B_Yellow",
  "A_Red",
  "E_Yellow",
  "F_Red",
  "G_Yellow"
]);
console.log('Expected: ', "Draw");

// 4
console.log('4 -');
whoIsWinner([
  'D_Red',
  'B_Yellow',
  'A_Red',
  'G_Yellow',
  'D_Red',
  'F_Yellow',
  'C_Red',
  'A_Yellow',
  'C_Red',
  'A_Yellow',
  'F_Red',
  'A_Yellow',
  'E_Red',
  'E_Yellow',
  'C_Red',
  'B_Yellow',
  'D_Red',
  'A_Yellow',
  'D_Red',
  'F_Yellow',
  'A_Red' ]);

console.log("Expected: Yellow");

// 5
console.log('5 -');
whoIsWinner([
  'G_Red',
  'E_Yellow',
  'B_Red',
  'D_Yellow',
  'F_Red',
  'E_Yellow',
  'A_Red',
  'E_Yellow',
  'G_Red',
  'A_Yellow',
  'E_Red',
  'G_Yellow',
  'F_Red',
  'C_Yellow',
  'A_Red',
  'A_Yellow',
  'D_Red',
  'B_Yellow',
  'C_Red',
  'C_Yellow',
  'C_Red',
  'G_Yellow',
  'E_Red',
  'B_Yellow',
  'D_Red',
  'E_Yellow' ]);

  console.log('Expected: Red');

// 6
console.log('6 -');
whoIsWinner([
  'D_Red',
  'C_Yellow',
  'C_Red',
  'C_Yellow',
  'C_Red',
  'A_Yellow',
  'D_Red',
  'C_Yellow',
  'B_Red',
  'A_Yellow',
  'A_Red',
  'B_Yellow',
  'G_Red',
  'D_Yellow',
  'A_Red',
  'E_Yellow',
  'G_Red',
  'D_Yellow',
  'D_Red',
  'E_Yellow',
  'C_Red' ]);

  console.log('Expected: Yellow\n\n');

console.log('7 - ');
whoIsWinner([
  'F_Yellow',
  'G_Red',
  'D_Yellow',
  'C_Red',
  'A_Yellow',
  'A_Red',
  'E_Yellow',
  'D_Red',
  'D_Yellow',
  'F_Red',
  'B_Yellow',
  'E_Red',
  'C_Yellow',
  'D_Red',
  'F_Yellow',
  'D_Red',
  'D_Yellow',
  'F_Red',
  'G_Yellow',
  'C_Red',
  'F_Yellow',
  'E_Red',
  'A_Yellow',
  'A_Red',
  'C_Yellow',
  'B_Red',
  'E_Yellow',
  'C_Red',
  'E_Yellow',
  'G_Red',
  'A_Yellow',
  'A_Red',
  'G_Yellow',
  'C_Red',
  'B_Yellow',
  'E_Red',
  'F_Yellow',
  'G_Red',
  'G_Yellow',
  'B_Red',
  'B_Yellow',
  'B_Red' ]);
console.log('Expected: Red');

console.log('8 - ');
whoIsWinner([
  'B_Red',
  'D_Yellow',
  'B_Red',
  'E_Yellow',
  'C_Red',
  'C_Yellow',
  'B_Red',
  'F_Yellow',
  'A_Red',
  'G_Yellow',
  'B_Red',
  'F_Yellow',
  'F_Red',
  'F_Yellow',
  'F_Red',
  'G_Yellow',
  'A_Red',
  'C_Yellow',
  'G_Red',
  'E_Yellow',
  'E_Red',
  'E_Yellow',
  'G_Red',
  'E_Yellow',
  'B_Red',
  'C_Yellow',
  'E_Red' ]);
console.log('Expected: Yellow');

console.log('9 - ');
whoIsWinner(
  [ 'A_Red',
  'A_Yellow',
  'C_Red',
  'B_Yellow',
  'D_Red',
  'G_Yellow',
  'G_Red',
  'D_Yellow',
  'G_Red',
  'F_Yellow',
  'C_Red',
  'E_Yellow',
  'D_Red',
  'F_Yellow',
  'F_Red',
  'C_Yellow',
  'D_Red',
  'C_Yellow',
  'B_Red',
  'A_Yellow',
  'D_Red',
  'B_Yellow',
  'A_Red',
  'B_Yellow',
  'G_Red',
  'B_Yellow',
  'C_Red',
  'A_Yellow',
  'F_Red',
  'A_Yellow' ]);
console.log('Expected: Yellow');

console.log('10 - ');
whoIsWinner([
  'E_Red',
  'E_Yellow',
  'B_Red',
  'B_Yellow',
  'D_Red',
  'E_Yellow',
  'B_Red',
  'F_Yellow',
  'G_Red',
  'G_Yellow',
  'D_Red',
  'C_Yellow',
  'A_Red',
  'D_Yellow',
  'B_Red',
  'B_Yellow',
  'E_Red',
  'C_Yellow',
  'C_Red',
  'B_Yellow' ]);
console.log('Expected: Red');

console.log('11 - ');
whoIsWinner([
  'B_Red',
  'D_Yellow',
  'B_Red',
  'C_Yellow',
  'F_Red',
  'F_Yellow',
  'G_Red',
  'D_Yellow',
  'D_Red',
  'C_Yellow',
  'F_Red',
  'G_Yellow',
  'C_Red',
  'B_Yellow',
  'A_Red',
  'A_Yellow',
  'B_Red',
  'G_Yellow',
  'G_Red',
  'G_Yellow',
  'A_Red',
  'A_Yellow',
  'F_Red',
  'E_Yellow',
  'B_Red',
  'G_Yellow' ]);
console.log('Expected: Yellow');

console.log('12 - ');
whoIsWinner([
  'D_Red',
  'C_Yellow',
  'D_Red',
  'C_Yellow',
  'F_Red',
  'D_Yellow',
  'G_Red',
  'C_Yellow',
  'E_Red',
  'F_Yellow',
  'D_Red',
  'A_Yellow',
  'B_Red',
  'A_Yellow',
  'E_Red',
  'C_Yellow',
  'G_Red',
  'E_Yellow',
  'E_Red',
  'B_Yellow',
  'A_Red',
  'D_Yellow',
  'G_Red',
  'F_Yellow',
  'B_Red',
  'G_Yellow',
  'C_Red',
  'G_Yellow',
  'F_Red',
  'E_Yellow',
  'G_Red' ]);
console.log('Expected: Red');

// DIAG
//      A   B   C   D   E   F   G
//    ┌---------------------------┐
// 1  |   |   |   |   |   |   |   |
// 2  |   |   |   |   |   |   |   |
// 3  | R |   |   |   |   |   |   |
// 4  | R | R | Y | Y |   |   |   |
// 5  | R | Y | R | R |   |   | Y |
// 6  | Y | R | R | R |   | Y | Y |
//    └---------------------------┘
