"use client"

import Button from "./Button"
import { useState, ChangeEvent, useEffect } from "react"
import moment from "moment"
import FormInput from "./FormInput"
import { TApiAllAvailabilitiesResp } from "@/types"

export default function AvailabilityForm(props: { handler: any }) {
  const [error, setError] = useState("")
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [availabilityData, setAvailabilityData] = useState<TApiAllAvailabilitiesResp>()

  useEffect(() => {
    const getAvailability = async () => {
      const res = await fetch('/api/availability/', { method: "GET" })
      return res.json()
    }
    getAvailability()
      .then(data => setAvailabilityData(data))
  }, [])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const data = {
      date: moment(date, 'YYYY-MM-DD'),
      startTime: moment(`${date}:${startTime}`, 'YYYY-MM-DD:hh:mm'),
      endTime: moment(`${date}:${endTime}`, 'YYYY-MM-DD:hh:mm'),
    }

    setError("")
    if (availabilityData === undefined) { return }

    // Check if availability already exists
    for (const avail of availabilityData?.availabilities) {
      if (data.date.format("YYYY-MM-DD") == moment(avail.date).format("YYYY-MM-DD")) {
        setError("Availability already exist for that date.")
      }
    }
    if (error !== "") {
      return
    }
   
    const postData = async () => {
      const res = await fetch('/api/availability', {
        method: "POST",
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        alert(res.statusText)
      }
    }
    postData()
      .then()
    props.handler()
  }

  return (
    <div className="bg-yellow w-[calc(100vw-4rem)] max-w-[26rem] p-4 flex flex-col gap-4 items-center border-[2px] rounded shadow-xl absolute top-0 z-20 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-black px-6 py-2 border-b-black border-b-2">Create New Availability</h1>
      <p className="text-black text-sm">Please enter times in 30min increments</p>
      <form onSubmit={handleSubmit} className="w-full px-10 flex flex-col items-stretch gap-4 text-grey my-6">
        <FormInput attributes={{ name: "date", label: "Select a Date:", inputId: "availFormDate", value: date, type: "date", onChange: (e:ChangeEvent<HTMLInputElement>) => setDate(e.target.value), min: moment().format("YYYY-MM-DD"), styles: "text-center", required: true }} />
        <FormInput attributes={{ name: "startTime", label: "Select a Start Time:", inputId: "availFormStartTime", value: startTime, type: "time", onChange: (e:ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value), step: 1800, styles: "text-center", required: true }} />
        <FormInput attributes={{ name: "endTime", label: "Select a End Time:", inputId: "availFormEndTime", value: endTime, type: "time", onChange: (e:ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value), step: 1800, min: startTime, styles: "text-center", required: true }} />
        
        <p className="text-red text-sm text-center">{error}</p>
        
        <div className="flex gap-4 justify-center mb-4">
          <Button title="Cancel" handler={props.handler} styles="px-6" />
          <input type="submit" className="font-serif bg-grey px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
        </div>
      </form>
    </div>    
  )
}