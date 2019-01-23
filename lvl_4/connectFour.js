const whoIsWinner = list => {
  let a = [],
    b = [],
    c = [],
    d = [],
    e = [],
    f = [],
    g = [];
  let board = [a,b,c,d,e,f,g];
  let winner = "Draw";
  let gameOver = false;
  let turn = 0;

  const populateBoard = () => {
    const cur = list[turn].split('_');
    board[cur[0].toLowerCase().charCodeAt(0) - 97].push(cur[1].substring(0, 1).toLowerCase());
  }

  const changeWinner = char => {
    if (char.toLowerCase() === 'y') {
      return 'Yellow';
    }

    return 'Red';
  }

  const endGame = char => {
    winner = changeWinner(char);
    gameOver = true;
  }

  const determineWinner = () => {
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 6; y++) {
        const cur = board[x][y];

        if (cur) {
          // Check same column
          if (cur === board[x][y-1] && cur === board[x][y-2] && cur === board[x][y-3]) {
            endGame(cur);
            break;
          }
          // FORWARD
          // Check same row, next 4
          if (board[x+1] && board[x+2] && board[x+3]) {
            if (cur === board[x+1][y] && cur === board[x+2][y] && cur === board[x+3][y]) {
              endGame(cur);
              break;
            } else if (cur === board[x+1][y+1] && cur === board[x+2][y+2] && cur === board[x+3][y+3]) {
              endGame(cur);
              break;
            }
          }
          // BACKWARD
          if (board[x-1] && board[x-2] && board[x-3]) {
            if (cur === board[x-1][y+1] && cur === board[x-2][y+2] && cur === board[x-3][y+3]) {
              endGame(cur);
              break;
            }
          }
        }
      }
    }
  }

  do {
    populateBoard();
    determineWinner();
    turn += 1;
  } while (!gameOver && turn < list.length);

  return winner;
}
