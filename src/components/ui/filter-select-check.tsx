import { dataHouseType } from "@/data/dataForm"
import { ChangeEvent, useEffect, useState } from "react"
import Selectcheck from "./select-check"
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form"

type FilterSelectCheckFieldProps<T extends FieldValues> = {
    nameField: Path<T>
    setValue: UseFormSetValue<T>
    watch: UseFormWatch<T>
}

const FilterSelectCheckField = <T extends FieldValues>({ nameField, setValue, watch }: FilterSelectCheckFieldProps<T>) => {
    const [selectedValue, setSelectedValue] = useState<string[]>(watch(nameField))

    const handleSelectedCheckbox = (e: ChangeEvent<HTMLInputElement>): void => {
        if (selectedValue.includes(e.target.value)) {
            setSelectedValue(selectedValue.filter((item) => item !== e.target.value))
        }
        else {
            setSelectedValue(existing => [...existing, e.target.value])
        }
    }

    useEffect(() => {
        setValue(nameField, selectedValue as PathValue<T, Path<T>>)
    }, [nameField, selectedValue, setValue])

    return (
        <div className="w-fit">
            <div className="flex flex-col">
                {dataHouseType.map((houseType, i) => (
                    <div key={i}>
                        <Selectcheck label={houseType.label} value={houseType.value} onChange={handleSelectedCheckbox} checked={selectedValue.includes(houseType.value)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterSelectCheckField
