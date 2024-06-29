import { ChangeEvent, InputHTMLAttributes, useState } from "react"

interface RequestInfoTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    name?: string;
}

const RequestInfoTextArea: React.FC<RequestInfoTextAreaProps> = ({ label, name, ...props }) => {
    const [value, setValue] = useState<string>(props.defaultValue as string)
    return (
        <div className='relative'>
            <textarea name={name} type="text" className="w-full h-[100px] resize-none px-3 pt-5 p-1 
                                                    placeholder:text-transparent focus:placeholder:text-zinc-600
                                                    border border-zinc-600 rounded-[0.375rem] transition
            peer" placeholder=" " {...props} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} />
            <label htmlFor={name} className={`absolute origin-[-30px]  top-0 left-3 transition
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-zinc-600
                                        peer-focus:scale-75 peer-focus:translate-x-2 peer-focus:-translate-y-[0.5px] peer-focus:font-semibold peer-focus:text-black
                                        ${value && "scale-75 translate-x-2 -translate-y-[0.5px] font-semibold text-black"}`}>{label}</label>
        </div>
    )
}

export default RequestInfoTextArea
