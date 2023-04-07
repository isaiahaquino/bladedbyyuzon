"use client"

import Button from "./Button"
import { useEffect, useState } from "react"
import moment from "moment"
import { TApiAllAvailabilitiesResp, TApiSingleAvailabilityResp } from "@/types"
import FormSelect from "./ForumSelect"
import FormInput from "./FormInput"


export default function AppointmentForm(props: { handler: any }) {
  const [availDates, setAvailDates] = useState<TApiAllAvailabilitiesResp>({availabilities: []})
  const [availabilityData, setAvailabilityData] = useState<TApiSingleAvailabilityResp>()
  const [availId, setAvailId] = useState<unknown>()
  const [availDate, setAvailDate] = useState<unknown>()
  const [availStart, setAvailStart] = useState<unknown>()
  const [availEnd, setAvailEnd] = useState<unknown>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNum, setPhoneNum] = useState("")
  const [status, setStatus] = useState("accepted")
  const [error, setError] = useState("")


  useEffect(() => {
    const getDates = async () => {
      const res = await fetch('/api/availability/', {
        method: "GET"
      })
      return res.json()
    }
    getDates()
      .then((res:TApiAllAvailabilitiesResp) => {
        setAvailDates(res)
        setAvailId(res.availabilities[0].id)
        setAvailDate(res.availabilities[0].date)
        setAvailStart(moment(res.availabilities[0].startTime).format("LT"))
        setAvailEnd(moment(res.availabilities[0].endTime).format("LT"))
      })
  }, [])

  useEffect(() => {
    const getAppointments = async () => {
      const res = await fetch(`/api/availability/${availId}/accepted`, { method: "GET" })
      return res.json()
    }
    getAppointments()
      .then(data => setAvailabilityData(data))

  }, [availId])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setError("")
    const data = {
      availId: availId,
      startTime: moment(`${availDate} ${startTime}`, "YYYY-MM-DD hh:mm"),
      endTime: moment(`${availDate} ${endTime}`, "YYYY-MM-DD hh:mm"),
      firstName: firstName,
      lastName: lastName,
      status: status,
      phoneNum: phoneNum
    } 

    // If Accepted, check for conflict
    if (data.status === "accepted") {
      if (availabilityData !== undefined) {
        for (const appt of availabilityData.availability.appointments) {
          const apptStart = moment(appt.startTime)
          const apptEnd = moment(appt.endTime)
          const apptMid = moment(appt.startTime).add(30, "minutes")
          if (apptStart < data.startTime && data.startTime < apptEnd|| 
              apptStart < data.endTime && data.endTime < apptEnd || 
              data.startTime < apptMid && apptMid < data.endTime) {
                setError("Conflict with existing accepted appointments.")
          }
        }
      }
    }
    if (error !== "") { return }

    const postData = async () => {
      const res = await fetch('/api/appointments', {
        method: "POST",
        body: JSON.stringify(data),
      })
      return res
    }
    postData()
      .then((res) => {
        if (!res.ok) {
          alert(res.statusText)
        }
      })
    props.handler()
  }

  const handleSelectedAvail = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setAvailId(event.target.options[event.target.selectedIndex].dataset.id)
    setAvailDate(event.target.options[event.target.selectedIndex].dataset.date)
    setAvailStart(event.target.options[event.target.selectedIndex].dataset.start)
    setAvailEnd(event.target.options[event.target.selectedIndex].dataset.end)
  }

  return (
    <div className="bg-grey-dark w-[calc(100vw-2rem)] py-4 px-2 flex flex-col gap-4 items-center border-[2px] roundedshadow-xl absolute top-0 z-20 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-grey py-2 px-6 border-b-black border-b-2">Create New Appointment</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-stretch gap-4 text-grey my-6">
        <fieldset className="flex gap-4">
          <FormSelect props={{ name: "avialId", selectId: "apptFormAvial", label: "Select Date:", onChange: handleSelectedAvail, required: true }}>
            {availDates.availabilities.map((avail) => (
              <option data-id={avail.id} data-date={moment(avail.date).format("YYYY-MM-DD")} data-start={moment(avail.startTime).format("LT")} data-end={moment(avail.endTime).format("LT")} key={avail.id}>{moment(avail.date).format("ddd, MMM DD")}</option>
            ))}
          </FormSelect>
          <div className="flex-grow-0">
            <h1 className="text-yellow">Availability:</h1>
            <p className="text-sm">{`${availStart}`} to {`${availEnd}`}</p>
          </div>
          <div className="flex-shrink-0">
              <h2 className="text-yellow">Appointments:</h2>
              <ul>
                {availabilityData?.availability?.appointments.map((appt) => (
                  <li key={appt.id}>
                    <p className="text-sm">{moment(appt.startTime).format("LT")}-{moment(appt.endTime).format("LT")}</p>
                  </li>
                ))}
              </ul>
            </div>
        </fieldset>

        <fieldset className="flex gap-4">
          <FormInput attributes={{ name: "firstName", label: "First Name:", inputId: "apptFormFirstName", value: firstName, type: "text", onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), required: true }} />
          <FormInput attributes={{ name: "lastName", label: "Last Name:", inputId: "apptFormLastName", value: lastName, type: "text", onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value), required: true }} />
        </fieldset>

        <fieldset className="flex gap-4">
          <FormInput attributes={{ name: "startTime", label: "Select a Start Time:", inputId: "apptFormStartTime", value: startTime, type: "time", onChange: (e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value), min: moment(availStart as string, "LT").format("HH:mm"), required: true }} />
          <FormInput attributes={{ name: "endTime", label: "Select a End Time:", inputId: "apptFormEndTime", value: endTime, type: "time", onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value), min: startTime, max: moment(availEnd as string, "LT").format("HH:mm"),  required: true }} />
        </fieldset>


        <fieldset className="flex gap-4">
          <FormSelect props={{ name: "status", selectId: "apptFormStatus", label: "Status:", defaultValue: "accepted", onChange: (e:React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value), required: true }}>
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </FormSelect>
          <FormInput attributes={{ name: "phoneNum", label: "Phone Number:", inputId: "apptFormPhoneNum", value: phoneNum, type: "tel", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setPhoneNum(e.target.value), required: true, pattern: "[1-9]{10}", styles: "w-[14rem]" }} />
        </fieldset> 

        <p className="text-sm text-red text-center">{error}</p>
       
        <div className="flex gap-4 justify-center my-2">
          <Button title="Cancel" handler={props.handler} styles="px-6" />
          <input type="submit" className="font-serif bg-yellow px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
        </div>
      </form>
    </div>    
  )
}