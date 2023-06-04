"use client"

import { TApiAllAppointmentsResp } from "@/types"
import moment from "moment";
import { useState } from "react";
import { TbEdit, TbTrashXFilled } from "react-icons/tb"
import DelModal from "./DelModal"

interface IApptList {
  data: TApiAllAppointmentsResp | undefined;
  editHandler: any
}

export default function AppointmentList(props:IApptList) {
  const [delModal, setDelModal] = useState({ isOpen: false, id: "", name: "" })

  return (
    <div className="my-10 overflow-x-scroll sm:overflow-auto rounded-sm relative">
      { delModal.isOpen ? <DelModal handler={() => setDelModal({isOpen: false, id: "", name: ""})} id={delModal.id} value={delModal.name} category="appointments" /> : null }

      <table className="w-[550px] bg-grey border-[1px] border-black">
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
            props.data?.appointments?.map((appointment) => (
              <tr className="border-b-grey-dark border-b-[1px]" key={appointment.id}>
                <td className="text-center">{`${moment(appointment.startTime).format('MMM D')}`}</td>
                <td>{`${appointment.firstName} ${appointment.lastName == null ? '' : appointment.lastName}`}</td>
                <td>
                  <div>{`${moment(appointment.startTime).format('LT')}`} -</div>
                  <div>{`${moment(appointment.endTime).format('LT')}`}</div>
                </td>
                <td className="text-center">{appointment.status}</td>
                <td className="text-center">{appointment.phoneNum}</td>
                <td className="">
                  <button type="button" className="p-1" onClick={() => props.editHandler(appointment)}><TbEdit size={25} /></button>
                  <button type="button" className="p-1" onClick={() => setDelModal({ isOpen: true, id: appointment.id, name: appointment.firstName })}><TbTrashXFilled size={25} /></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
