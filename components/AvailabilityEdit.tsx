"use client"

import { useState } from "react"
import moment from "moment"
import Button from "./Button"
import FormInput from "./FormInput"
import { TSingleAvailability } from "@/types"

export default function AvailabilityEdit(props: { handler: any, data: TSingleAvailability | undefined}) {
  const [startTime, setStartTime] = useState(moment(props.data?.startTime).format('HH:mm'))
  const [endTime, setEndTime] = useState(moment(props.data?.endTime).format('HH:mm'))

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const data = {
      startTime: moment(props.data?.date).add(startTime).format(),
      endTime: moment(props.data?.date).add(endTime).format(),
    }
    const putAvail = async () => {
      const res = await fetch(`/api/availability/${props.data?.id}`, {
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
    <div className="bg-grey-dark w-[calc(100vw-4rem)] max-w-[26rem] p-4 flex flex-col gap-4 items-center border-[2px] rounded absolute z-40 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-grey px-6 py-2 border-b-black border-b-2 text-center">Edit Availability for <br /><strong className="text-yellow">{moment(props.data?.date).format('MMM DD')}</strong></h1>
      <p className="text-yellow text-sm">Please enter times in 30min increments</p>
      <form onSubmit={handleSubmit} className="w-full px-10 flex flex-col items-stretch gap-4 text-grey my-6">
        <FormInput attributes={{ name: "startTime", label: "Select a Start Time:", inputId: "availFormStartTime", value: startTime, type: "time", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value), step: 1800, styles: "text-center", required: true }} />
        <FormInput attributes={{ name: "endTime", label: "Select a End Time:", inputId: "availFormEndTime", value: endTime, type: "time", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value), step: 1800, min: startTime, styles: "text-center", required: true }} />

        <div className="flex gap-4 justify-center my-4">
          <Button title="Cancel" handler={props.handler} styles="px-6" />
          <input type="submit" className="font-serif bg-yellow px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
        </div>
      </form>
    </div>
  )
}