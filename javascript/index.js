import DrawingVector from 'classes/DrawingVector'

import 'css/header.scss'
import 'css/app.scss'

const { abs, sqrt } = Math
const { requestAnimationFrame } = window

const ORDER = 6
const STEPS = 4

function nextOrder (curve, order) {
  let newCurve = curve.concat(curve)

  let numS = 0
  const compare = isEven(order)
    ? isEven
    : isOdd

  newCurve = newCurve.map((turn, index) => {
    if (turn === 'S') { numS += 1 }

    if (turn === 'S' && compare(numS) && index !== 0) {
      return 'L'
    } else {
      return turn
    }
  })

  newCurve = newCurve.map((turn, index) => {
    if (turn === 'S' && index !== 0) { return 'T' }

    return turn
  })

  newCurve = newCurve.map((turn, index) => {
    if (index > newCurve.length / 2) { return turn }

    if (turn === 'R') {
      return 'L'
    } else if (turn === 'L') {
      return 'R'
    }

    return turn
  })

  return newCurve.concat(newCurve.slice().reverse())
}

function isEven (number) {
  return number % 2 === 0
}

function isOdd (number) {
  return abs(number % 2) === 1
}

let curve = ['S', 'R', 'R', 'S']
for (let order = 2; order <= ORDER; order++) {
  curve = nextOrder(curve, order)
}

const length = (1 / sqrt(curve.length)) * 500
const start = { x: length / 2, y: length / 2 }
const drawingVector = curve[1] === 'R'
  ? new DrawingVector({
    direction: { x: 0, y: 1 },
    position: start,
    length
  })
  : new DrawingVector({
    direction: { x: 1, y: 0 },
    position: start,
    length
  })

curve.shift()
function draw () {
  for (let step = 0; step < STEPS; step++) {
    const turn = curve.shift()

    if (turn) {
      drawingVector.draw()
      drawingVector.rotate(turn)
    }
  }

  if (curve.length) {
    requestAnimationFrame(draw)
  }
}

requestAnimationFrame(draw)
