import { DragEvent, useState } from "react"

interface ImageDropProps {
    index: number
    imageActive?: number
    handleDrop: (index: number) => void
}

const ImageDrop = ({ index, imageActive, handleDrop }: ImageDropProps) => {

    const [isShowDrop, setIsShowDrop] = useState<boolean>(false)

    if (imageActive === undefined) return
    //todo: imageActive === index || imageActive + 1 === index -> ẩn đi các Drop bên cạnh trái phải của imageActive khi drag
    return (
        <div className={`${!isShowDrop || imageActive === index || imageActive + 1 === index ? "opacity-0 size-2" : "opacity-100 size-40"} size-40 border rounded-[0.375rem] transition-all`}
            onDragEnter={() => setIsShowDrop(true)}
            onMouseLeave={() => setIsShowDrop(false)}
            onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()} //* Phải có onDragOver thì onDrop mới bắt đc giá trị
            onDrop={(e: DragEvent<HTMLDivElement>) => {
                e.preventDefault()
                handleDrop(index)
                setIsShowDrop(false)
            }}
        >
            <p className="text-zinc-400 text-sm italic p-1">Drop here</p>
        </div >
    )
}

export default ImageDrop
