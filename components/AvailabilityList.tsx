import { TApiAllAvailabilitiesResp } from "@/types"
import moment from "moment"
import { useState } from "react"
import { TbEdit, TbTrashXFilled } from "react-icons/tb"
import DelModal from "./DelModal"

interface IAvail {
  data: TApiAllAvailabilitiesResp | undefined
  editHandler: any
}

export default function AvailabilityList(props:IAvail) {
  const [delPopup, setDelPopup] = useState({isOpen: false, id: "", date: ""})

  return (
    <div className="my-10 overflow-x-scroll sm:overflow-auto rounded-sm relative">
      { delPopup.isOpen ? <DelModal handler={() => setDelPopup({isOpen: false, id: "", date: ""})} id={delPopup.id} value={delPopup.date} category="availability" /> : null }
      
      <table className="w-[550px] bg-grey text-black">
        <thead>
          <tr className="bg-white py-10 border-b-black border-b-2">
            <th scope="col" className="px-2 min-w-[4rem]">Date</th>
            <th scope="col" className="px-2 min-w-[5rem]">Start Time</th>
            <th scope="col" className="px-2 min-w-[5rem]">End Time</th>
            <th scope="col" className="px-2 min-w-[10rem]">Appointments</th>
            <th scope="col" className="px-2 min-w-[2rem]"></th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-white">
          {
            props.data?.availabilities?.map((avail) => (
              <tr className="text-center border-b-grey-dark border-b-[1px]" key={avail.id}>
                <td>{`${moment(avail.date).format("MMM D")}`}</td>
                <td>{`${moment(avail.startTime).format("LT")}`}</td>
                <td>{`${moment(avail.endTime).format("LT")}`}</td>
                <td>
                  <ul>
                    {
                      avail.appointments.map((appt) => (
                        <li key={appt.id}>
                          {appt.status === "accepted" ? (
                            <p>
                              {`${moment(appt.startTime).format("LT")}-${moment(appt.endTime).format("LT")}`}
                            </p>
                          ) : (<></>) }
                        </li>
                        
                      ))
                    }
                  </ul>  
                </td>
                <td className="">
                  <button type="button" className="p-2" onClick={() => props.editHandler(avail)}><TbEdit size={25} /></button>
                  <button type="button" className="p-2" onClick={() => setDelPopup({ isOpen: true, id: avail.id, date: moment(avail.date).format("MMM D")})}><TbTrashXFilled size={25} /></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}