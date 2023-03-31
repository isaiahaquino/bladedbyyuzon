interface IFormInput {
  attributes: {
    name: string
    label: string
    inputId: string
    type: string
    onChange: any
    required: boolean
    pattern?: string
    placeholder?: string
  }
}

export default function FormInput(props:IFormInput) {
  return (
    <div className="relative">
      <label 
        htmlFor={props.attributes.name}
        className="absolute top-[-0.5rem] left-3 bg-grey-dark px-2 text-xs"
      >
        {props.attributes.label}
      </label>
      <input 
        className="py-2 px-7 w-full h-[3rem] bg-grey-dark border-[2px] border-black rounded invalid:border-red focus:invalid:border-red focus:border-yellow focus:outline-none" 
        id={props.attributes.inputId} 
        name={props.attributes.name}
        type={props.attributes.type}
        onChange={props.attributes.onChange}
        pattern={props.attributes.pattern}
        placeholder={props.attributes.placeholder}
        required={props.attributes.required}
      />
    </div>
  )
}