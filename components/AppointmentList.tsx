"use client"

import { TApiAllAppointmentsResp } from "@/types"
import moment from "moment";
import { useState } from "react";
import { TbEdit, TbTrashXFilled } from "react-icons/tb"
import DelModal from "./DelModal"

interface IApptList {
  data: TApiAllAppointmentsResp;
  editHandler: any
}

export default function AppointmentList(props:IApptList) {
  const [delModal, setDelModal] = useState({ isOpen: false, id: "", name: "" })

  return (
    <div className="my-10 overflow-x-scroll rounded-sm relative">
      { delModal.isOpen ? <DelModal handler={() => setDelModal({isOpen: false, id: "", name: ""})} id={delModal.id} value={delModal.name} category="appointments" /> : null }

      <table className="w-fill bg-grey text-black">
        <thead>
          <tr className="bg-white py-10 border-b-black border-b-2">
            <th scope="col" className="px-2 min-w-[5rem]">Date</th>
            <th scope="col" className="px-2 min-w-[7rem]">Name</th>
            <th scope="col" className="px-2 min-w-[6rem]">Time</th>
            <th scope="col" className="px-2">Status</th>
            <th scope="col" className="px-2 min-w-[8rem]">Phone</th>
            <th scope="col" className="px-2 min-w-[2rem]"></th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-white py-4">
          {
            props.data.appointments?.map((appt) => (
              <tr className="border-b-grey-dark border-b-[1px]" key={appt.id}>
                <td className="text-center">{`${moment(appt.startTime).format('MMM D')}`}</td>
                <td>{`${appt.firstName} ${appt.lastName == null ? '' : appt.lastName}`}</td>
                <td>
                  <div>{`${moment(appt.startTime).format('LT')}`} -</div>
                  <div>{`${moment(appt.endTime).format('LT')}`}</div>
                </td>
                <td className="text-center">{appt.status}</td>
                <td className="text-center">{appt.phoneNum}</td>
                <td className="">
                  <button type="button" className="p-1" onClick={() => props.editHandler(appt)}><TbEdit size={25} /></button>
                  <button type="button" className="p-1" onClick={() => setDelModal({ isOpen: true, id: appt.id, name: appt.firstName })}><TbTrashXFilled size={25} /></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
