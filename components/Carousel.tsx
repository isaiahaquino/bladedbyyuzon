"use client"

import Image from "next/image"
import { useState } from "react"

interface ICarousel {
  imgs: string[]
  height: number
}

export default function Carousel(props: ICarousel) {

  const [position, setPosition] = useState(0)

  function moveRight() {
    if (position == -props.imgs.length + 1) { return }
    setPosition(position - 1)
  }

  function moveLeft() {
    if (position == 0) { return }
    setPosition(position + 1)
  }

  return (
    <div className='relative'>
      <button type="button" onClick={moveLeft} className="absolute text-xl z-10 font-extrabold p-4 m-[2px] rounded bg-opacity-0 text-grey h-full hover:bg-opacity-20 bg-white left-0">&#9664;</button>
      <button type="button" onClick={moveRight} className="absolute text-xl z-10 font-extrabold p-4 m-[2px] rounded bg-opacity-0 text-grey h-full hover:bg-opacity-20 bg-white right-0">&#9654;</button>
      <ul className={`flex translate-x-[${position}00vw] h-[${props.height}px] transition-all ease-in-out duration-500`}>
        {props.imgs.map((img, i) => (
          <li className="shrink-0 relative w-[100vw]" key={i}>
            <Image className={`object-cover`} src={img} fill alt="" />
          </li>
        ))}
      </ul>
      

    </div>
  )
}