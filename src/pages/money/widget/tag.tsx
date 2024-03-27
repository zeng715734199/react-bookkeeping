import React from 'react'

export default function Tag(props: { children: string }) {
  return (
    <span className="w-3 h-3 bg-[#f2f2f2] text-[#878a90] mr-[1px]">
      {props.children}
    </span>
  )
}
