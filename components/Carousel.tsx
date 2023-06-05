"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface ICarousel {
  imgs: string[]
  height: number
}

export default function Carousel(props: ICarousel) {

  const [position, setPosition] = useState(0)
  const [trans, setTrans] = useState("translate-x-[000vw]")

  useEffect(() => {
    setTrans(`translate-x-[${position}00vw]`)
  }, [position])

  function moveRight() {
    // if (position == -props.imgs.length + 1) { 
    //   setPosition(0)
    //   return 
    // }
    if (position == -props.imgs.length + 1) {
      return
    }
    setPosition(position - 1)
  }

  function moveLeft() {
    if (position == 0) { return }
    setPosition(position + 1)
  }

  return (
    <div className={`relative`}>
      <button type="button" onClick={moveLeft} className="absolute text-xl z-10 font-extrabold p-4 m-[2px] rounded bg-opacity-0 text-grey h-full hover:bg-opacity-20 bg-black left-0">&#9664;</button>
      <button type="button" onClick={moveRight} className="absolute text-xl z-10 font-extrabold p-4 m-[2px] rounded bg-opacity-0 text-grey h-full hover:bg-opacity-20 bg-black right-0">&#9654;</button>
      <ul className={`relative flex ${trans} h-[600px] w-full overflow-x-visible transition-all ease-in-out duration-500`}>
        {props.imgs.map((img, i) => (
          <li className="relative shrink-0 w-full h-[600px]" key={i}>
            <Image style={{objectFit: "cover"}} src={img} fill alt="" />
          </li>
        ))}
      </ul>
    </div>
  )
}