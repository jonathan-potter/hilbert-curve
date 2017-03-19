import DrawingVector from 'classes/DrawingVector'
import { turnsForOrder } from 'classes/Hilbert'

import 'css/header.scss'
import 'css/app.scss'

const { min, sqrt } = Math
const { requestAnimationFrame } = window

const ORDER = 4
const PIXELS = 3

const curve = turnsForOrder(ORDER)
const pixelsPerEdge = (1 / sqrt(curve.length)) * 500

curve.shift()
let position = 0
const goalPosition = curve.length * pixelsPerEdge
function draw () {
  const drawingVector = new DrawingVector({
    direction: { x: 1, y: 0 },
    position: { x: pixelsPerEdge / 2, y: pixelsPerEdge / 2 },
    length: pixelsPerEdge
  })
  if (curve[1] === 'R') { drawingVector.rotate('L') }
  drawingVector.clearScreen()

  position = min(position + PIXELS, goalPosition)

  drawingVector.startDraw()
  for (let step = 0; step < position / pixelsPerEdge; step++) {
    const turn = curve[step]

    if (turn) {
      drawingVector.draw()
      drawingVector.rotate(turn)
    }
  }
  drawingVector.drawPartial((position % pixelsPerEdge) / pixelsPerEdge)

  drawingVector.endDraw()

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
