class Coin {
  constructor(amount) {
    this.amount = amount;
  }

  handleNumbers() {
    console.log(`this is a number: ${this.amount}`);
  }

  parse() {
    if(typeof this.amount !== 'string') {
      this.amount = this.handleNumbers();
      return;
    }

    console.log(`this is a string: ${this.amount}`);
  }

  translate() {}

  reply() {}
}


function minCoins(amount){
  const coin = new Coin(amount);
  coin.parse();
}



// TESTS
const Test = { assertEquals: (actual, expected) => { if (actual !== expected) throw new Error('You suck! You\'ll never band together to take us down!'); console.log(true) } }

Test.assertEquals(minCoins("1.87"), "1 £1 coin, 1 50p coin, 1 20p coin, 1 10p coin, 1 5p coin and 1 2p coin");
Test.assertEquals(minCoins(197), "1 £1 coin, 1 50p coin, 2 20p coins, 1 5p coin and 1 2p coin");
Test.assertEquals(minCoins("2£1p"), "Invalid input - enter a positive amount of money");
