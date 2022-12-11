const { input } = require('./input.js')

const exampleInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

const Monkeys = []

const lines = input.split('\n')

let monkeyToRegister = 0
const multiplyFunction = (value) => (old) => old * value
const addFunction = (value) => (old) => old + value
const potFunction = (old) => old * old

for (let index = 0; index < lines.length; index++) {
  const element = lines[index].split(' ');
  const [firstWord] = element
  if (firstWord === 'Monkey') {
    const [, monkeyIndex] = element
    monkeyToRegister = +(monkeyIndex.replace(/[^0-9]/g, ''))
    continue
  }
  if (firstWord === 'Starting') {
    const [,, ...startingItems] = element
    if (!Monkeys[monkeyToRegister]) {
      Monkeys[monkeyToRegister] = {
        inspectTimes: 0,
        items: startingItems.map(val => +(val.replace(/[^0-9]/g, '')))
      }
    }
    continue
  }
  if (firstWord === 'Operation:') {
    const [, ,,, ...operation] = element
    const [type, value] = operation
    if (value === 'old') {
      Monkeys[monkeyToRegister].operation = potFunction
      continue
    }
    if (type === '+') {
      Monkeys[monkeyToRegister].operation = addFunction(+value)
    }
    if (type === '*') {
      Monkeys[monkeyToRegister].operation = multiplyFunction(+value)
    }
    continue
  }
  if (firstWord === 'Test:') {
    const [,,, test] = element
    Monkeys[monkeyToRegister].test = +test
    continue
  }

  if (lines[index].length > 0) {

    if (!Monkeys[monkeyToRegister].true && Monkeys[monkeyToRegister].true !== 0) {
      const monkeyTrue = lines[index].replace(/[^0-9]/g, '')
      Monkeys[monkeyToRegister].true = +monkeyTrue
      continue
    } else {
      const monkeyFalse = lines[index].replace(/[^0-9]/g, '')
      Monkeys[monkeyToRegister].false = +monkeyFalse
    }

  }
}
// this part I took from reddit \/
let modulo = 1;
for (let monkey of Monkeys){
  modulo *= monkey.test;
}
// this part I took from reddit /\

for (let round = 0; round < 10000; round++) {
  for (let monkeyInd = 0; monkeyInd < Monkeys.length; monkeyInd++) {

    const monkey = Monkeys[monkeyInd];

    for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {

      const item = +monkey.items[itemIndex];
      monkey.inspectTimes++

      const worryLevel = monkey.operation(item) % modulo
      const checkDivisible = worryLevel % monkey.test

      if (checkDivisible === 0) {
        Monkeys[monkey.true].items.push(worryLevel)
      } else {
        Monkeys[monkey.false].items.push(worryLevel)
      }
    }
    Monkeys[monkeyInd].items = []
  }
}

let first = 0
let second = 0

for (let monkeyIndexAfter = 0; monkeyIndexAfter < Monkeys.length; monkeyIndexAfter++) {
  const monkeyInspectTimes = Monkeys[monkeyIndexAfter].inspectTimes;

  if (monkeyInspectTimes > first) {
    second = first
    first = monkeyInspectTimes
    continue
  }
  if (monkeyInspectTimes > second) {
    second = monkeyInspectTimes
  }
}
console.log(Monkeys.map(val => val.inspectTimes))
console.log("second part answer:", first * second)
