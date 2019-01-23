// 2
[
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
]

//      A   B   C   D   E   F   G
//    ┌---------------------------┐
// 0  |   |   |   | Y |   |   |   |
// 1  |   |   |   | R |   |   |   |
// 2  | R | Y | R | Y |   |   | Y |
// 3  | Y | Y | R | R | R | Y | R |
// 4  | Y | R | Y | Y | Y | R | R |
// 5  | R | R | Y | Y | R | R | Y |
//    └---------------------------┘

a = [ Red, Yellow, Yellow, Red ]
b = [ Red, Red, Yellow, Yellow ]
c = [ Yellow, Yellow, Red, Red ]
d = [ Yellow[1], Yellow, Red, Yellow, Red, Yellow ]
e = [ Red, Yellow[2], Red ]
f = [ Red, Red, Yellow[3] ]
g = [ Yellow, Red, Red, Yellow[4] ]



// 4
[
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
  'A_Red'
]
//      A   B   C   D   E   F   G
//    ┌---------------------------┐
// 0  | R |   |   |   |   |   |   |
// 1  | Y |   |   |   |   |   |   |
// 2  | Y |   |   | R |   |   |   |
// 3  | Y |   | R | R |   | Y |   |
// 4  | Y | Y | R | R | Y | R |   |
// 5  | R | Y | R | R | R | Y | Y |
//    └---------------------------┘






// 6
[
  'D_Red',
  'C_Yellow',
  'C_Red',
  'C_Yellow',
  'C_Red',
  'A_Yellow', - (1)
  'D_Red',
  'C_Yellow', - (3)
  'B_Red',
  'A_Yellow',
  'A_Red',
  'B_Yellow', - (2)
  'G_Red',
  'D_Yellow',
  'A_Red',
  'E_Yellow',
  'G_Red',
  'D_Yellow', - DIAG YELLOW GAME WINNER (4)
  'D_Red',
  'E_Yellow',
  'C_Red'
]



//      A   B   C   D   E   F   G
//    ┌---------------------------┐
// 0  |   |   | R |   |   |   |   |
// 1  |   |   | Y | R |   |   |   |
// 2  | R |   | R | Y |   |   |   |
// 3  | R |   | Y | Y |   |   |   |
// 4  | Y | Y | R | R | Y |   | R |
// 5  | Y | R | Y | R | Y |   | R |
//    └---------------------------┘


// 7
//      A   B   C   D   E   F   G
//    ┌---------------------------┐
// 0  |   |   |   |   |   |   |   |
// 1  |   |   | R | Y |   |   |   |
// 2  | R |   | Y | R | Y | Y |   |
// 3  | Y |   | R | Y | R | R |   |
// 4  | R | R | Y | R | R | R | Y |
// 5  | Y | Y | R | Y | Y | Y | R |
//    └---------------------------┘
