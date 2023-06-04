"use client"

import { TApiSingleAppointmentResp } from "@/types"
import { useEffect, useState } from "react"
import moment from "moment"
import Image from "next/image"

export default function ConfirmationPage() {

  const [appt, setAppt] = useState<TApiSingleAppointmentResp>()

  useEffect(() => {
    const getAppointment = async () => {
      const res = await fetch('/api/appointments/latest', { 
        cache: "no-store",
        method: "GET"
      })
      return res.json()
    }
    getAppointment()
      .then(data => setAppt(data))
  }, [])

  return (
    <div className="flex flex-col items-center px-6 gap-16 min-h-screen">
      <h1 className="text-2xl font-semibold mt-[7rem]">REQUEST SENT</h1>
      <section className="w-full p-6 bg-grey rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <td colSpan={2} className="text-xl font-medium pb-6">Appointment Details</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Name:</td>
              <td className="text-right">{appt?.appointment.firstName} {appt?.appointment.lastName}</td>
            </tr>
            <tr>
              <td scope="row">Phone Number:</td>
              <td className="text-right">{appt?.appointment.phoneNum}</td>
            </tr>
            <tr>
              <td scope="row">Appointment Date:</td>
              <td className="text-right">{moment(appt?.appointment.startTime).format("dddd, MMMM DD")}</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td className="text-right">{moment(appt?.appointment.startTime).format("LT")} - {moment(appt?.appointment.endTime).format("LT")}</td>
            </tr>
          </tbody>
        </table>
      </section>
      
    </div>
  )
}