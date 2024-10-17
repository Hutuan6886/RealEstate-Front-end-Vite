import { useRef, useState } from "react"
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"

import FilterSelectCheckField from "@/components/ui/filter-select-check"
import FilterSelectfield from "@/components/ui/filter-select-field"
import InputCommaNumberField from "@/components/ui/input-currency-A"


import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import FilterKeywords from "@/components/ui/filter-keywords"
import { FaDongSign } from "react-icons/fa6"
import { IoRemoveOutline } from "react-icons/io5"
import { FaAngleDown } from "react-icons/fa6"

interface FilterFormPopupProps<T extends FieldValues> {
    register: UseFormRegister<T>
    watch: UseFormWatch<T>
    setValue: UseFormSetValue<T>
}

const FilterFormPopup = <T extends FieldValues>({ register, watch, setValue }: FilterFormPopupProps<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownMenu = useRef<HTMLButtonElement>(null)

    return (
        <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DropdownMenuTrigger ref={dropdownMenu} className="flex flex-row items-center justify-center gap-2 border rounded-[0.45rem] text-zinc-700 font-semibold px-4 py-2">Filter <FaAngleDown className={`${isOpen ? "rotate-180" : null} transition duration-200`} /></DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit h-[270px] flex flex-col items-center bg-white rounded-[0.45rem] ">
                <div className={`flex flex-col items-start gap-3 overflow-y-scroll`}>
                    <div className="w-[80%] shadow-lg m-auto my-3 grid grid-cols-2 rounded-[0.45rem]">
                        <button className={`col-span-1 text-center  font-semibold rounded-l-[0.45rem] cursor-pointer py-2 ${watch("formType" as Path<T>) === "Sell" ? "bg-teal-700 text-white" : "bg-white text-zinc-700 hover:bg-zinc-200 transition"}`}
                            onClick={() => { setValue("formType" as Path<T>, "Sell" as PathValue<T, Path<T>>) }}
                        >Sell</button>
                        <button className={`col-span-1 text-center font-semibold rounded-r-[0.45rem] cursor-pointer py-2 ${watch("formType" as Path<T>) === "Rent" ? "bg-teal-700 text-white" : "bg-white text-zinc-700 hover:bg-zinc-200 transition"}`}
                            onClick={() => { setValue("formType" as Path<T>, "Rent" as PathValue<T, Path<T>>) }}
                        >Rent</button>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div className="flex flex-row items-center gap-1">
                            <InputCommaNumberField register={register} setValue={setValue} name={"price.min" as Path<T>} label="Price min" placeholder="No. Min" /><FaDongSign />
                        </div>
                        <IoRemoveOutline />
                        <div className="flex flex-row items-center gap-1">
                            <InputCommaNumberField register={register} setValue={setValue} name={"price.max" as Path<T>} label="Price max" placeholder="No. Max" /><FaDongSign />
                        </div>
                    </div>
                    <FilterSelectfield nameField={"beds" as Path<T>} title="Bedsroom" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                    <FilterSelectfield nameField={"baths" as Path<T>} title="Bathsroom" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                    <FilterSelectCheckField nameField={"houseType" as Path<T>} title="Type of Listing" setValue={setValue} watch={watch} />
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-zinc-500">Square Feet</h3>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <div className="flex flex-row items-center gap-1">
                                    <input {...register("squarefeet.min" as Path<T>)} type="number" className="border border-black rounded-[0.375rem] p-2" placeholder="No. Min" />
                                </div>
                                <IoRemoveOutline />
                                <div className="flex flex-row items-center gap-1">
                                    <input {...register("squarefeet.max" as Path<T>)} type="number" className="border border-black rounded-[0.375rem] p-2" placeholder="No. Max" />
                                </div>
                            </div>
                        </div>
                        <FilterKeywords nameField={"keywords" as Path<T>} label="Amenities of House" setValue={setValue} watch={watch} />
                    </div>
                </div>
                <Button type="submit" className="w-full text-base px-3 py-2 my-3 font-semibold border bg-teal-700 text-white border-teal-700 hover:bg-white hover:text-teal-700 transition">Save Change</Button>
            </DropdownMenuContent>
        </DropdownMenu >

    )
}

export default FilterFormPopup
