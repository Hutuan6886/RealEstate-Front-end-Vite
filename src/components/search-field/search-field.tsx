import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { SearchFormSchema } from "@/form_schema/FormSchema";
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from "../ui/button";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { cityData, provinceData } from "@/data/location";


export type SearchFormType = z.infer<typeof SearchFormSchema>

interface SearchFieldProps {
    className?: string
    placeholder?: string
}
const SearchField: React.FC<SearchFieldProps> = ({ className, placeholder }) => {
    const [suggestionProvince, setSuggestionProvince] = useState<string[]>([])
    const [suggestionCity, setSuggestionCity] = useState<string[]>([])
    const [suggestionVillageName, setSuggestionVillageName] = useState<string[]>([])
    const [openSearchSuggest, setOpenSearchSuggest] = useState<boolean>(false)
    const [listingNameData, setListingNameData] = useState<string[]>()
    const searchRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const location = useLocation()

    const { register, handleSubmit, setValue,
        watch, resetField
    } = useForm<SearchFormType>({
        defaultValues: {
            search: ""
        }
    })
    const searchValue = watch("search")

    const clickSearch = (searchTerm: string) => {
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set("searchTerm", searchTerm)
        const searchQuery = urlParams.toString()
        console.log(searchQuery);
        navigate(`/search?${searchQuery}`)
    }

    const submitSearch: SubmitHandler<SearchFormType> = (data) => {
        console.log(data);
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set("searchTerm", data.search)
        const searchQuery = urlParams.toString()
        console.log(searchQuery);
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const getAllListingName = async () => {
            try {
                const res = await fetch("/api/listing/get-all-listing-name", {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json",
                    },
                    cache: 'no-cache'
                })
                if (res.ok) {
                    const allListingName = await res.json()
                    setListingNameData(allListingName)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllListingName()
    }, [])

    useEffect(() => {
        function clickOutToCloseSearchBarSuggestion(e: MouseEvent): void {
            if (!searchRef.current?.contains(e.target as Node)) {
                //* searchRef tạo <form>, trong <form> chứa <input>, <button>,... => click inside <form> searchRef.current?.contains(e.target) = true, click outside <form> searchRef.current?.contains(e.target) = false
                setOpenSearchSuggest(false)
            }
        }
        document.addEventListener("mousedown", (e) => clickOutToCloseSearchBarSuggestion(e))

        //todo: clean up eventListener
        return () => {
            document.removeEventListener("mousedown", (e) => clickOutToCloseSearchBarSuggestion(e))
        }
    })

    useEffect(() => {
        if (searchValue === "") {
            cityData && setSuggestionCity(cityData)
        } else {
            provinceData && setSuggestionProvince(provinceData?.filter((province) => province.includes(searchValue)))
            cityData && setSuggestionCity(cityData?.filter((city) => city.includes(searchValue)))
            listingNameData && setSuggestionVillageName(listingNameData?.filter((villageName) => villageName.includes(searchValue)))
        }

    }, [listingNameData, searchValue])

    useEffect(() => {
        const urlParams: URLSearchParams = new URLSearchParams(location.search)
        const searchUrlParams: string | null = urlParams.get("searchTerm")
        if (searchUrlParams) {
            setValue("search", searchUrlParams)
        }
    }, [location.search, setValue])


    return (
        <form className={cn("w-[60%] h-fit m-auto", className)} onSubmit={handleSubmit(submitSearch)} ref={searchRef}>
            <div className="relative w-full h-fit flex flex-col rounded-[0.375rem]">
                <div className={`h-full flex flex-row items-center justify-center bg-white ${openSearchSuggest && (suggestionProvince.length || suggestionCity.length || suggestionVillageName.length) ? "rounded-t-[0.375rem] border-2" : "rounded-[0.375rem]"}`}>
                    <div className="w-full h-[50px] rounded-tl-[0.375rem] relative">
                        <input {...register("search", {
                            required: true
                        })} type="text" placeholder={placeholder} className="w-full h-[50px] rounded-tl-[0.375rem] rounded-bl-[0.375rem] focus:outline-none p-3 bg-slate-100"
                            onClick={() => { setOpenSearchSuggest(true) }}
                        />
                        {watch('search') && <IoIosCloseCircle className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-zinc-300 hover:text-zinc-400 transition" onClick={() => resetField("search")} />}
                    </div>

                    {openSearchSuggest ?
                        <Button type="button" className="h-[50px] rounded-[0.375rem] rounded-br-[0.375rem] text-teal-700 bg-zinc-100" onClick={() => setOpenSearchSuggest(false)}>Cancel</Button> :
                        <Button type="submit" className="h-[50px] shadow-sm rounded-[0px] rounded-tr-[0.375rem] rounded-br-[0.375rem] bg-red-500 hover:bg-red-700 text-lg text-white"><IoSearchSharp /></Button>}

                </div>
                {openSearchSuggest &&
                    <div className={`absolute top-[50px] left-0 w-full h-fit max-h-[300px] overflow-y-scroll bg-white rounded-b-[0.375rem] border-2`}>
                        <div className=" flex flex-col p-1">
                            {suggestionVillageName.length ?
                                <>
                                    <h3 className="text-teal-700 font-semibold">Resident Area</h3>
                                    <div className="flex flex-col gap-1">{suggestionVillageName.map((name, i) => (
                                        <div key={i} className="flex flex-row gap-2 items-center justify-start p-3 cursor-pointer rounded-[0.375rem] hover:bg-zinc-300 transition" onClick={() => clickSearch(name)}>
                                            <FaLocationDot />
                                            <div className="flex flex-col gap-0">
                                                <p>{name}</p>
                                                <span className="text-xs text-zinc-500">Resident</span>
                                            </div>
                                        </div>
                                    ))}</div></> : null}
                        </div>
                        <div className=" flex flex-col p-1">
                            <h3 className="text-teal-700 font-semibold">Places</h3>
                            {suggestionCity.length ?
                                <div className="flex flex-col gap-1">{suggestionCity.map((city, i) => (
                                    <div key={i} className="flex flex-row gap-2 items-center justify-start p-3 cursor-pointer rounded-[0.375rem] hover:bg-zinc-300 transition" onClick={() => clickSearch(city)}>
                                        <FaLocationDot />
                                        <div className="flex flex-col gap-0">
                                            <p>{city}</p>
                                            <span className="text-xs text-zinc-500">City</span>
                                        </div>
                                    </div>
                                ))}</div> : null}
                            {suggestionProvince.length ? <div className="flex flex-col gap-1">{suggestionProvince.map((province, i) => (
                                <div key={i} className="flex flex-row gap-3 items-center justify-start p-3 cursor-pointer rounded-[0.375rem] hover:bg-zinc-300 transition" onClick={() => clickSearch(province)}>
                                    <FaLocationDot />
                                    <div className="flex flex-col">
                                        <p>{province}</p>
                                        <span className="text-xs text-zinc-500">Province</span>
                                    </div>
                                </div>
                            ))}</div> : null}
                        </div>
                    </div>}
            </div>
        </form >
    )
}

export default SearchField
