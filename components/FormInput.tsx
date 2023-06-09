interface IFormInput {
  attributes: {
    name: string
    label: string
    inputId: string
    type: string
    onChange: any
    required: boolean
    value?: any
    pattern?: string
    placeholder?: string
    styles?: string
    min?: string | number
    max?: string | number
    step?: string | number
  }
}

export default function FormInput(props:IFormInput) {
  return (
    <div className="relative text-black bg-[inherit]">
      <label 
        htmlFor={props.attributes.name}
        className="absolute top-[-0.5rem] left-3 bg-[inherit] px-2 text-xs"
      >
        {props.attributes.label}
      </label>
      <input 
        className={`${props.attributes.styles} py-2 px-7 w-full h-[3rem] bg-[inherit] border-[2px] border-grey-dark focus:invalid:border-red focus:border-black focus:valid:border-green focus:outline-none`}
        id={props.attributes.inputId} 
        name={props.attributes.name}
        type={props.attributes.type}
        value={props.attributes.value}
        onChange={props.attributes.onChange}
        min={props.attributes.min}
        max={props.attributes.max}
        pattern={props.attributes.pattern}
        placeholder={props.attributes.placeholder}
        required={props.attributes.required}
        step={props.attributes.step}
      />
    </div>
  )
}