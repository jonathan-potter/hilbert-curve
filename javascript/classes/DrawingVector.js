import { rotate, scalarMultiply } from 'classes/Vector'

const { PI: pi } = Math

const canvas = document.getElementsByTagName('canvas')[0]
const context = canvas.getContext('2d')

export default class DrawingVector {
  constructor ({ direction, position, length }) {
    this.direction = direction
    this.position = position
    this.length = length
  }

  draw () {
    context.lineWidth = 2
    context.strokeStyle = 'white'
    context.beginPath()

    const { x, y } = this.position
    const { x: dx, y: dy } = scalarMultiply(this.direction, this.length)
    context.moveTo(x, y)
    context.lineTo(x + dx, y + dy)
    context.closePath()

    context.stroke()

    this.position = { x: x + dx, y: y + dy }
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
