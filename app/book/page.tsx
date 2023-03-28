"use client"

import { useEffect, useState } from "react"
import { TApiAllAvailabilitiesResp, TApiSingleAvailabilityResp } from "@/types"
import moment from "moment"

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
    <div className='flex flex-col gap-[5rem] px-4 mt-10 text-grey'>
      <section className="text-center">
        <h1 className="text-3xl font-serif">Book an Appointment</h1>
      </section>

      <section>
        <form className="flex flex-col gap-4">
          <fieldset className="flex flex-col">
            <label htmlFor="service">Select a service:</label>
            <select id="formService" name="service">
              <option value="f">Fade</option>
              <option value="fs">Fade + Shear work</option>
              <option value="fb">Fade + Beard</option>
              <option value="fbs">Fade + Beard + Shear work</option>
            </select>
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="date">Select a date:</label>
            <select id="formDate" name="date" onChange={handleSelectedDate}>
              {availability?.availabilities.map((availability) => (
                <option key={availability.id}>{moment(availability.date).format("ddd, MMM DD")}</option>
              ))}
            </select>
          </fieldset>
        </form>
      </section>
    </div>
  )
}