"use client"

import { useEffect, useState } from "react"
import { TApiAllAvailabilitiesResp, TApiSingleAvailabilityResp } from "@/types"
import moment from "moment"
import FormInput from "@/components/FormInput"

export default function Book() {
  const [availability, setAvailability] = useState<TApiAllAvailabilitiesResp>()
  const [service, setService] = useState({})
  const [selectedAvailabilityIndex, setSelectedAvailabilityIndex] = useState<number>()

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

  const handleSelectedDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setSelectedAvailabilityIndex(event.target.selectedIndex)
  }

  return (
    <div className='flex flex-col gap-[5rem] px-4 mt-[5rem] text-grey'>
      <section className="text-center">
        <h1 className="text-3xl font-serif">Book an Appointment</h1>
      </section>

      <section className="my-10">
        <form className="flex flex-col gap-4">
          <fieldset className="flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded">
            <label htmlFor="service">Select a service</label>
            <select id="formService" name="service">
              <option value="f">Fade</option>
              <option value="fs">Fade + Shear work</option>
              <option value="fb">Fade + Beard</option>
              <option value="fbs">Fade + Beard + Shear work</option>
            </select>
          </fieldset>
          <fieldset className="flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded">
            <label htmlFor="date">Select a date</label>
            <select id="formDate" name="date" onChange={handleSelectedDate}>
              {availability?.availabilities.map((availability) => (
                <option key={availability.id}>{moment(availability.date).format("ddd, MMM DD")}</option>
              ))}
            </select>
          </fieldset>
            {/* Select Time Component */}

          <fieldset className="flex flex-col gap-4 bg-grey-dark px-4 py-6 rounded">
            {/* Customer Info */}
            <h1>Enter your details below</h1>
            <FormInput attributes={{name: "firstName", label: "First Name", inputId: "formFirstName", type: "text", onChange: () => {}, required: true }} />
            <FormInput attributes={{name: "lastName", label: "Last Name", inputId: "formLastName", type: "text", onChange: () => {}, required: false }} />
            <FormInput attributes={{name: "phoneNum", label: "Phone Number", inputId: "formPhoneNum", type: "tel", onChange: () => {}, required: true }} />

          </fieldset>
          <fieldset>
            <input type="submit" value="Book Appointment" className="w-full py-3 font-serif font-semibold text-xl bg-yellow px-6 text-grey-dark rounded"/>
          </fieldset>
        </form>
      </section>
    </div>
  )
}