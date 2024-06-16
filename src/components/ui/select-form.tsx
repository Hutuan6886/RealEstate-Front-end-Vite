import { ChangeEvent } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
type Data = {
    value: string;
    label: string
}

type SelectFormProps<T extends FieldValues> = {
    data: Data[]
    label: string;
    disabled?: boolean
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
    name: Path<T>;
    register: UseFormRegister<T>
}

const SelectForm = <T extends FieldValues>({ name, label, data, onChange, disabled, register }: SelectFormProps<T>) => {
    return (
        <select {...register(name)} disabled={disabled} defaultValue="DEFAULT" className="bg-white border border-black rounded-[0.375rem] p-2 cursor-pointer" onChange={onChange}>
            <option value="DEFAULT" disabled>-- Choose {label} --</option>
            {data.map((item: Data, i) => (
                <option key={i} value={item.value} className="text-sm">{item.label}</option>
            ))}
        </select>
    )
}

export default SelectForm
