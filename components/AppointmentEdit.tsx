"use client"

import Button from "./Button"
import { ChangeEvent, useEffect, useState } from "react"
import moment from "moment"
import { TSingleAppointment, TStatus, TApiSingleAvailabilityResp } from "@/types"
import FormSelect from "./ForumSelect"
import FormInput from "./FormInput"

export default function AppointmentEdit(props: { handler: any, data: TSingleAppointment | undefined }) {
  
  const [avail, setAvail] = useState<TApiSingleAvailabilityResp>()
  const [startTime, setStartTime] = useState(moment(props.data?.startTime).format("HH:mm"))
  const [endTime, setEndTime] = useState(moment(props.data?.endTime).format("HH:mm"))
  const [phoneNum, setPhoneNum] = useState(props.data?.phoneNum)
  const [status, setStatus] = useState(props.data?.status)  
  const [error, setError] = useState("")

  const availDate = moment(props.data?.startTime).format("YYYY-MM-DD")

  useEffect(() => {
    const getDates = async () => {
      const res = await fetch(`/api/availability/${props.data?.availId}`, {
        method: "GET"
      })
      return res.json()
    }
    getDates()
      .then(res => setAvail(res))
  }, [props.data?.availId])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const data = {
      availId: props.data?.availId,
      startTime: moment(`${availDate} ${startTime}`, "YYYY-MM-DD hh:mm"),
      endTime: moment(`${availDate} ${endTime}`, "YYYY-MM-DD hh:mm"),
      firstName: props.data?.firstName,
      lastName: props.data?.lastName,
      status: status,
      phoneNum: phoneNum
    } 

    const postData = async () => {
      const res = await fetch(`/api/appointments/${props.data?.id}`, {
        method: "PUT",
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
    <div className="bg-grey-dark w-[calc(100vw-2rem)] max-w-[28rem] py-4 px-4 flex flex-col gap-4 items-center border-[2px] rounded shadow-xl absolute top-0 z-20 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-grey py-2 px-10 border-b-black border-b-2 text-center">Edit Appointment for <br /><strong className="text-yellow">{props.data?.firstName} {props.data?.lastName}</strong></h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-stretch gap-6 text-grey my-6">
        <fieldset className="flex gap-4">
          <FormSelect props={{ name: "avialId", selectId: "apptFormAvial", label: "Selected Date:", defaultValue: props.data?.id, onChange: () => {}, required: true, disabled: true }}>
            <option value={props.data?.id}>{moment(props.data?.startTime).format("ddd, MMM DD")}</option>
          </FormSelect>
          <div className="w-full">
            <h1 className="text-yellow">Accepted Appointments:</h1>
            <ul>
              {avail?.availability.appointments.map((appt) => (
                <li key={appt.id}>
                  {appt.status === "accepted" ? (<p>{moment(appt.startTime).format("LT")} - {moment(appt.endTime).format("LT")}</p>) : null }
                </li>
              ))}
            </ul>
          </div>
        </fieldset>

        <fieldset className="flex gap-4">
          <FormInput attributes={{ name: "startTime", label: "Select a Start Time:", inputId: "apptFormStartTime", value: startTime, type: "time", onChange: (e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value), required: true }} />
          <FormInput attributes={{ name: "endTime", label: "Select a End Time:", inputId: "apptFormEndTime", value: endTime, type: "time", onChange: (e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value), required: true }} />
        </fieldset>

        <fieldset className="flex gap-4">
          <FormSelect props={{ name: "status", selectId: "apptFormStatus", label: "Status:", defaultValue: props.data?.status, onChange: (e:ChangeEvent<HTMLSelectElement>) => {let value = e.target.value as TStatus; setStatus(value)}, required: true }}>
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </FormSelect>
          <FormInput attributes={{ name: "phoneNum", label: "Phone Number:", inputId: "apptFormPhoneNum", value: phoneNum, type: "tel", onChange: (e:ChangeEvent<HTMLInputElement>) => setPhoneNum(e.target.value), required: true, styles: "w-[12rem]" }} />
        </fieldset>

        <p className="text-sm text-red text-center">{error}</p>
       
        <div className="flex gap-4 justify-center mb-2">
          <Button title="Cancel" handler={props.handler} styles="px-6" />
          <input type="submit" className="font-serif bg-yellow px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
        </div>
      </form>
    </div>    
  )
}