import { HTMLInputTypeAttribute } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { cn } from '@/lib/utils'

type InputLabelProps<T extends FieldValues> = {
    label?: string;
    className?: string;
    width?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    valueAsNumber?: boolean;
    maxLength?: number;
    min?: number;
    max?: number;
    disabled?: boolean
    name: Path<T>;
    message?: string;
    register: UseFormRegister<T>;
};

const InputLabel = <T extends FieldValues>({
    label, className, width, name, placeholder, type, valueAsNumber, maxLength, min, max, disabled, message, register
}: InputLabelProps<T>) => {
    return (
        <div className={cn('flex flex-col item-start gap-1', className)}>
            <label htmlFor={name} className={`text-sm ${type === "number" && message ? "text-rose-800" : null}`}>{label}</label>
            <input {...register(name, { valueAsNumber: valueAsNumber })} disabled={disabled} className={`${width} border border-neutral-800 rounded-[0.375rem] px-3 py-1.5 focus:outline-none placeholder:text-zinc-500 placeholder:text-sm ${type === "number" && message ? "border-rose-800" : null}`} type={type} maxLength={maxLength} min={min} max={max} placeholder={placeholder} />
            {type !== "number" && message ? <p className="text-xs text-rose-800">{message}</p> : null}
        </div>
    )
}
export default InputLabel