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
    message?: string
    register: UseFormRegister<T>
}

const SelectForm = <T extends FieldValues>({ name, label, data, onChange, disabled, message, register }: SelectFormProps<T>) => {
    return (
        <div className="flex flex-col gap-1">
            <select {...register(name)} disabled={disabled} defaultValue="DEFAULT" className="bg-white border border-black rounded-[0.375rem] p-2 cursor-pointer" onChange={onChange}>
                <option value="DEFAULT" disabled>-- Choose {label} --</option>
                {data.map((item: Data, i) => (
                    <option key={i} value={item.value} className="text-sm">{item.label}</option>
                ))}
            </select>
            <p className="text-xs text-rose-800">{message}</p>
        </div>
    )
}

export default SelectForm
