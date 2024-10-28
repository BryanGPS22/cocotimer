interface Circle {
  color: string
  pct?: number
}

const Circle = ({ color, pct }: Circle) => {
  const r = 100
  const circ = 2 * Math.PI * r
  const strokePct = pct ? ((60 - pct) * circ) / 60 : 0

  return (
    <circle
      r={pct == 0 ? 0 : r}
      cx="50%"
      cy="50%"
      stroke={strokePct != circ ? color : ""} // remove color as 0% sets full circumference
      strokeLinecap="butt"
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeWidth={2 * r}
      fillOpacity="0"
    ></circle>
  )
}

export default Circle
