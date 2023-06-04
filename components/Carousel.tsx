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
    if (position == -props.imgs.length + 1) { 
      setPosition(0)
      return 
    }
    setPosition(position - 1)
  }

  function moveLeft() {
    if (position == 0) { return }
    setPosition(position + 1)
  }

  console.log(position)

  return (
    <div className={`relative h-[${props.height}px]`}>
      <button type="button" onClick={moveLeft} className="absolute text-xl z-10 font-extrabold p-4 m-[2px] rounded bg-opacity-0 text-grey h-full hover:bg-opacity-20 bg-black left-0">&#9664;</button>
      <button type="button" onClick={moveRight} className="absolute text-xl z-10 font-extrabold p-4 m-[2px] rounded bg-opacity-0 text-grey h-full hover:bg-opacity-20 bg-black right-0">&#9654;</button>
      <ul className={`relative flex translate-x-[${position}00vw] h-[${props.height}px] transition-all ease-in-out duration-500`}>
        {props.imgs.map((img, i) => (
          <li className="shrink-0 w-full" key={i}>
            <Image className={`object-cover`} src={img} fill alt="" />
          </li>
        ))}
      </ul>
      

    </div>
  )
}