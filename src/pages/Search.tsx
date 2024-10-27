import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"

import useGetListingList from "@/hooks/useGetListingList"
import { GET_LISTING_SEARCH } from "@/data/apiUrl"
import useListingPagination from "@/hooks/useListingPagination"
import { dataSort } from "@/data/dataSort"
import { FilterFormType } from "@/types/types"

import SearchMap from "@/components/map/map"
import HomeItem from "@/components/home-listing-list/HomeItem"
import PaginationControl from "@/components/ui/pagination-control"
import FilterForm from "@/components/search-filter/FilterForm"
import FilterFormPopup from "@/components/search-filter/FilterFormPopup"
import useWindowSize from "@/hooks/useWindowSize"
import FilterFormModal from "@/components/search-filter/FilterFormModal"
import MapModal from "@/components/map/MapModal"
import Sort from "@/components/search-sort/sort"

const Search = () => {
    const [isOpenFilterFormModal, setIsOPenFilterFormModal] = useState<boolean>(false)

    const navigate = useNavigate()
    const clientScreenSize = useWindowSize()
    const location = useLocation()

    //todo: SEARCH FORM
    const { register, handleSubmit, setValue, getValues, watch, reset } = useForm<FilterFormType>()

    //todo: GET DATA LISTINGLIST
    const urlSearchParams = new URLSearchParams(location.search)
    const { dataListingList, sortListingFunction } = useGetListingList(`${import.meta.env.VITE_API_ROUTE}${GET_LISTING_SEARCH}?${urlSearchParams.toString()}`)

    //todo: LISTING PAGINATION
    const { currentPage, postsPerPage, lisingPaginationData, paginationNumberClick, previousPage, nextPage } = useListingPagination(dataListingList)

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
        setIsOPenFilterFormModal(false);
        navigate(`/search?${urlFilterParams}`)
    }

    //todo: Declare params value to form
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
            houseType: urlSearchParams.get("houseType") ? urlSearchParams.get("houseType")?.split(",") : [],
            formType: urlSearchParams.get("formType") || "Sell",
            squarefeet: {
                min: urlSearchParams.get("squarefeetMin") || "",
                max: urlSearchParams.get("squarefeetMax") || ""
            },
            keywords: urlSearchParams.get("keywords") ? urlSearchParams.get("keywords")?.split(",") : []
        })
    }, [reset, location.search])

    if (!clientScreenSize) return null

    return (
        <div className="w-full h-fit">
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                    <form className="w-full h-full flex flex-row flex-wrap items-center justify-start gap-3" onSubmit={handleSubmit(submit)}>
                        {clientScreenSize > 979
                            ? <FilterForm register={register} watch={watch} setValue={setValue} />
                            : null
                        }
                        {clientScreenSize > 480 && clientScreenSize < 979
                            ? <FilterFormPopup register={register} watch={watch} setValue={setValue} />
                            : null
                        }
                        {clientScreenSize < 480
                            ? <div className="flex flex-row items-center justify-start gap-5">
                                {
                                    watch("searchTerm") && watch("lat") && watch("lng") ? <MapModal key={watch("searchTerm") || watch("lat") || watch("lng")} lat={watch("lat")} lng={watch("lng")} homeList={lisingPaginationData} /> : null
                                }
                                <FilterFormModal register={register} watch={watch} setValue={setValue} isOpen={isOpenFilterFormModal} setIsOpen={setIsOPenFilterFormModal} />
                            </div>
                            : null
                        }
                    </form>
                    <Sort dataSort={dataSort} sortFunc={sortListingFunction} />
                </div>
                <div className="flex flex-col items-center gap-5">
                    <h3 className="text-xl font-semibold text-zinc-700">{`Real Estate & Homes ${getValues("formType") === "Sell" ? "For Sale" : "For Rent"} ${getValues("searchTerm") ? `in ${getValues("searchTerm")}` : ""}`}</h3>
                    <div className="w-full h-[600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-hidden">
                        <div style={{ scrollbarWidth: "none" }} className={`${watch("searchTerm") ? "col-span-1 md:col-span-3" : "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5"}  overflow-y-scroll`}>
                            <div className={`grid ${watch("searchTerm") ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-5`}>
                                {
                                    lisingPaginationData?.map((homeItem, i) => (
                                        <div key={i} className="col-span-1">
                                            <HomeItem homeItemData={homeItem} isSearchItem={true} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            watch("searchTerm") && watch("lat") && watch("lng") && clientScreenSize > 480 ? <div className="w-full z-0 col-span-1 md:col-span-2"><SearchMap key={watch("searchTerm") || watch("lat") || watch("lng")} lat={watch("lat")} lng={watch("lng")} homeList={lisingPaginationData} /></div> : null
                        }
                    </div>
                    <PaginationControl currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={dataListingList?.length as number} paginationNumberClick={paginationNumberClick} previousPage={previousPage} nextPage={nextPage} />
                </div>
            </div>
        </div >
    )
}

export default Search
