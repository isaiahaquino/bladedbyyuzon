interface IButton {
  title: string
  handler: any
  styles: string
}

export default function Button(props:IButton) {
  return (
    <button className={`border-[1px] text-grey p-2 rounded-sm font-serif bg-black hover:bg-grey-dark hover:text-white ${props.styles} transition-all duration-150 ease-in-out `} onClick={props.handler}>
      {props.title}
    </button>
  )
}