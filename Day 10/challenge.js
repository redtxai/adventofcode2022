const { input } = require('./input.js')

const exampleInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

const X = 1

const cycles = input.split('\n')
const cycleToMeasureSignal = [20, 60, 100, 140, 180, 220]
const signalsMeasured = []

const CRT = []

for (let j = 0; j < 6; j++) {
  for (let i = 0; i < 40; i++) {
    if (!CRT[j]) {
      CRT[j] = []
    }
    CRT[j].push('.')
  }
}

let cycleIndex = 1

const verifySignal = (cycleIndex, xValue) => {
  if (cycleToMeasureSignal.includes(cycleIndex)) {
    signalsMeasured.push(cycleIndex * xValue)
  }
}

const getCyclePos = (cycle) => {
  const parseCycle = cycle - 1
  if (cycle > 40) {
    return [Math.trunc(parseCycle / 40), parseCycle % 40]
  } else {
    return [Math.trunc(parseCycle / 40), cycle - 1]
  }
}

const drawCRT = (cycle, x) => {
  const [row, pos] = getCyclePos(cycle)

  console.log('row, pos', row, pos)

  const parseX = x >= 1 ? (x >= 40 ? 39 : x ) : 1

  const spriteVisible = [parseX - 1, parseX, parseX + 1]
  console.log(parseX)
  console.log(spriteVisible)

  CRT[row][pos] = spriteVisible.includes(pos) ? '#' : '.'
}

const Xcycles = cycles.reduce((acc, cycle) => {
  verifySignal(cycleIndex, acc)
  // console.log(cycleIndex, acc)
  drawCRT(cycleIndex, acc)
  const [com, val] = cycle.split(' ')
  if (com === 'noop') {
    cycleIndex++
    return acc
  }
  cycleIndex++
  verifySignal(cycleIndex, acc)
  drawCRT(cycleIndex, acc)
  cycleIndex++
  return acc + +val
}, X)

console.log('X', Xcycles)
console.log('cycleIndex', cycleIndex)

let sum = 0
signalsMeasured.map((signal) => {
  sum += signal
})

console.log('first part', sum)

console.log('second part below')

for (let j = 0; j < 6; j++) {
  let rowSprite = ''
  for (let i = 0; i < 40; i++) {
    rowSprite += CRT[j][i]
  }
  console.log(rowSprite)
}
