import { useState } from 'react'

import { DataSortType } from '@/data/dataSort'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"

import { CgSortAz } from "react-icons/cg"



interface SortProps {
    dataSort: DataSortType[]
    sortFunc: (field: string, sort: string) => void
}

const Sort = ({ dataSort, sortFunc }: SortProps) => {
    const [selectSort, setSelectSort] = useState<string>(dataSort[0].title)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=" p-2 rounded-[0.45rem] outline-none hover:bg-zinc-200 transition">
                <CgSortAz size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-[0.45rem]">
                <DropdownMenuRadioGroup value={selectSort} onValueChange={setSelectSort}>
                    {dataSort.map((sort, i) => (
                        <DropdownMenuRadioItem key={i} value={sort.title}
                            className="cursor-pointer p-0"
                            onClick={() => sortFunc(sort.value.field, sort.value.sort)}>
                            <p className="w-full flex flex-row justify-start items-center gap-1 p-2 rounded-[0.45rem] hover:bg-zinc-200 transition">
                                {sort.icon}
                                {sort.title}
                            </p>
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Sort
