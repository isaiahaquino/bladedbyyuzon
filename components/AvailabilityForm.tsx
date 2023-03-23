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
      date: new Date(date),
      startTime: new Date(date + ' ' + startTime),
      endTime: new Date(date + ' ' + endTime),
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
        if (res.ok) {
          alert("Availability Posted!")
          props.handler()
        }
        else {
          alert(res.statusText)
        }
      })
  }


  return (
    <div className="bg-black w-full p-4 flex flex-col gap-4 items-center border-[2px] rounded border-grey-dark">
      <h1 className="text-2xl text-grey px-4 py-2 border-b-grey-dark border-b-2">Create New Availability</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 text-grey my-6">
        <div className="relative">
          <label className="absolute top-[-0.7rem] left-3 bg-black px-2" htmlFor="avialFormDate">Select a Date:</label>
          <input 
            className="dark py-4 px-10 bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="availFormDate" 
            id="availFormDate" 
            type="date" 
            min={moment().format("YYYY-MM-DD")}
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>
        <div className="relative">
          <label className="absolute top-[-0.7rem] left-3 bg-black px-2" htmlFor="availFormStartTime">Select a Start Time:</label>
          <input 
            className="py-4 px-14 bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="avialFormStartTime" 
            id="availFormStartTime" 
            type="time" 
            onChange={(e) => setStartTime(e.target.value)} 
            required 
          />
        </div>  
        <div className="relative">
          <label className="absolute top-[-0.7rem] left-3 bg-black px-2" htmlFor="availFormEndTime">Select a End Time:</label>
          <input 
            className="py-4 px-14 bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
            name="availFormEndTime" 
            id="availFormEndTime" 
            type="time"
            min={startTime} 
            onChange={(e) => setEndTime(e.target.value)} 
            required 
          />
        </div>
        <div className="flex gap-4 my-4">
          <Button title="Cancel" handler={props.handler} styles="px-6" />
          <input type="submit" className="font-serif bg-yellow px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
        </div>
      </form>
    </div>
  )
}