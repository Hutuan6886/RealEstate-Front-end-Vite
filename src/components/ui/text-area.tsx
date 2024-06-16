import { cn } from "@/lib/utils"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TextAreaProps<T extends FieldValues> = {
    label?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean
    name: Path<T>;
    register: UseFormRegister<T>;
}

const TextArea = <T extends FieldValues>({ label, className, placeholder, name, disabled, register }: TextAreaProps<T>) => {
    return (
        <div className='flex flex-col item-start gap-2'>
            <label htmlFor={name} className="text-sm">{label}</label>
            <textarea {...register(name)} disabled={disabled} className={cn('border border-neutral-800 rounded-[0.375rem] px-3 py-1.5 focus:outline-none placeholder:text-zinc-500 placeholder:text-sm', className)} placeholder={placeholder} />
        </div>
    )
}

export default TextArea
