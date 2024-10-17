import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"

import InputCurrencyB from "@/components/ui/input-currency-B"
import FilterSelectfield from "@/components/ui/filter-select-field"
import FilterKeywords from "@/components/ui/filter-keywords"
import FilterSelectCheckField from "@/components/ui/filter-select-check"

import { Button } from "@/components/ui/button"

import { MdSettingsInputComponent } from "react-icons/md"
import { FaDongSign } from "react-icons/fa6"
import { IoClose, IoRemoveOutline } from "react-icons/io5"
import { Dispatch, SetStateAction } from "react"

interface FilterFormModal<T extends FieldValues> {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
    register: UseFormRegister<T>
    watch: UseFormWatch<T>
    setValue: UseFormSetValue<T>
}

const FilterFormModal = <T extends FieldValues>({ isOpen, setIsOpen, register, watch, setValue }: FilterFormModal<T>) => {

    return (
        <div>
            <button type="button" className="flex flex-row items-center justify-center gap-3 rounded-[0.45rem] border text-zinc-700 font-semibold px-4 py-2 hover:bg-zinc-200"
                onClick={() => setIsOpen(true)}
            ><MdSettingsInputComponent className="text-xl text-teal-800" /> Filters</button>
            {
                isOpen
                    ? <div className="fixed z-20 top-[74px] left-0 w-full h-full flex flex-col gap-2 bg-white">
                        <div className="w-fit ml-auto cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <IoClose size={30} />
                        </div>
                        <div className={`w-full h-[500px] flex flex-col items-center gap-3 p-2 overflow-y-scroll`}>
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
                                    <InputCurrencyB register={register} setValue={setValue} name={"price.min" as Path<T>} label="Price min" placeholder="No. Min" /><FaDongSign />
                                </div>
                                <IoRemoveOutline />
                                <div className="flex flex-row items-center gap-1">
                                    <InputCurrencyB register={register} setValue={setValue} name={"price.max" as Path<T>} label="Price max" placeholder="No. Max" /><FaDongSign />
                                </div>
                            </div>
                            <FilterSelectfield nameField={"beds" as Path<T>} title="Bedsroom" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                            <FilterSelectfield nameField={"baths" as Path<T>} title="Bathsroom" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                            <FilterSelectCheckField nameField={"houseType" as Path<T>} title="Type of Listing" setValue={setValue} watch={watch} />
                            <div className="flex flex-col gap-2">
                                <h3 className="text-zinc-500">Square Feet</h3>
                                <div className="flex flex-row items-center justify-center gap-2">
                                    <div className="w-full flex flex-row items-center gap-1">
                                        <input {...register("squarefeet.min" as Path<T>)} type="number" className="w-full border border-black rounded-[0.375rem] p-2" placeholder="No. Min" />
                                    </div>
                                    <IoRemoveOutline />
                                    <div className="w-full flex flex-row items-center gap-1">
                                        <input {...register("squarefeet.max" as Path<T>)} type="number" className="w-full border border-black rounded-[0.375rem] p-2" placeholder="No. Max" />
                                    </div>
                                </div>
                            </div>
                            <FilterKeywords nameField={"keywords" as Path<T>} label="Amenities of House" setValue={setValue} watch={watch} />
                        </div>
                        <Button type="submit" className="w-full text-base px-3 py-2 font-semibold border bg-teal-700 text-white border-teal-700 hover:bg-white hover:text-teal-700 transition"
                        >Save Change</Button>
                    </div>
                    : null
            }
        </div>
    )
}

export default FilterFormModal
