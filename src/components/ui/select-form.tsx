import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
type Data = {
    name: string;
    label: string
}

export interface SelectFormProps {
    data: Data[]
    name: string;
    label: string
}

const SelectForm = ({ name, label, data }: SelectFormProps) => {
    return (
        <Select name={name}>
            <SelectTrigger className="w-[180px] rounded-[0.375rem]">
                <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-[0.375rem]">
                <SelectGroup>
                    {data.map((value: Data, i) => (
                        <SelectItem key={i} value={value.name} className="cursor-pointer" >{value.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectForm
