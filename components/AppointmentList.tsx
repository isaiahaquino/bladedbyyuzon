import { TApiAllAppointmentsResp } from "@/types"
import moment from "moment";

interface IApptList {
  data: TApiAllAppointmentsResp;
}


export default function AppointmentList(props:IApptList) {
  return (
    <div className="my-10 overflow-x-scroll rounded-sm">
      <table className="w-fill bg-grey text-black">
        <thead>
          <tr className="bg-white py-10 border-b-black border-b-2">
            <th scope="col" className="px-2 min-w-[5rem]">Date</th>
            <th scope="col" className="px-2 min-w-[7rem]">Name</th>
            <th scope="col" className="px-2 min-w-[6rem]">Time</th>
            <th scope="col" className="px-2">Status</th>
            <th scope="col" className="px-2">Phone</th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-white py-4">
          {
            props.data.appointments?.map((appt, index) => (
              <tr className="border-b-grey-dark border-b-[1px]" key={index}>
                <td className="pl-2">{`${moment(appt.startTime).format('MMM D')}`}</td>
                <td>{`${appt.firstName} ${appt.lastName == null ? '' : appt.lastName}`}</td>
                <td>
                  <div>{`${moment(appt.startTime).format('LT')}`} -</div>
                  <div>{`${moment(appt.endTime).format('LT')}`}</div>
                </td>
                <td>{appt.status}</td>
                <td className="px-2">{appt.phoneNum}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
