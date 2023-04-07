"use client"

import AppointmentList from "@/components/AppointmentList"
import AvailabilityList from "@/components/AvailabilityList"
import Tabs from "@/components/Tabs"
import Button from "@/components/Button"
import { useState, useEffect } from "react"
import AvailabilityForm from "@/components/AvailabilityForm"
import AvailabilityEdit from "@/components/AvailabilityEdit"
import AppointmentForm from "@/components/AppointmentForm"
import AppointmentEdit from "@/components/AppointmentEdit"
import { TApiAllAppointmentsResp, TApiAllAvailabilitiesResp, TSingleAppointment, TSingleAvailability } from "@/types"
import { MdRefresh, MdAdd } from "react-icons/md"

export default function AdminHome() {
  // Table data
  const [appointmentCategory, setAppointmentCategory] = useState('')
  const [availabilityCategory, setAvailabilityCategory] = useState('')
  const [appointmentData, setAppointmentData] = useState<TApiAllAppointmentsResp>()
  const [availabilityData, setAvailabilityData] = useState<TApiAllAvailabilitiesResp>()
  const [reset, setReset] = useState(1)

  // Modals
  const [availabilityForm, setAvailabilityForm] = useState(false)
  const [availabilityEdit, setAvailabilityEdit] = useState(false)
  const [availabilityEditData, setAvailabilityEditData] = useState<TSingleAvailability>()
  const [appointmentForm, setAppointmentForm] = useState(false)
  const [appointmentEdit, setAppointmentEdit] = useState(false)
  const [appointmentEditData, setAppointmentEditData] = useState<TSingleAppointment>()

  // Set to dark mode
  useEffect(() => { window.document.documentElement.style.colorScheme = "dark" }, [])

  // Appointment List
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/appointments/${appointmentCategory}`, {
        method: "GET",
        cache: "no-store",
      })
      return res.json()
    }
    getData()
      .then((data) => setAppointmentData(data))
      // .then(res => console.log(res.msg))
  }, [appointmentCategory, appointmentEdit, appointmentForm, reset])

  // Availability List
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/availability/${availabilityCategory}`, {
        method: "GET",
        cache: "no-store",
      })
      return res.json()
    }
    getData()
      .then((data) => setAvailabilityData(data))
  }, [availabilityCategory, availabilityEdit, availabilityForm, reset])

  // Reset
  const handleReset = () => {
    setReset(Math.random())
  }

  // Table Tabs
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

  // Edit form handlers
  const handleAvailEdit = (data:any) => {
    setAvailabilityEdit(true)
    setAvailabilityEditData(data)
  }
  const handleApptEdit = (data:TSingleAppointment) => {
    setAppointmentEdit(true)
    setAppointmentEditData(data)
  }

  return (
    <div className="px-6 mx-auto w-screen relative">
      {/* <section className="mt-[5rem]">
        <h1 className="text-3xl text-grey">Summary</h1>
      </section> */}
      
      <section className="my-10 relative">
        {availabilityEdit ? <AvailabilityEdit handler={() => setAvailabilityEdit(false)} data={availabilityEditData} /> : null}
        
        <div className="flex items-center gap-4">
          <h1 className="text-3xl my-4 text-grey">Availability</h1>
          <button className="p-0.5 rounded-xl border border-grey shadow-md" onClick={handleReset}><MdRefresh size={20} /></button>
          <button className="p-0.5 rounded-xl border border-grey shadow-md" onClick={() => setAvailabilityForm(true)}><MdAdd size={20} /></button>
        </div>
        <Tabs tabs={availabilityTabs.tabs} />
        <AvailabilityList data={availabilityData} editHandler={handleAvailEdit} />
        
        {availabilityForm ? <AvailabilityForm handler={() => setAvailabilityForm(false)} /> : <></> }
      </section>

      <section className="mt-[10rem] mb-[4rem] relative">
        {appointmentEdit ? <AppointmentEdit handler={() => setAppointmentEdit(false)} data={appointmentEditData} /> : null }
        
        <div className="flex items-center gap-4">
          <h1 className="text-3xl my-4 text-grey">Schedule</h1>
          <button className="p-0.5 rounded-xl border border-grey shadow-md" onClick={handleReset}><MdRefresh size={20} /></button>
          <button className="p-0.5 rounded-xl border border-grey shadow-md" onClick={() => setAppointmentForm(true)}><MdAdd size={20} /></button>
        </div>
        <Tabs tabs={appointmentTabs.tabs} />
        <AppointmentList data={appointmentData} editHandler={handleApptEdit} />
        {appointmentForm ? <AppointmentForm handler={() => setAppointmentForm(false)} /> : <></> }
      </section>
    </div>
  )
}