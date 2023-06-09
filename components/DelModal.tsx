interface IDelModal {
  handler: any
  id: string
  value: string
  category: string
}

export default function DelModal(props:IDelModal) {

  const handleDelete = () => {
    // TODO: Confirm Delete
    const deleteAvail = async () => {
      const res = await fetch(`/api/${props.category}/${props.id}`, {
        method: "DELETE"
      })
      return res
    }
    deleteAvail()
      .then(res => {
        if (!res.ok) {
          alert(res.statusText)
        }
      })
    props.handler()
  }

  return (
    <div className="flex flex-col items-center gap-2 bg-grey py-5 px-6 text-black border-2 shadow absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg">
      <h1 className="text-xl w-[10rem] text-center">Delete {`${props.category}`} for <strong>{props.value}</strong>?</h1>
      <div className="flex gap-2">
        <button onClick={props.handler} className="border-[1px] rounded p-1">Cancel</button>
        <button onClick={handleDelete} className="border-[1px] rounded bg-red p-1">Delete</button>
      </div>
    </div>
  )
}