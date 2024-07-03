import { ChangeEvent, useState } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type RequestInfoInputProps<T extends FieldValues> = {
    label?: string
    name: Path<T>;
    type: string
    register: UseFormRegister<T>
}

const RequestInfoInput = <T extends FieldValues>({ label, name, type, register }: RequestInfoInputProps<T>) => {
    const [value, setValue] = useState<string>()
    return (
        <div className='relative'>
            <input {...register(name)} name={name} type={type} className="w-full appearance-none px-3 pt-5 p-1
                                                    placeholder:text-transparent focus:placeholder:text-zinc-600
                                                    border border-zinc-600 rounded-[0.375rem] transition
            peer" placeholder={label} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)} />
            <label htmlFor={name} className={`absolute origin-[-30px]  top-0 left-3 transition
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-zinc-600
                                        peer-focus:scale-75 peer-focus:translate-x-2 peer-focus:-translate-y-[0.5px] peer-focus:font-semibold peer-focus:text-black
                                        ${value && "scale-75 translate-x-2 -translate-y-[0.5px] font-semibold text-black"}`}>{label}</label>
        </div>
    )
}

export default RequestInfoInput
