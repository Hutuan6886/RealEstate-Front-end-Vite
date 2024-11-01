import { ChangeEvent, useState } from "react"
import { Button } from "./button"
import { IoClose } from "react-icons/io5"
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form"

type FilterKeywordsProps<T extends FieldValues> = {
    label?: string
    nameField: Path<T>
    setValue: UseFormSetValue<T>
    watch: UseFormWatch<T>
}

const FilterKeywords = <T extends FieldValues>({ label, nameField, setValue, watch }: FilterKeywordsProps<T>) => {
    const [inputValue, setInputValue] = useState<string>("")

    const handleKeywords = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const submitKeywords = (value: string) => {
        if (!watch(nameField).includes(value)) {
            setValue(nameField, [...watch(nameField), value] as PathValue<T, Path<T>>)
        }
        setInputValue('')
    }

    const removeKeywords = (keyword: string) => {
        setValue(nameField, watch(nameField).filter((item: string) => item !== keyword) as PathValue<T, Path<T>>)
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2">
                <h3 className="text-zinc-500">{label}</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input value={inputValue} type="text" className="w-full p-2 border border-zinc-700 rounded-[0.375rem]" placeholder="e.g. Pool, Parking..." onChange={handleKeywords} />
                        <Button type="button" className="text-teal-700 bg-white border border-teal-700 hover:bg-teal-100" onClick={() => { submitKeywords(inputValue) }}>Add</Button>
                    </div>
                    <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                        {
                            watch(nameField).map((keyword: string, i: number) => (
                                <div key={i} className="flex flex-row items-center justify-center gap-1 bg-zinc-200 hover:bg-zinc-300 rounded-[0.375rem] px-2 py-0.5">
                                    <div className="font-semibold">
                                        {keyword}
                                    </div>
                                    <IoClose className="cursor-pointer" onClick={() => removeKeywords(keyword)} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterKeywords
