"use client"

import Button from "./Button"
import { useState } from "react"
import moment from "moment"

interface IAvailForm {
  handler: any
}

export default function AvailabilityForm(props: IAvailForm) {
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const data = {
      date: moment(date, 'YYYY-MM-DD'),
      startTime: moment(`${date}:${startTime}`, 'YYYY-MM-DD:hh:mm'),
      endTime: moment(`${date}:${endTime}`, 'YYYY-MM-DD:hh:mm'),
    }
   
    const postData = async () => {
      const res = await fetch('/api/availability', {
        method: "POST",
        body: JSON.stringify(data),
      })
      return res
    }
    postData()
      .then((res) => {
        if (!res.ok) {
          console.log(res.statusText)
        }
      })
    props.handler()
  }


  return (
    <div className="bg-black w-fill p-4 flex flex-col gap-4 items-center border-[2px] rounded border-grey-dark shadow-xl absolute top-0 z-20 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-grey px-4 py-2 border-b-grey-dark border-b-2">Create New Availability</h1>
      <p>Please enter times in 30min increments</p>
      <form onSubmit={handleSubmit} className="w-full px-10 flex flex-col items-stretch gap-4 text-grey my-6">
        <div className="relative">
          <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="avialFormDate">Select a Date:</label>
          <input 
            className="py-4 px-14 w-full h-[4rem] bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="availFormDate" 
            id="availFormDate" 
            type="date" 
            min={moment().format("YYYY-MM-DD")}
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>
        <div className="relative">
          <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="availFormStartTime">Select a Start Time:</label>
          <input 
            className="py-4 px-14 w-full h-[4rem] bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="avialFormStartTime" 
            id="availFormStartTime" 
            type="time" 
            step={1800}
            onChange={(e) => setStartTime(e.target.value)} 
            required 
          />
        </div>  
        <div className="relative">
          <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="availFormEndTime">Select a End Time:</label>
          <input 
            className="py-4 px-14 w-full h-[4rem] bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="availFormEndTime" 
            id="availFormEndTime" 
            type="time"
            step={1800}
            min={startTime} 
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