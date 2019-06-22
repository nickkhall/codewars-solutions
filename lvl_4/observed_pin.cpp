#include <iostream>
#include <string>
#include <vector>

void combinationUtil(int combo[], int temp[], int start, int end, int index, int pinLength) {  
    // Current combination is ready 
    // to be printed, print it  
    if (index == pinLength)  { 
        for (int j = 0; j < pinLength; j++) { 
          std::cout << temp[j] << " ";  
        }
        
        // PUSH TEMP ONTO FINAL ARRAY
        std::cout << std::endl;
        std::cout << "----------------------" << std::endl;
        return;  
    }  
  
    for (int i = start; i <= end && end - i + 1 >= pinLength - index; i++) {
        std::cout << "index: " << index << std::endl;
        std::cout << "temp[index]: " << temp[index] << std::endl;
        std::cout << "combo[i] : " << combo[i] << std::endl;
        temp[index] = combo[i];  
        combinationUtil(combo, temp, i + 1, end, index + 1, pinLength);  
    }  
}  

std::vector<std::string> get_pins(const std::string &observed) {
  std::vector<std::string> registerVec {};
  std::vector<std::vector<std::string>> accumVec {};
  std::vector<std::string> finalVec {};
  std::vector<std::vector<int>> possibilities {
    {}, {3, 0, 1}, {3, -1, 0, 1}, {3, -1, 0},
    {-3, 3, 0, 1}, {-3, 3, -1, 0, 1},
    {-3, 3, -1, 0}, {-3, 0, 1}, {-8, -3, 0, -1, +1},
    {-3, -1, 0}
  };
  
  for (int o = 0; o < observed.length(); o++) {
    const int cur = observed[o] - '0';
    
    for (int p = 1; p < possibilities.size(); p++) {
      if (cur == p) {
        for (int poss : possibilities[p]) {
          registerVec.emplace_back(std::to_string((cur + poss)));
          registerVec.shrink_to_fit();
        }
      }
    }
    
    accumVec.emplace_back(registerVec);
    accumVec.shrink_to_fit();
    registerVec.clear();
    registerVec.shrink_to_fit();
  }
  
  for (int a = 0; a < accumVec.size(); a++)
    for (int x = 0; x < accumVec[a].size(); x++) std::cout << accumVec[a][x] << std::endl;
  
  return finalVec;
}

int main() {
  
}