import { cn } from '@/lib/utils'

const InputLabel = (props: React.HTMLProps<HTMLInputElement>) => {
    const { id, name, label, className, width, ...inputProps } = props
    return (
        <div className={cn('flex flex-col item-start gap-1', className)}>
            <label htmlFor={name} className="text-sm">{label}</label>
            <input name={name} id={id} {...inputProps} className={`${width} border border-neutral-800 rounded-[0.375rem] px-3 py-1.5 focus:outline-none placeholder:text-zinc-500 placeholder:text-sm`} />
        </div>
    )
}
export default InputLabel