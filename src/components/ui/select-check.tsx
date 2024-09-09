import { ChangeEvent, useRef } from "react"

interface SelectcheckProps {
    label: string
    value: string
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const Selectcheck: React.FC<SelectcheckProps> = ({ label, value, checked, onChange }) => {
    const checkRef = useRef<HTMLInputElement>(null)
    return (
        <div className="flex flex-row flex-nowrap gap-2 px-2 py-1 rounded-[0.375rem] cursor-pointer hover:bg-zinc-300 transition"
            onClick={() => {
                checkRef.current?.click()
            }}
        >
            <input ref={checkRef} type="checkbox" checked={checked} value={value} onChange={onChange} />
            <p className="text-nowrap text-zinc-700">{label}</p>
        </div>
    )
}

export default Selectcheck
