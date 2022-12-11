const { input } = require('./input.js')

const exampleInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

const directionsMoving = input.split('\n')

const infoMap = {
  tailPosMap: {},
  ropePos: []
}

for (let rope = 0; rope < 10; rope++) {
  infoMap.ropePos[rope] = { x: 0, y: 0 }
}

for (let index = 0; index < directionsMoving.length; index++) {
  const [direction, steps] = directionsMoving[index].split(' ');
  for (let stepCount = 0; stepCount < steps; stepCount++) {
    const moveX = direction === 'R' ? 1 : direction === 'L' ? -1 : 0
    const moveY = direction === 'U' ? 1 : direction === 'D' ? -1 : 0

    infoMap.ropePos[0].x += moveX
    infoMap.ropePos[0].y += moveY

    for (let rope = 0; rope < 9; rope++) {
      const diffX = infoMap.ropePos[rope].x - infoMap.ropePos[rope + 1].x
      const diffY = infoMap.ropePos[rope].y - infoMap.ropePos[rope + 1].y

      
      if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
        if (diffX === 0) {
          infoMap.ropePos[rope + 1].y += diffY / 2
          continue
        }
        if (diffY === 0) {
          infoMap.ropePos[rope + 1].x += diffX / 2
          continue
        }
        infoMap.ropePos[rope + 1].x += diffX > 0 ? 1 : -1
        infoMap.ropePos[rope + 1].y += diffY > 0 ? 1 : -1
      }
    }
    if (!infoMap.tailPosMap[infoMap.ropePos[9].y]) {
      infoMap.tailPosMap[infoMap.ropePos[9].y] = {}
    }
    if (!infoMap.tailPosMap[infoMap.ropePos[9].y][infoMap.ropePos[9].x]) {
      infoMap.tailPosMap[infoMap.ropePos[9].y][infoMap.ropePos[9].x] = true
    }
  }
}

let sum = 0
Object.keys(infoMap.tailPosMap).map((key) => {
  sum += Object.keys(infoMap.tailPosMap[key]).length
})
console.log(sum)
