import DrawingVector from 'classes/DrawingVector'
import { turnsForOrder } from 'classes/Hilbert'

import 'css/header.scss'
import 'css/app.scss'

const { sqrt } = Math
const { requestAnimationFrame } = window

const ORDER = 6
const STEPS = 4

const curve = turnsForOrder(ORDER)
const pixelsPerEdge = (1 / sqrt(curve.length)) * 500
const drawingVector = new DrawingVector({
  direction: { x: 1, y: 0 },
  position: { x: pixelsPerEdge / 2, y: pixelsPerEdge / 2 },
  length: pixelsPerEdge
})

if (curve[1] === 'R') { drawingVector.rotate('L') }

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
