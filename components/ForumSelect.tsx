interface IFormSelect {
  name: string
  selectId: string
  label: string
  onChange: any
  required: boolean
  defaultValue?: string | number | readonly string[] | undefined
  disabled?: boolean
  styles? : string
}

export default function FormSelect({ props, children }:{ props: IFormSelect, children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <label 
        className="absolute top-[-0.5rem] z-10 left-3 bg-white px-2 text-xs" 
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <select
        className={`${props.styles} w-full h-[3rem] py-2 pl-4 bg-white border-[2px] border-grey  invalid:border-red focus:invalid:border-red focus:border-black focus:outline-none`}
        id={props.selectId}
        name={props.name}
        onChange={props.onChange}
        required={props.required}
        defaultValue={props.defaultValue}
        disabled= {props.disabled}
      >
        {children}
      </select>

    </div>
  )
}