"use client"

import { useState } from "react"
import moment from "moment"
import Button from "./Button"

export default function AvailabilityEdit(props: { handler: any, data: any }) {
  const [startTime, setStartTime] = useState(moment(props.data.startTime).format('HH:mm'))
  const [endTime, setEndTime] = useState(moment(props.data.endTime).format('HH:mm'))

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const data = {
      startTime: moment(props.data.date).add(startTime).format(),
      endTime: moment(props.data.date).add(endTime).format(),
    }
    const putAvail = async () => {
      const res = await fetch(`/api/availability/${props.data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
      return res
    }
    putAvail()
      .then(res => {
        if (!res.ok) {
          alert(res.statusText)
        }
      })
    props.handler()
  }
  
  return (
    <div className="bg-black w-fill p-4 flex flex-col gap-4 items-center border-[2px] rounded border-grey-dark absolute z-40 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-grey px-4 py-2 border-b-grey-dark border-b-2">Edit Availability for <strong>{moment(props.data.date).format('MMM DD')}</strong></h1>
      <form onSubmit={handleSubmit} className="w-full px-10 flex flex-col items-stretch gap-4 text-grey my-6">
        <div className="relative">
          <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="availFormStartTime">Select a Start Time:</label>
          <input 
            className="py-4 px-14 w-full bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="avialFormStartTime" 
            id="availFormStartTime" 
            type="time" 
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)} 
            required 
          />
        </div>  
        <div className="relative">
          <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="availFormEndTime">Select a End Time:</label>
          <input 
            className="py-4 px-14 w-full bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="availFormEndTime" 
            id="availFormEndTime" 
            type="time"
            min={startTime}
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
            required 
          />
        </div>
        <div className="flex gap-4 justify-center my-4">
          <Button title="Cancel" handler={props.handler} styles="px-6" />
          <input type="submit" className="font-serif bg-yellow px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
        </div>
      </form>
    </div>
  )
}