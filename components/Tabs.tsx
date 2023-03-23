import { useState } from "react"

interface ITabs {
  tabs: {
    title: string,
    handler: any,
    slug: string,
  }[]
}

export default function Tabs(props:ITabs) {
  const [index, setIndex] = useState(0)

  const handleTab = (handler:any, idx:number, slug:string) => {
    setIndex(idx)
    handler(slug)
  }



  return (
    <div className='flex items-center gap-2 overflow-x-scroll'>
      {
        props.tabs.map((tab, idx) => (
          <button key={idx} className={`px-4 py-1 border-b-2 ${index === idx ? 'text-yellow border-b-yellow' : 'text-white'}`} onClick={() => handleTab(tab.handler, idx, tab.slug)}>{tab.title}</button>
        ))
      }
      
          {/* <button className={`px-4 py-1 border-b-2 ${index === 1 ? 'text-yellow border-b-yellow' : 'text-white'}`} onClick={() => handleTab("", 1)}>All</button>
          <button className={`px-4 py-1 border-b-2 ${index === 2 ? 'text-yellow border-b-yellow' : 'text-white'}`} onClick={() => handleTab("accepted", 2)}>Accepted</button>
          <button className={`px-4 py-1 border-b-2 ${index === 3 ? 'text-yellow border-b-yellow' : 'text-white'}`} onClick={() => handleTab("pending", 3)}>Pending</button>
          <button className={`px-4 py-1 border-b-2 ${index === 4 ? 'text-yellow border-b-yellow' : 'text-white'}`} onClick={() => handleTab("rejected", 4)}>Rejected</button> */}
    </div>
  )
}