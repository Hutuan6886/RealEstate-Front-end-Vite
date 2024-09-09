import SearchMap from "@/components/map/map"
import HomeItem from "@/components/newly/HomeItem"
import { Button } from "@/components/ui/button"
import FilterKeywords from "@/components/ui/filter-keywords"
import FilterSelectCheckField from "@/components/ui/filter-select-check"
import FilterSelectfield from "@/components/ui/filter-select-field"
import FilterSwitch from "@/components/ui/filter-switch"
import FilterTag from "@/components/ui/filter-tag"
import InputCommaNumberField from "@/components/ui/input-comma-number-field"
import { FilterFormType, HomeType } from "@/types/types"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaDongSign } from "react-icons/fa6"
import { IoRemoveOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const Search = () => {
    const [homeData, setHomeData] = useState<HomeType[]>()
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, getValues, watch, reset } = useForm<FilterFormType>()

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search)
        //todo: set default form get from searchParams
        reset({
            searchTerm: urlSearchParams.get("searchTerm") || "",
            lat: parseFloat(urlSearchParams.get("lat") as string),
            lng: parseFloat(urlSearchParams.get("lng") as string),
            price: {
                min: urlSearchParams.get("priceMin") || "",
                max: urlSearchParams.get("priceMax") || ""
            },
            beds: parseInt(urlSearchParams.get("beds") as string) || 0,
            baths: parseInt(urlSearchParams.get("baths") as string) || 0,
            houseType: urlSearchParams.get("houseType")?.split(",") || [],
            formType: urlSearchParams.get("formType") || "Sell",
            squarefeet: {
                min: urlSearchParams.get("squarefeetMin") || "",
                max: urlSearchParams.get("squarefeetMax") || ""
            },
            keywords: urlSearchParams.get("keywords")?.split(",") || []
        })
    }, [reset])

    useEffect(() => {
        async function getAllListing() {
            const urlSearchParams = new URLSearchParams(location.search)
            try {
                const res = await fetch(`/api/listing/search?${urlSearchParams.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    cache: "no-cache"
                })
                if (res.ok) {
                    const allListing = await res.json()
                    setHomeData(allListing)
                }
            } catch (error) {
                console.log("getAllListing", error);
            }
        }
        getAllListing()
    }, [])

    const submit: SubmitHandler<FilterFormType> = (values) => {
        const urlFilterParams = new URLSearchParams()
        urlFilterParams.set("searchTerm", values.searchTerm);
        urlFilterParams.set("lat", values.lat.toString());
        urlFilterParams.set("lng", values.lng.toString());
        urlFilterParams.set("formType", values.formType);
        urlFilterParams.set("houseType", values.houseType.toString())
        urlFilterParams.set("priceMin", values.price.min)
        urlFilterParams.set("priceMax", values.price.max)
        urlFilterParams.set("beds", values.beds.toString())
        urlFilterParams.set("baths", values.baths.toString())
        urlFilterParams.set("squarefeetMin", values.squarefeet.min)
        urlFilterParams.set("squarefeetMax", values.squarefeet.max)
        urlFilterParams.set("keywords", values.keywords.toString())
        navigate(`/search?${urlFilterParams}`)
        window.location.reload()
    }

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-3">
                <form className="w-full h-full flex flex-row items-center justify-start gap-3" onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <FilterSwitch nameField="formType" watch={watch} setValue={setValue} dataA="Sell" dataB="Rent" />
                        <FilterTag title="Any Price" description="Price Range">
                            <div className="flex flex-row items-center justify-center gap-2">
                                <div className="flex flex-row items-center gap-1">
                                    <InputCommaNumberField register={register} setValue={setValue} name="price.min" placeholder="No. Min" /><FaDongSign />
                                </div>
                                <IoRemoveOutline />
                                <div className="flex flex-row items-center gap-1">
                                    <InputCommaNumberField register={register} setValue={setValue} name="price.max" placeholder="No. Max" /><FaDongSign />
                                </div>
                            </div>
                        </FilterTag>
                        <FilterTag title="All Beds" description="Bedrooms">
                            <FilterSelectfield nameField="beds" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                        </FilterTag>
                        <FilterTag title="All Baths" description="Bathrooms">
                            <FilterSelectfield nameField="baths" setValue={setValue} watch={watch} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                        </FilterTag>
                        <FilterTag title="All Home Types" description="Home Type">
                            <FilterSelectCheckField nameField="houseType" setValue={setValue} watch={watch} />
                        </FilterTag>
                        <FilterTag title="More">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-zinc-500">Square Feet</h3>
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <div className="flex flex-row items-center gap-1">
                                            <input {...register("squarefeet.min")} type="number" className="border border-black rounded-[0.375rem] p-2" placeholder="No. Min" />
                                        </div>
                                        <IoRemoveOutline />
                                        <div className="flex flex-row items-center gap-1">
                                            <input {...register("squarefeet.max")} type="number" className="border border-black rounded-[0.375rem] p-2" placeholder="No. Max" />
                                        </div>
                                    </div>
                                </div>
                                <FilterKeywords nameField="keywords" setValue={setValue} watch={watch} />
                            </div>
                        </FilterTag>
                    </div>
                    <Button type="submit" className="text-base px-3 py-2 font-semibold border text-teal-700 bg-white border-teal-700 hover:bg-teal-100 transsition">Save Change</Button>
                </form>
                <div className="flex flex-col gap-5">
                    <h3 className="text-xl font-semibold text-zinc-700">{`Real Estate & Homes ${getValues("formType") === "Sell" ? "For Sale" : "For Rent"} ${getValues("searchTerm") ? `in ${getValues("searchTerm")}` : ""}`}</h3>
                    <div className="h-[536px] grid grid-cols-5 gap-3 overflow-hidden">
                        <div style={{ scrollbarWidth: "none" }} className={`${watch("searchTerm") ? "col-span-3" : "col-span-5"}  overflow-y-scroll`}>
                            <div className={`grid ${watch("searchTerm") ? "grid-cols-2" : "grid-cols-4"} gap-5`}>
                                {
                                    homeData?.map((homeItem, i) => (
                                        <div key={i}>
                                            <HomeItem homeItemData={homeItem} isSearchItem={true} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            watch("searchTerm") ? <div className="z-0 col-span-2"><SearchMap lat={watch("lat")} lng={watch("lng")} homeList={homeData} /></div> : null
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Search
