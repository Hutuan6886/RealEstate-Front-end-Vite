import { cn } from '@/lib/utils'
import { ChangeEvent } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type CheckboxProps<T extends FieldValues> = {

    label?: string;
    className?: string;
    disabled?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    name: Path<T>
    message?: string
    register: UseFormRegister<T>
}

const Checkbox = <T extends FieldValues>({ label, className, name, disabled, message, register, onChange }: CheckboxProps<T>) => {
    return (
        <div className='flex flex-row justify-start items-center gap-2'>
            <input style={{ borderColor: "#ff0000" }} {...register(name)} disabled={disabled} type='checkbox' className={cn(`${message ? "border-rose-800" : null} accent-teal-700 rounded-[0.375rem] cursor-pointer`, className)} onChange={onChange} />
            <label htmlFor={name} className={`text-sm ${message ? "text-rose-800" : null}`}>{label}</label>
        </div>
    )
}

export default Checkbox
