#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<string> get_pins(string pin) {
    vector<string> pins {};
    const vector<vector<string>> pin_possibilities = {
        // 0, 1, 2, 3
        {"0", "8"}, {"1", "2", "4"}, {"1", "2", "3", "5"}, {"2", "3", "6"},
        // 4, 5, 6
        {"1", "4", "5", "7"}, {"2", "4", "5", "6", "8"}, {"3", "5", "6", "9"},
        // 7, 8, 9
        {"4", "7", "8"}, {"0", "5", "7", "8", "9"}, {"6", "8", "9"}
    };
    
    
    if (pin.length() == 1) {
        return pin_possibilities[atoi(pin.c_str())];
    }
    
    vector<string> sub_pins = get_pins(pin.substr(1));
    
    vector<string> cur_possibilities = pin_possibilities[(int)pin[0] - 48];
    
    for (int i = 0; i < cur_possibilities.size(); i++) {
        for (int x = 0; x < sub_pins.size(); x++) {
            string temp_cur = "";
            temp_cur += cur_possibilities[i];
            temp_cur += sub_pins[x];
            pins.emplace_back(temp_cur);
        }
    }
    
    return pins;
}