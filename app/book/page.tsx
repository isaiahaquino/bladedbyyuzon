"use client"

import { useEffect, useState } from "react"
import { TApiAllAvailabilitiesResp, TApiSingleAppointmentReq } from "@/types"
import moment from "moment"
import FormInput from "@/components/FormInput"
import FormSelect from "@/components/ForumSelect"
import { useRouter } from "next/navigation"

type apptTimes = { startTime: string, endTime: string }
type times = { 
  morning: apptTimes[],
  afternoon: apptTimes[],
  evening: apptTimes[]
}

export default function Book() {
  const [availability, setAvailability] = useState<TApiAllAvailabilitiesResp>()
  const [serviceLength, setServiceLength] = useState(0)
  const [selectedAvailabilityIndex, setSelectedAvailabilityIndex] = useState<number>()
  const [availableTimes, setAvailabileTimes] = useState<times>()
  const [selectedTime, setSelectedTime] = useState<apptTimes>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [phoneNum, setPhoneNum] = useState<string>()
  const [formError, setFormError] = useState<string>()

  const router = useRouter()

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
    if (selectedAvailabilityIndex !== undefined) {
      const startTime = moment(availability?.availabilities[selectedAvailabilityIndex].startTime)
      const endTime = moment(availability?.availabilities[selectedAvailabilityIndex].endTime)
      const appointments = availability?.availabilities[selectedAvailabilityIndex].appointments
      const availTimes:times = { morning: [], afternoon: [], evening: []}
      let tempStart = startTime
      let tempEnd = moment(availability?.availabilities[selectedAvailabilityIndex].startTime).add(serviceLength, "minutes")
      let tempMid = moment(availability?.availabilities[selectedAvailabilityIndex].startTime).add(serviceLength/2, "minutes")
      // console.log(appointments)

      while(tempStart < endTime) {
        let clear = true
        appointments?.forEach(appt => {
          if (appt.status !== 'accepted') {
            return;
          }

          const apptStart = moment(appt.startTime)
          const apptEnd = moment(appt.endTime)
          
          if ((tempStart > apptStart && tempStart< apptEnd) || (tempEnd > apptStart && tempEnd < apptEnd) || (tempMid > apptStart && tempMid < apptEnd)) {
            clear = false
            return;
          } 
        })
        if (clear) {
          if (tempStart.hours() > 6 && tempStart.hours() < 12) {
            availTimes.morning.push({ startTime: tempStart.format(), endTime: tempEnd.format()})
          } else if (tempStart.hours() >= 12 && tempStart.hours() < 18) {
            availTimes.afternoon.push({ startTime: tempStart.format(), endTime: tempEnd.format()})
          } else {
            availTimes.evening.push({ startTime: tempStart.format(), endTime: tempEnd.format()})
          }
        }
        tempStart.add(30, "minutes")
        tempMid.add(30, "minutes")
        tempEnd.add(30, "minutes")
      }
      setAvailabileTimes(availTimes)
    }
  }, [selectedAvailabilityIndex, availability, serviceLength])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (firstName === undefined || 
        lastName === undefined ||
        phoneNum === undefined ||
        selectedTime === undefined ||
        availability === undefined || 
        selectedAvailabilityIndex === undefined) {
      setFormError("Please fill out all sections of the form")
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
      const res = await fetch(`/api/appointments`, { 
        method: "POST",
        body: JSON.stringify(data)
      })
      if (res.ok) {
        router.push("/confirmation")
      } else {
        alert(res.statusText)
      }
    }
    postAppt()
  }

  const handleServiceSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceLength(parseInt(event.target.options[event.target.selectedIndex].value))
    setSelectedTime(undefined)
  }

  const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvailabilityIndex(event.target.selectedIndex-1)
  }

  return (
    <div className='flex flex-col items-center gap-[5rem] px-4 mt-[5rem] text-white'>
      <section className="text-center">
        <h1 className="text-3xl font-serif">Book an Appointment</h1>
      </section>

      <section className="my-10 w-full md:w-[736px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-serif relative">
          <fieldset className="flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded">
            <h1 className="text-lg">Please select a service:</h1>
            <FormSelect props={{ name: "service", defaultValue: 0, label: "", selectId: "formService", onChange: handleServiceSelect, required: true }}>
              <option disabled value={0}>-- select an option --</option>
              <option value={45}>Fade (45 min)</option>
              <option value={60}>Fade + Shear work (60 min)</option>
              <option value={70}>Fade + Beard (70 min)</option>
              <option value={90}>Fade + Beard + Shear work (90 min)</option>
            </FormSelect>
          </fieldset>

          <fieldset className={`w-full relative -z-10 -top-10 opacity-0 transition duration-300 ease-in-out flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded 
                                ${serviceLength === 0 ? "invisible" : "visible z-0 opacity-100 translate-y-10"}`}>
            <h1 className="text-lg">Please select a date:</h1>
            <FormSelect props={{ name: "date", defaultValue: 0, label: "", selectId: "formDate", onChange: handleDateSelect, required: true}}>
              <option disabled value={0}>-- select an option --</option>
              {availability?.availabilities.map((availability) => (
                  <option key={availability.id} value={availability.id}>{moment(availability.date).format("ddd, MMM DD")}</option>
                ))}
            </FormSelect>
          </fieldset>

          <fieldset className={`w-full relative -z-10 -top-10 opacity-0 transition duration-300 ease-in-out flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded 
                                ${selectedAvailabilityIndex === undefined ? "invisible" : "visible z-0 opacity-100 translate-y-10"}
                                ${serviceLength === 0 ? "hidden" : "flex"}`}>
            <h1 className="text-lg">
              Availability on&nbsp;
              <strong className="text-yellow font-medium">
                {selectedAvailabilityIndex === undefined ? null : moment(availability?.availabilities[selectedAvailabilityIndex].date).format("dddd, MMMM DD")}
              </strong>
            </h1>
            <div className="flex flex-col gap-6">
              
              <div>
                <h1>Morning</h1>
                <div className="flex flex-wrap gap-2 my-2 relative">
                  {availableTimes?.morning.map((slot, index) => (
                    <button 
                      className={`min-w-[6rem] shadow-sm py-2 bg-grey text-black border-black border-2 rounded-xl 
                                hover:bg-white hover:shadow-xl hover:-translate-y-1 transtition duration-300 ease-in-out 
                                  ${selectedTime === slot ? "bg-yellow hover:bg-yellow" : ""}`}
                      type="button" 
                      key={index} 
                      onClick={() => setSelectedTime(slot)}>
                        {moment(slot.startTime).format("LT").toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
              <h1>Afternoon</h1>
              <div className="flex flex-wrap gap-2 my-2 relative">
                {availableTimes?.afternoon.map((slot, index) => (
                  <button 
                    className={`min-w-[6rem] shadow-sm py-2 bg-grey text-black border-black border-2 rounded-xl 
                              hover:bg-white hover:shadow-xl hover:-translate-y-1 transtition duration-300 ease-in-out 
                                ${selectedTime === slot ? "bg-yellow hover:bg-yellow" : ""}`}
                    type="button" 
                    key={index} 
                    onClick={() => setSelectedTime(slot)}>
                      {moment(slot.startTime).format("LT").toLowerCase()}
                  </button>
                ))}
              </div>
              </div>
              
              <div>
              <h1>Evening</h1>
              <div className="flex flex-wrap gap-2 my-2 relative">
                {availableTimes?.evening.map((slot, index) => (
                  <button 
                    className={`min-w-[6rem] shadow-sm py-2 bg-grey text-black border-black border-2 rounded-xl 
                              hover:bg-white hover:shadow-xl hover:-translate-y-1 transtition-all duration-300 ease-in-out 
                                ${selectedTime === slot ? "bg-yellow hover:bg-yellow" : ""}`}
                    type="button" 
                    key={index} 
                    onClick={() => setSelectedTime(slot)}>
                      {moment(slot.startTime).format("LT").toLowerCase()}
                  </button>
                ))}
              </div>
              </div>
              
            </div>
          </fieldset>

          <fieldset className={`w-full relative -z-10 -top-10 opacity-0 transition duration-300 ease-in-out flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded 
                                ${selectedTime === undefined ? "invisible" : "visible z-0 opacity-100 translate-y-10"}
                                ${selectedAvailabilityIndex === undefined ? "hidden" : "flex"}`}>
            {/* Customer Info */}
            <h1 className="text-lg">Enter your details below</h1>
            <FormInput attributes={{name: "firstName", label: "First Name", inputId: "formFirstName", type: "text", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), required: true }} />
            <FormInput attributes={{name: "lastName", label: "Last Name", inputId: "formLastName", type: "text", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value), required: false }} />
            <FormInput attributes={{name: "phoneNum", label: "Phone Number", inputId: "formPhoneNum", type: "tel", onChange: (e:React.ChangeEvent<HTMLInputElement>) => setPhoneNum(e.target.value), pattern: "[0-9]{10}", placeholder: "6195552424", required: true }} />
          </fieldset>

          <h1 className=" font-medium text-xl text-red">{formError}</h1>

          <fieldset className={`w-full relative -z-10 opacity-0 transition duration-500 ease-in-out 
                                ${(firstName === undefined || lastName === undefined || phoneNum === undefined || selectedTime === undefined) ? "invisible" : "visible z-0 opacity-100 "}`}
          >
            <input 
              type="submit" 
              value="Book Appointment" 
              className="w-full mb-16 px-6 py-3 font-serif font-semibold text-xl bg-yellow hover:bg-white text-grey-dark rounded transition duration-300 ease-in-out"
            />
          </fieldset>
        </form>
      </section>
    </div>
  )
}