"use client"

import AppointmentList from "@/components/AppointmentList"
import AvailabilityList from "@/components/AvailabilityList"
import Tabs from "@/components/Tabs"
import Button from "@/components/Button"
import { useState, useEffect } from "react"
import AvailabilityForm from "@/components/AvailabilityForm"
import AvailabilityEdit from "@/components/AvailabilityEdit"
import AppointmentForm from "@/components/AppointmentForm"

export default function AdminHome() {

  // Table data
  const [appointmentCategory, setAppointmentCategory] = useState('')
  const [availabilityCategory, setAvailabilityCategory] = useState('')
  const [appointmentData, setAppointmentData] = useState({appointments: []})
  const [availabilityData, setAvailabilityData] = useState({availabilities: []})

  // Modals
  const [availabilityForm, setAvailabilityForm] = useState(false)
  const [availabilityEdit, setAvailabilityEdit] = useState(false)
  const [availabilityEditData, setAvailabilityEditData] = useState({})
  const [appointmentForm, setAppointmentForm] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/appointments/${appointmentCategory}`, {
        method: "GET",
      })
      return res.json()
    }
    getData()
      .then((data) => setAppointmentData(data))
  }, [appointmentCategory])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/availability/${availabilityCategory}`, {
        method: "GET",
      })
      return res.json()
    }
    getData()
      .then((data) => setAvailabilityData(data))
  }, [availabilityCategory, availabilityForm])

  const availabilityTabs = {
    tabs: [
      {title: 'Upcoming', handler: setAvailabilityCategory, slug: ''},
      {title: 'Expired', handler: setAvailabilityCategory, slug: 'expired'}
    ]
  }

  const appointmentTabs = {
    tabs: [
      {title: 'All', handler: setAppointmentCategory, slug: ''},
      {title: 'Accepted', handler: setAppointmentCategory, slug: 'accepted'},
      {title: 'Pending', handler: setAppointmentCategory, slug: 'pending'},
      {title: 'Rejected', handler: setAppointmentCategory, slug: 'rejected'},
    ]
  }

  const handleAvailEdit = (data:any) => {
    setAvailabilityEdit(true)
    setAvailabilityEditData(data)
  }

  return (
    <div className="px-6 mx-auto w-screen relative">
      {/* <section className="mt-[5rem]">
        <h1 className="text-3xl text-grey">Summary</h1>
      </section> */}



      <section className="my-10 relative">
        {availabilityEdit ? <AvailabilityEdit handler={() => setAvailabilityEdit(false)} data={availabilityEditData} /> : null}
        
        <h1 className="text-3xl my-4 text-grey">Availability</h1>
        <Tabs tabs={availabilityTabs.tabs} />
        <AvailabilityList data={availabilityData} editHandler={handleAvailEdit} />
        
        {availabilityForm ? <AvailabilityForm handler={() => setAvailabilityForm(false)} /> : <Button title="Add Availability" handler={() => setAvailabilityForm(true)} styles="" /> }
      </section>

      <section className="mt-[10rem] mb-[4rem] relative">
        <h1 className="text-3xl my-4 text-grey">Schedule</h1>
        <Tabs tabs={appointmentTabs.tabs} />
        <AppointmentList data={appointmentData} />
        {appointmentForm ? <AppointmentForm handler={() => setAppointmentForm(false)} /> : <Button title="Add Appointment" handler={() => setAppointmentForm(true)} styles="" /> }
      </section>
    </div>
  )
}