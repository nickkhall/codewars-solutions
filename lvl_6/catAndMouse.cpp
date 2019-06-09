#include <string>

using namespace std;

string catMouse(string field, unsigned int jump){
  int spaces = -1;
  
  for (int i = 0; i < field.length(); i++) {
    cout << spaces << endl;
    if (field[i] == 'C') {
      spaces = 0;
    }
    
    if (spaces > -1 && field[i] == '.') {
      spaces += 1;
    }

    if (spaces > -1 && spaces > jump) {
      return "Escaped!";
    }
    
    if (spaces > -1 && field[i] == 'D' && spaces != jump) {
      return "Protected!";
    }
    
    if (spaces > -1 && field[i] == 'm' && spaces < jump) {
      return "Caught!";
    }
  }
  
  spaces = -1;
  
  return "boring without all three";
}


// TESTS:
// ----------
// Describe(CatMouse){
//   It(BasicTests){
//     Assert::That(catMouse("..D.....Cm", 13), Equals("Caught!"));
//     Assert::That(catMouse("............C.............D..m...", 8), Equals("Escaped!"));
//     Assert::That(catMouse("m.C...", 5), Equals("boring without all three"));
//     Assert::That(catMouse(".CD......m.", 10), Equals("Protected!"));
//     Assert::That(catMouse("..D.....C.m", 2), Equals("Caught!"));
//     Assert::That(catMouse("D..C.....", 7), Equals("boring without all three"));
//     Assert::That(catMouse("...", 0), Equals("boring without all three"));
//     Assert::That(catMouse("....", 1), Equals("boring without all three"));
//     Assert::That(catMouse(".....", 0), Equals("boring without all three"));
//     Assert::That(catMouse("......D", 0), Equals("boring without all three"));
//     Assert::That(catMouse("..CD.........", 12), Equals("boring without all three"));
//   }
// };