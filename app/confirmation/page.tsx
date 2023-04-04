import { TApiSingleAppointmentResp } from "@/types"
import moment from "moment"
import Image from "next/image"


async function getAppointment () {
  const res = await fetch('http://localhost:3000/api/appointments/latest', { 
    cache: "no-store",
    method: "GET"
  })
  return res.json()
}

export default async function ConfirmationPage() {

  const apptData = await getAppointment() as TApiSingleAppointmentResp
  const appt = apptData.appointment

  return (
    <div className="flex flex-col items-center my-10 px-6 text-grey gap-20">
      <h1 className="text-2xl mt-20">Appointment request sent</h1>
      <section className="w-full p-6 bg-grey-dark rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <td colSpan={2} className="text-xl font-medium pb-6">Appointment Details</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Name:</td>
              <td className="text-right">{appt.firstName} {appt.lastName}</td>
            </tr>
            <tr>
              <td scope="row">Phone Number:</td>
              <td className="text-right">{appt.phoneNum}</td>
            </tr>
            <tr>
              <td scope="row">Appointment Date:</td>
              <td className="text-right">{moment(appt.startTime).format("dddd, MMMM DD")}</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td className="text-right">{moment(appt.startTime).format("LT")} - {moment(appt.endTime).format("LT")}</td>
            </tr>
          </tbody>
        </table>
      </section>
      
    </div>
  )
}