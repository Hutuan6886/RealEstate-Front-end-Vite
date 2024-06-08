import { cn } from '@/lib/utils'
import React from 'react'

const Checkbox = (props: React.HTMLProps<HTMLInputElement>) => {
    const { id, name, label, className, ...inputProps } = props
    return (
        <div className='flex flex-row justify-start items-center gap-2'>
            <input type='checkbox' name={name} id={id} {...inputProps} className={cn('border-black checked:bg-teal-700 checked:text-white rounded-[0.375rem] cursor-pointer', className)} />
            <label htmlFor={name} className="text-sm">{label}</label>
        </div>
    )
}

export default Checkbox
