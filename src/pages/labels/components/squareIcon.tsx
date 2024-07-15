import { CSSProperties } from 'react'

export default function SquareIcon({
  name,
  svgStyle = {},
  size = 30,
  background = '#30ab6d',
  color = '#fff',
  ...attrs
}: {
  name: string
  svgStyle?: CSSProperties
  size?: number
  background?: string
  color?: string
}) {
  const width = `${size}px`
  const height = `${size}px`
  return (
    <div
      className="rounded-xl flex justify-center items-center p-2"
      style={{
        width: `${size + 10}px`,
        height: `${size + 10}px`,
        background,
      }}
      {...attrs}
    >
      <svg
        className="icon"
        aria-hidden="true"
        style={{
          width,
          height,
          color,
          ...svgStyle,
        }}
      >
        <use xlinkHref={`#icon-${name}`}></use>
      </svg>
    </div>
  )
}
