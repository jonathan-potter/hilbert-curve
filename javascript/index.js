import DrawingVector from 'classes/DrawingVector'
import { turnsForOrder } from 'classes/Hilbert'

import 'css/header.scss'
import 'css/app.scss'

const { sqrt } = Math
const { requestAnimationFrame } = window

const ORDER = 6
const STEPS = 4

const curve = turnsForOrder(ORDER)

const length = (1 / sqrt(curve.length)) * 500
const start = { x: length / 2, y: length / 2 }
const drawingVector = curve[1] === 'R'
  ? new DrawingVector({ direction: { x: 0, y: 1 }, position: start, length })
  : new DrawingVector({ direction: { x: 1, y: 0 }, position: start, length })

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
