"use client"

import { useState, useEffect } from "react"
import moment from "moment"
import Button from "./Button"
import FormInput from "./FormInput"
import { TApiAllAvailabilitiesResp, TApiSingleAvailabilityResp, TSingleAvailability } from "@/types"

export default function AvailabilityEdit(props: { handler: any, data: TSingleAvailability | undefined}) {
  const [error, setError] = useState("")
  const [availabilityData, setAvailabilityData] = useState<TApiSingleAvailabilityResp>()
  const [startTime, setStartTime] = useState(moment(props.data?.startTime).format('HH:mm'))
  const [endTime, setEndTime] = useState(moment(props.data?.endTime).format('HH:mm'))

  useEffect(() => {
    const getAvailability = async () => {
      const res = await fetch(`/api/availability/${props.data?.id}/accepted`, { method: "GET" })
      return res.json()
    }
    getAvailability()
      .then(data => setAvailabilityData(data))
  }, [props.data?.id])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setError("")
    const data = {
      startTime: moment(props.data?.date).add(startTime).format(),
      endTime: moment(props.data?.date).add(endTime).format(),
    }
    

    if (availabilityData !== undefined) {
      if (new Date(data.startTime) > new Date(availabilityData.availability.appointments[0].startTime) || 
          new Date(data.endTime) < new Date(availabilityData.availability.appointments[availabilityData.availability.appointments.length-1].endTime)) {
            setError("Conflict with existing accepted appointments.")
      }
    }
    if (error !== "") {
      return 
    }

    const putAvail = async () => {
      const res = await fetch(`/api/availability/${props.data?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        alert(res.statusText)
      }
    }
    putAvail()
      .then()
    props.handler()
  }
  
  return (
    <div className="bg-yellow w-[calc(100vw-4rem)] max-w-[26rem] py-4 px-2 flex flex-col gap-4 items-center border-[2px] rounded absolute z-40 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-black px-6 py-2 border-b-black border-b-2 text-center">Edit Availability for <br /><strong>{moment(props.data?.date).format('MMM DD')}</strong></h1>
      <p className="text-black text-sm">Please enter times in 30min increments</p>
      <div className="flex">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex my-4 gap-4">
            <div className="flex-shrink-0">
              <h2 className="text-black font-medium mb-1">Appointments:</h2>
              <ul>
                {availabilityData?.availability.appointments.map((appt) => (
                  <li key={appt.id}>
                    <p className="text-sm">{moment(appt.startTime).format("LT")}-{moment(appt.endTime).format("LT")}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 bg-yellow">
              <FormInput attributes={{ name: "startTime", label: "Select a Start Time:", inputId: "availFormStartTime", value: startTime, type: "time", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value), step: 1800, styles: "text-center", required: true }} />
              <FormInput attributes={{ name: "endTime", label: "Select a End Time:", inputId: "availFormEndTime", value: endTime, type: "time", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value), step: 1800, min: startTime, styles: "text-center", required: true }} />
            </div>
          </div>

          <p className="text-red text-sm text-center">{error}</p>
          
          <div className="flex gap-4 justify-center my-4">
              <Button title="Cancel" handler={props.handler} styles="px-6" />
              <input type="submit" className="font-serif bg-grey px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
            </div>
        </form>
      </div>
    </div>
  )
}