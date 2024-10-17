import { ChangeEvent, useState } from "react"
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form"

type FilterSelectfieldProps<T extends FieldValues> = {
    nameField: Path<T>
    title?: string
    setValue: UseFormSetValue<T>
    watch: UseFormWatch<T>
    data: string[] | number[]
}

const FilterSelectfield = <T extends FieldValues>({ nameField, title, data, setValue, watch }: FilterSelectfieldProps<T>) => {
    const [selectedRadioBtn, setSelectedRadioBtn] = useState<number>(parseInt(watch(nameField)))

    const isRadioSelected = (value: string): boolean => selectedRadioBtn === parseInt(value)

    const handleSelectedRadioBtn = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(nameField, e.currentTarget.value as PathValue<T, Path<T>>)
        setSelectedRadioBtn(parseInt(e.currentTarget.value))
    }

    return (
        <div className="flex flex-col items-start gap-2">
            <h3 className="text-zinc-500">{title}</h3>
            <div className="border border-zinc-300 rounded-[0.45rem] overflow-hidden">
                <div className="flex flex-row items-center justify-center">{data.map((item, i) => (
                    <div key={i} className={`w-[36px] sm:w-[40px] relative font-semibold ${item === data.length ? "border-0" : "border-r"} border-zinc-300 ${item === selectedRadioBtn ? "bg-teal-700 text-white" : "text-zinc-700 hover:bg-zinc-300"} transition`}>
                        <div className="w-full h-full text-center p-2">{item === 0 ? "-" : item}</div>
                        <input type="radio" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" value={item} checked={isRadioSelected(`${item}`)} onChange={handleSelectedRadioBtn} />
                    </div>
                ))}</div>
            </div >
        </div>
    )
}

export default FilterSelectfield
