interface IFormSelect {
  name: string
  selectId: string
  label: string
  onChange: any
  required: boolean
  defaultValue: string | number | readonly string[] | undefined
}

export default function FormSelect({ props, children }:{ props: IFormSelect, children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <label 
        className="absolute top-[-0.5rem] left-3 bg-grey-dark px-2 text-xs" 
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <select
        className="w-full h-[3rem] py-2 text-center bg-grey-dark border-[2px] border-black rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none"
        id={props.selectId}
        name={props.name}
        onChange={props.onChange}
        required={props.required}
        defaultValue={props.defaultValue}
      >
        {children}
      </select>

    </div>
  )
}