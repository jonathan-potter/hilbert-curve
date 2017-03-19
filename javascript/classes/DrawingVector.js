import { rotate, scalarMultiply } from 'classes/Vector'

const { PI: pi } = Math

const canvas = document.getElementsByTagName('canvas')[0]
const context = canvas.getContext('2d')

let dashOffset = 10
const DASH_SPEED = 3
context.setLineDash([100, 10])
const MAX_OFFSET = 110

export default class DrawingVector {
  constructor ({ direction, position, length }) {
    this.direction = direction
    this.position = position
    this.length = length
  }

  startDraw () {
    dashOffset = (dashOffset + DASH_SPEED) % MAX_OFFSET
    context.lineDashOffset = -dashOffset

    context.lineWidth = 2
    context.strokeStyle = 'white'
    context.beginPath()
    const { x, y } = this.position
    context.moveTo(x, y)
  }

  draw () {
    this.drawPartial(1)
  }

  drawPartial (portion) {
    const { x, y } = this.position
    const { x: dx, y: dy } = scalarMultiply(this.direction, this.length * portion)
    context.lineTo(x + dx, y + dy)

    this.position = { x: x + dx, y: y + dy }
  }

  endDraw () {
    context.stroke()
  }

  clearScreen () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  rotate (direction) {
    let angle = 0
    if (direction === 'L') {
      angle = pi / 2
    } else if (direction === 'R') {
      angle = -pi / 2
    }

    this.direction = rotate(this.direction, angle)
  }
}
