import { useEffect, useRef, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";

type FilterSwitchProps<T extends FieldValues> = {
    nameField: Path<T>
    setValue: UseFormSetValue<T>
    watch: UseFormWatch<T>
    dataA: string
    dataB: string
}

const FilterSwitch = <T extends FieldValues>({ nameField, setValue, watch, dataA, dataB }: FilterSwitchProps<T>) => {
    const dataARef = useRef<HTMLDivElement>(null)
    const dataBRef = useRef<HTMLDivElement>(null)
    const [widthDataARefElement, setWidthDataARefElement] = useState<number>()
    const [widthDataBRefElement, setWidthDataBRefElement] = useState<number>()

    useEffect(() => {
        setWidthDataARefElement(dataARef.current?.offsetWidth)
        setWidthDataBRefElement(dataBRef.current?.offsetWidth)
    }, [])

    return (
        <div className="relative w-fit h-full bg-zinc-100 rounded-[0.45rem]">
            {/* element to create switch animation */}
            <div style={{ width: `${watch(nameField) === dataA ? widthDataARefElement : widthDataBRefElement}px`, left: `${watch(nameField) === dataA ? 0 : widthDataARefElement}px` }} className={`absolute w-full h-full top-0 bg-white border border-zinc-300 rounded-[0.45rem] shadow-sm transition-all`}>
                {watch(nameField) === dataA ?
                    <div className="h-full flex flex-row items-center justify-center gap-1 font-semibold text-zinc-700">{dataA} <span className="font-normal">(50)</span></div> :
                    <div className="h-full flex flex-row items-center justify-center gap-1 font-semibold text-zinc-700">{dataB} <span className="font-normal">(03)</span></div>}
            </div>
            <div className=" flex flex-row items-center justify-center hover:bg-zinc-200 rounded-[0.45rem] transition-colors">
                <div ref={dataARef} className={`flex flex-row items-center gap-1 font-semibold text-zinc-700 rounded-[0.45rem] cursor-pointer px-4 py-2 duration-500`} onClick={() => { setValue(nameField, dataA as PathValue<T, Path<T>>) }}>
                    {dataA} <span className="font-normal">(50)</span>
                </div>
                <div ref={dataBRef} className={`flex flex-row items-center gap-1 font-semibold text-zinc-700 rounded-[0.45rem] cursor-pointer px-4 py-2 duration-500`} onClick={() => { setValue(nameField, dataB as PathValue<T, Path<T>>) }}>
                    {dataB} <span className="font-normal">(03)</span>
                </div>
            </div>
        </div >
    )
}

export default FilterSwitch
