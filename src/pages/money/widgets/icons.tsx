export default function Icons({
  name,
  size = 30,
  background = '#30ab6d',
  ...attrs
}: {
  name: string
  size?: number
  background?: string
}) {
  const width = `${size}px`
  const height = `${size}px`
  return (
    <div
      className="rounded-[50%] flex justify-center items-center p-2"
      style={{
        width: `${size + 10}px`,
        height: `${size + 10}px`,
        background,
      }}
    >
      <svg
        className="icon text-[#fff]"
        aria-hidden="true"
        style={{
          width,
          height,
        }}
        {...attrs}
      >
        <use xlinkHref={`#icon-${name}`}></use>
      </svg>
    </div>
  )
}
