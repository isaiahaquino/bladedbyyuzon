"use client"

import Button from "./Button"
import { useEffect, useState } from "react"
import moment from "moment"
import { TApiAllAvailabilitiesResp, TApiSingleAppointmentReq } from "@/types"


export default function AppointmentForm(props: { handler: any }) {
  const [availDates, setAvailDates] = useState<TApiAllAvailabilitiesResp>({availabilities: []})
  const [availId, setAvailId] = useState<unknown>()
  const [availDate, setAvailDate] = useState<unknown>()
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [phoneNum, setPhoneNum] = useState<string>("")
  const [status, setStatus] = useState<string>("pending")
  

  useEffect(() => {
    const getDates = async () => {
      const res = await fetch('/api/availability/', {
        method: "GET"
      })
      return res.json()
    }
    getDates()
      .then(res => {
        setAvailDates(res)
        setAvailId(res.availabilities[0].id)
        setAvailDate(res.availabilities[0].date)
      })
  }, [])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const data = {
      availId: availId,
      startTime: moment(`${availDate} ${startTime}`, "YYYY-MM-DD hh:mm"),
      endTime: moment(`${availDate} ${endTime}`, "YYYY-MM-DD hh:mm"),
      firstName: firstName,
      lastName: lastName,
      status: status,
      phoneNum: phoneNum
    } 

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
          console.log(res.statusText)
        }
      })
    props.handler()
  }

  const handleSelectedAvail = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setAvailId(event.target.options[event.target.selectedIndex].dataset.id)
    setAvailDate(event.target.options[event.target.selectedIndex].dataset.date)
  }

  return (
    <div className="bg-black w-fill py-4 px-6 flex flex-col gap-4 items-center border-[2px] rounded border-grey-dark shadow-xl absolute top-0 z-20 left-[50%] -translate-x-[50%]">
      <h1 className="text-2xl text-grey py-2 border-b-grey-dark border-b-2">Create New Appointment</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-stretch gap-4 text-grey my-6">
        <fieldset className="relative self-center w-fill">
          <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="availId">Select Date:</label>
          <select id="apptFormAvail" name="availId" onChange={handleSelectedAvail} className="w-[10rem] h-[3rem] py-2 text-center bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" required>
            {availDates.availabilities.map((avail) => (
              <option data-id={avail.id} data-date={moment(avail.date).format("YYYY-MM-DD")} key={avail.id}>{moment(avail.date).format("ddd, MMM DD")}</option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex gap-4">
          <div className="relative">
            <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="py-2 px-4 w-full h-[3rem] bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none"></input>
          </div>
          <div className="relative">
            <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="py-2 px-4 w-full h-[3rem] bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none"></input>
          </div>
        </fieldset>
        <fieldset className="flex gap-4">
          <div className="relative">
            <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="startTime">Select a Start Time:</label>
            <input 
              className="py-2 px-7 w-full h-[3rem] text-center bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
              name="startTime" 
              id="startTime" 
              type="time" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)} 
              required 
            />
          </div>
          <div className="relative">
            <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="endTime">Select a End Time:</label>
            <input 
              className="py-2 px-7 w-full h-[3rem] text-center bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
              name="endTime" 
              id="endTime" 
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)} 
              required 
            />
          </div>
        </fieldset>
        <div className="flex gap-4">
          <div className="relative w-full">
            <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="status">Status:</label>
            <select id="status" name="status" onChange={(e) => setStatus(e.target.value)} required className="w-full h-[3rem] py-2 text-center bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none">
              <option value="accepted">Accepted</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          <div className="relative w-full">
            <label className="absolute top-[-0.5rem] left-3 bg-black px-2 text-xs" htmlFor="phoneNum">Phone Number:</label>
            <input type="tel" id="phoneNum" name="phoneNum" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="619-555-2424" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required className="w-full h-[3rem] px-4 py-2 bg-black border-[2px] border-grey-dark rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none"></input>
          </div>
        </div>
        
       
        <div className="flex gap-4 justify-center my-4">
          <Button title="Cancel" handler={props.handler} styles="px-6" />
          <input type="submit" className="font-serif bg-yellow px-6 text-grey-dark border-[1px] rounded-sm border-grey-dark hover:bg-white hover:text-black" />
        </div>
      </form>
    </div>    
  )
}