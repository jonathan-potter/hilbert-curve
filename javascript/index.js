import DrawingVector from 'classes/DrawingVector'
import { turnsForOrder } from 'classes/Hilbert'

import 'css/header.scss'
import 'css/app.scss'

const { min, sqrt } = Math
const { requestAnimationFrame } = window

const ORDER = 6
const STEPS = 4

const curve = turnsForOrder(ORDER)
const pixelsPerEdge = (1 / sqrt(curve.length)) * 500

curve.shift()
let steps = 0
function draw () {
  const drawingVector = new DrawingVector({
    direction: { x: 1, y: 0 },
    position: { x: pixelsPerEdge / 2, y: pixelsPerEdge / 2 },
    length: pixelsPerEdge
  })
  if (curve[1] === 'R') { drawingVector.rotate('L') }
  drawingVector.clearScreen()

  steps = min(steps + STEPS, curve.length)

  drawingVector.startDraw()
  for (let step = 0; step < steps; step++) {
    const turn = curve[step]

    if (turn) {
      drawingVector.draw()
      drawingVector.rotate(turn)
    }
  }
  drawingVector.endDraw()

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
