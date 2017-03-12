import DrawingVector from 'classes/DrawingVector'

import 'css/header.scss'
import 'css/app.scss'

const { abs, sqrt } = Math
const { requestAnimationFrame } = window

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
curve = nextOrder(curve, 2)
curve = nextOrder(curve, 3)
curve = nextOrder(curve, 4)
// curve = nextOrder(curve, 5)
// curve = nextOrder(curve, 6)
// curve = nextOrder(curve, 7)

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
  const turn = curve.shift()

  if (turn) {
    drawingVector.draw()
    drawingVector.rotate(turn)

    requestAnimationFrame(draw)
  }
}

requestAnimationFrame(draw)
