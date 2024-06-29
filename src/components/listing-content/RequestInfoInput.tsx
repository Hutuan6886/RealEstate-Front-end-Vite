import { ChangeEvent, InputHTMLAttributes, useState } from "react"

interface RequestInfoInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    name?: string;
}

const RequestInfoInput: React.FC<RequestInfoInputProps> = ({ label, name, ...props }) => {
    const [value, setValue] = useState<string>()
    return (
        <div className='relative'>
            <input name={name} type="text" className="w-full appearance-none px-3 pt-5 p-1
                                                    placeholder:text-transparent focus:placeholder:text-zinc-600
                                                    border border-zinc-600 rounded-[0.375rem] transition
            peer" placeholder={label} {...props} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)} />
            <label htmlFor={name} className={`absolute origin-[-30px]  top-0 left-3 transition
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-zinc-600
                                        peer-focus:scale-75 peer-focus:translate-x-2 peer-focus:-translate-y-[0.5px] peer-focus:font-semibold peer-focus:text-black
                                        ${value && "scale-75 translate-x-2 -translate-y-[0.5px] font-semibold text-black"}`}>{label}</label>
        </div>
    )
}

export default RequestInfoInput
