interface Position {
  x: number
  y: number
}

function cleanPercentage(percentage: number) {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0
  const tooHigh = percentage > 100
  return tooLow ? 0 : tooHigh ? 100 : +percentage
}

function getAngle(cx: number, cy: number, ex: number, ey: number) {
  const dy = ey - cy
  const dx = ex - cx
  let theta = Math.atan2(dy, dx) // range (-PI, PI]
  theta *= 180 / Math.PI // rads to degs, range (-180, 180]
  return theta
}

function angle360(cx: number, cy: number, ex: number, ey: number) {
  let theta = getAngle(cx, cy, ex, ey) // range (-180, 180]
  if (theta < 0) theta = 360 + theta // range [0, 360)
  return theta
}

function degreeToRange(localMousePos: Position) {
  const angle = angle360(120, 120, localMousePos.x, localMousePos.y)

  const convertedAngle = angle > 270 ? angle - 270 : angle + 90

  const range = (convertedAngle / 360) * 60

  return range
}

export { cleanPercentage, degreeToRange }
