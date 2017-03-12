const { abs } = Math

const SEED = ['S', 'R', 'R', 'S']

export const nextOrder = (curve, order) => {
  /* copy */
  let newCurve = curve.concat(curve)

  /* fill in left turns */
  let numS = 0
  const compare = isEven(order) ? isEven : isOdd
  newCurve = newCurve.map((turn, index) => {
    if (turn === 'S') { numS += 1 }

    if (turn === 'S' && compare(numS) && index !== 0) {
      return 'L'
    } else {
      return turn
    }
  })

  /* fill in straight lines */
  newCurve = newCurve.map((turn, index) => {
    if (turn === 'S' && index !== 0) { return 'T' }

    return turn
  })

  /* flip the turns in the first half */
  newCurve = newCurve.map((turn, index) => {
    if (index > newCurve.length / 2) { return turn }

    if (turn === 'R') {
      return 'L'
    } else if (turn === 'L') {
      return 'R'
    }

    return turn
  })

  /* concat a mirrored version to the end */
  return newCurve.concat(newCurve.slice().reverse())
}

export const turnsForOrder = ORDER => {
  let curve = SEED

  for (let order = 2; order <= ORDER; order++) {
    curve = nextOrder(curve, order)
  }

  return curve
}

function isEven (number) {
  return number % 2 === 0
}

function isOdd (number) {
  return abs(number % 2) === 1
}
