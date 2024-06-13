import { cn } from '@/lib/utils'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type CheckboxProps<T extends FieldValues> = {

    label?: string;
    className?: string;
    onChange?: () => void
    name: Path<T>
    register: UseFormRegister<T>
}

const Checkbox = <T extends FieldValues>({ label, className, name, register, onChange }: CheckboxProps<T>) => {
    return (
        <div className='flex flex-row justify-start items-center gap-2'>
            <input {...register(name)} type='checkbox' className={cn('border-black checked:bg-teal-700 checked:text-white rounded-[0.375rem] cursor-pointer', className)} onChange={onChange} />
            <label htmlFor={name} className="text-sm">{label}</label>
        </div>
    )
}

export default Checkbox
