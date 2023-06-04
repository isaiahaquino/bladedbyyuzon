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
    <div className='flex items-center gap-2 overflow-x-scroll sm:overflow-visible'>
      {
        props.tabs.map((tab, idx) => (
          <button 
            key={idx} 
            className={`px-4 py-1 border-b-2 ${index === idx ? 'text-yellow border-b-yellow' : 'text-black'}`} 
            onClick={() => handleTab(tab.handler, idx, tab.slug)}
          >
            {tab.title}
          </button>
        ))
      }
    </div>
  )
}