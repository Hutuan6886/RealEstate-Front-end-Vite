import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch, Path } from "react-hook-form"

import FilterSelectCheckField from "@/components/ui/filter-select-check"
import FilterSelectfield from "@/components/ui/filter-select-field"
import FilterSwitch from "@/components/ui/filter-switch"
import FilterTag from "@/components/ui/filter-tag"
import FilterKeywords from "@/components/ui/filter-keywords"
import InputCurrencyB from "@/components/ui/input-currency-B"

import { Button } from "@/components/ui/button"

import { IoRemoveOutline } from "react-icons/io5"
import { FaDongSign } from "react-icons/fa6"

interface FilterFormProps<T extends FieldValues> {
    register: UseFormRegister<T>
    watch: UseFormWatch<T>
    setValue: UseFormSetValue<T>
}

const FilterForm = <T extends FieldValues>({ register, watch, setValue }: FilterFormProps<T>) => {

    return (

        <div className="flex flex-row items-center justify-start gap-2">
            <FilterSwitch nameField={"formType" as Path<T>} watch={watch} setValue={setValue} dataA="Sell" dataB="Rent" />
            <FilterTag title="Any Price">
                <div className="w-[500px] flex flex-row items-center justify-center gap-2">
                    <div className="flex flex-row justify-center items-center gap-1">
                        <InputCurrencyB register={register} setValue={setValue} name={"price.min" as Path<T>} label="Price min" placeholder="No. Min" /><FaDongSign />
                    </div>
                    <IoRemoveOutline />
                    <div className="flex flex-row justify-center items-center gap-1">
                        <InputCurrencyB register={register} setValue={setValue} name={"price.max" as Path<T>} label="Price max" placeholder="No. Max" /><FaDongSign />
                    </div>
                </div>
            </FilterTag>
            <FilterTag title="All Beds">
                <FilterSelectfield nameField={"beds" as Path<T>} title="Bedsroom" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
            </FilterTag>
            <FilterTag title="All Baths" >
                <FilterSelectfield nameField={"baths" as Path<T>} title="Bathsroom" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
            </FilterTag>
            <FilterTag title="All Home Types">
                <FilterSelectCheckField nameField={"houseType" as Path<T>} setValue={setValue} watch={watch} />
            </FilterTag>
            <FilterTag title="More">
                <div className=" flex flex-col gap-3">
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
                    <FilterKeywords label="Amenities of House" nameField={"keywords" as Path<T>} setValue={setValue} watch={watch} />
                </div>
            </FilterTag>
            <Button type="submit" className="text-base px-3 py-2 font-semibold border text-teal-700 bg-white border-teal-700 hover:bg-teal-100 transsition">Save Change</Button>
        </div>
    )
}

export default FilterForm
