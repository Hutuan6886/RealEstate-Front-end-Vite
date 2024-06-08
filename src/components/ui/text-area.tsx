import { cn } from "@/lib/utils"

const TextArea = (props: React.HTMLProps<HTMLTextAreaElement>) => {
    const { name, id, label, className, ...inputProps } = props
    return (
        <div className='flex flex-col item-start gap-2'>
            <label htmlFor={name} className="text-sm">{label}</label>
            <textarea name={name} id={id} {...inputProps} className={cn('border border-neutral-800 rounded-[0.375rem] px-3 py-1.5 focus:outline-none placeholder:text-zinc-500 placeholder:text-sm', className)} />
        </div>
    )
}

export default TextArea
