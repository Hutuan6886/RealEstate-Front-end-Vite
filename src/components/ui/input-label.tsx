import { cn } from '@/lib/utils'
import { HTMLInputTypeAttribute } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputLabelProps<T extends FieldValues> = {
    label?: string;
    className?: string;
    width?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    maxLength?: number;
    min?: number;
    max?: number;
    name: Path<T>;
    register: UseFormRegister<T>;
};

const InputLabel = <T extends FieldValues>({
    label, className, width, name, placeholder, type, maxLength, min, max, register
}: InputLabelProps<T>) => {
    return (
        <div className={cn('flex flex-col item-start gap-1', className)}>
            <label htmlFor={name} className="text-sm">{label}</label>
            <input {...register(name)} className={`${width} border border-neutral-800 rounded-[0.375rem] px-3 py-1.5 focus:outline-none placeholder:text-zinc-500 placeholder:text-sm`} type={type} maxLength={maxLength} min={min} max={max} placeholder={placeholder} />
        </div>
    )
}
export default InputLabel