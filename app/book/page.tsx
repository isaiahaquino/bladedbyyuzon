"use client"

import { useEffect, useState } from "react"
import { TApiAllAvailabilitiesResp, TApiSingleAppointmentReq, TApiSingleAvailabilityResp } from "@/types"
import moment from "moment"
import FormInput from "@/components/FormInput"
import FormSelect from "@/components/ForumSelect"

export default function Book() {
  type times = { startTime: string, endTime: string }

  const [availability, setAvailability] = useState<TApiAllAvailabilitiesResp>()
  const [serviceLength, setServiceLength] = useState(0)
  const [selectedAvailabilityIndex, setSelectedAvailabilityIndex] = useState<number>()
  const [availableTimes, setAvailabileTimes] = useState([{ startTime: "", endTime: ""}])
  const [selectedTime, setSelectedTime] = useState<times>()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNum, setPhoneNum] = useState("")


  useEffect(() => {
    const getAvail = async () => {
      const res = await fetch('/api/availability', {
        method: "GET",
      })
      return res.json()
    }
    getAvail()
      .then(data => setAvailability(data))
  }, [])

  useEffect(() => {
    findAvailableTimes()
  }, [selectedAvailabilityIndex])

  const handleSelectedDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvailabilityIndex(event.target.selectedIndex-1)
  }

  const findAvailableTimes = () => {
    if (selectedAvailabilityIndex !== undefined) {
      const startTime = moment(availability?.availabilities[selectedAvailabilityIndex].startTime)
      const endTime = moment(availability?.availabilities[selectedAvailabilityIndex].endTime)
      const appointments = availability?.availabilities[selectedAvailabilityIndex].appointments
      const availTimes = []
      let tempStart = startTime
      let tempEnd = moment(availability?.availabilities[selectedAvailabilityIndex].startTime).add(serviceLength, "minutes")
      let tempMid = moment(availability?.availabilities[selectedAvailabilityIndex].startTime).add(serviceLength/2, "minutes")
      while(tempStart < endTime) {
        let clear = true
        appointments?.forEach(appt => {
          while (clear) {
            const apptStart = moment(appt.startTime)
            const apptEnd = moment(appt.endTime)
            
            if ((tempStart > apptStart && tempStart< apptEnd) || (tempEnd > apptStart && tempEnd < apptEnd) || (tempMid > apptStart && tempMid < apptEnd)) {
              clear = false
              return;
            } 
          }
        })
        if (clear) {
          availTimes.push({ startTime: tempStart.format(), endTime: tempEnd.format()})
        }
        tempStart.add(30, "minutes")
        tempMid.add(30, "minutes")
        tempEnd.add(30, "minutes")
      }
      setAvailabileTimes(availTimes)
    }
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (selectedTime === undefined) {
      return;
    } else if (availability === undefined) {
      return;
    } else if (selectedAvailabilityIndex === undefined) {
      return;
    }
    const data: TApiSingleAppointmentReq = {
      startTime: new Date(selectedTime?.startTime),
      endTime: new Date(selectedTime?.endTime),
      firstName: firstName,
      lastName: lastName,
      phoneNum: phoneNum,
      status: "pending",
      availId: availability?.availabilities[selectedAvailabilityIndex].id,
    }
    const postAppt = async () => {
      console.log(data)
    }
    postAppt()
  }

  return (
    <div className='flex flex-col gap-[5rem] px-4 mt-[5rem] text-white'>
      <section className="text-center">
        <h1 className="text-3xl font-serif">Book an Appointment</h1>
      </section>

      <section className="my-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-serif">
          <fieldset className="flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded">
            <h1>Please select a service:</h1>
            <FormSelect props={{ name: "service", defaultValue: 0, label: "", selectId: "formService", onChange: (event: React.ChangeEvent<HTMLSelectElement>) => setServiceLength(parseInt(event.target.options[event.target.selectedIndex].value)), required: true }}>
              <option disabled value={0}>-- select an option --</option>
              <option value={45}>Fade (45 min)</option>
              <option value={60}>Fade + Shear work (60 min)</option>
              <option value={70}>Fade + Beard (70 min)</option>
              <option value={90}>Fade + Beard + Shear work (90 min)</option>
            </FormSelect>
          </fieldset>

          <fieldset className={`flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded ${serviceLength === 0 ? "hidden" : "flex"}`}>
            <h1>Please select a date:</h1>
            <FormSelect props={{ name: "date", defaultValue: 0, label: "", selectId: "formDate", onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {setSelectedAvailabilityIndex(event.target.selectedIndex-1)}, required: true}}>
              <option disabled value={0}>-- select an option --</option>
              {availability?.availabilities.map((availability) => (
                  <option key={availability.id} value={availability.id}>{moment(availability.date).format("ddd, MMM DD")}</option>
                ))}
            </FormSelect>
          </fieldset>

          <fieldset className={`flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded ${selectedAvailabilityIndex === undefined ? "hidden" : "flex"}`}>
            {/* Select Time Component */}
            <h1>Please select a time</h1>
            <div className="">
              {availableTimes.map((slot, index) => (
                <button 
                  className="min-w-[6rem] py-2 bg-grey text-black border-black border-2 rounded-xl"
                  type="button" 
                  key={index} 
                  onClick={() => setSelectedTime(slot)}>
                    {moment(slot.startTime).format("LT").toLowerCase()}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className={`flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded ${selectedTime === undefined ? "hidden" : "flex"}`}>
            {/* Customer Info */}
            <h1>Enter your details below</h1>
            <FormInput attributes={{name: "firstName", label: "First Name", inputId: "formFirstName", type: "text", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), required: true }} />
            <FormInput attributes={{name: "lastName", label: "Last Name", inputId: "formLastName", type: "text", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value), required: false }} />
            <FormInput attributes={{name: "phoneNum", label: "Phone Number", inputId: "formPhoneNum", type: "tel", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setPhoneNum(e.target.value), pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}", placeholder: "123-413-1345", required: true }} />
          </fieldset>

          <fieldset className={`${(firstName || lastName || phoneNum) ? "block" : "hidden"}`}>
            <input type="submit" value="Book Appointment" className="w-full py-3 font-serif font-semibold text-xl bg-yellow px-6 text-grey-dark rounded"/>
          </fieldset>
        </form>
      </section>
    </div>
  )
}