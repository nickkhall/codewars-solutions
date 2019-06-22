#include <iostream>

using namespace std;

long long int* populate_arr() {
  long long int* a = new long long int[64];
  
  for (int i = 0; i < 34; i++) {
    if (i == 0) {
      a[i] = 2147483648;
    } else if (i == 33) {
      a[i] = 0;
    } else {
      a[i] = (a[i - 1]) / 2;
    }
  }
  
  return a;
}

string convert_binary(long long int number) {
  long long int* binary_arr = populate_arr();
  
  for (int b = 0; b < binary_arr.size(); b++) {
    cout << binary_arr[b] << endl;
  }
}

string uint32_to_ip(uint32_t ip){
  cout << string convert_binary() << endl;
}

int main() {
  
  return 0;
}
