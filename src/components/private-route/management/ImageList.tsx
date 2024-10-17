import { Fragment, useState } from "react"

import ImageItem from "./ImageItem"
import ImageDrop from "./ImageDrop"
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form"

type ImageListProps<T extends FieldValues> = {
    imageList: string[]
    deleteImgStorage: (imgUrl: string) => void
    pathName: Path<T>
    setValue: UseFormSetValue<T>
}

export const ImageList = <T extends FieldValues>({ imageList, pathName, setValue, deleteImgStorage }: ImageListProps<T>) => {

    const [imageActive, setImageActive] = useState<number | undefined>(undefined)

    //todo: Drap and drop
    const handleDragStart = (index: number) => {
        //todo: Gán vị trí img bắt đầu được drag
        setImageActive(index)
    }
    const handleDragEnd = () => {
        //todo: Kết thúc drag reset active item
        setImageActive(undefined)
    }
    const handleDrop = (index: number) => {
        //todo: Thực hiện thay đổi vị trí trong mảng imageListData
        if (imageActive === null || imageActive === undefined) return

        //todo: Clone data
        const cloneImageListData: string[] = [...imageList]
        //todo: image di chuyển
        const imageToMove = cloneImageListData[imageActive]

        /* 
        Drop Image Drop Image Drop Image Drop
        0    0     1    1     2    2     3
        */
        if (imageActive > index) {
            //todo: Xoá image tại vị trí ban đầu
            cloneImageListData.splice(imageActive, 1)
            //todo: thêm image vào vị trí mới
            cloneImageListData.splice(index, 0, imageToMove)
            //todo: set lại data imgUrl form
            setValue(pathName, cloneImageListData as PathValue<T, Path<T>>)
        } else {
            //todo: Xoá image tại vị trí ban đầu
            cloneImageListData.splice(imageActive, 1)
            //todo: thêm image vào vị trí mới
            cloneImageListData.splice(index - 1, 0, imageToMove)
            //todo: set lại data imgUrl form
            setValue(pathName, cloneImageListData as PathValue<T, Path<T>>)
        }
    }

    if (!imageList) return

    return <div >
        <div className={`w-full flex flex-row flex-wrap items-center justify-betweent gap-2 ransition-all `}
        >
            {imageList.map((imgUrl, i) => (
                <Fragment key={i}>
                    {
                        i === 0
                            ? <>
                                <div className="flex flex-col gap-1 border-4 border-teal-700 rounded-[0.45rem] px-4 py-2">
                                    <p className="italic text-sm font-semibold text-teal-700 ">Backgound</p>
                                    <div className="flex flex-row flex-wrap items-center justify-betweent gap-1 ransition-all">
                                        <ImageDrop index={0}
                                            imageActive={imageActive}
                                            handleDrop={handleDrop} />
                                        <ImageItem index={i} imgUrl={imgUrl}
                                            onDelete={() => { deleteImgStorage(imgUrl) }}
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                        />
                                    </div>
                                </div>
                                <ImageDrop index={i + 1}
                                    imageActive={imageActive}
                                    handleDrop={handleDrop} />
                            </>
                            : <>
                                <ImageItem index={i} imgUrl={imgUrl}
                                    onDelete={() => { deleteImgStorage(imgUrl) }}
                                    handleDragStart={handleDragStart}
                                    handleDragEnd={handleDragEnd} />
                                <ImageDrop index={i + 1}
                                    imageActive={imageActive}
                                    handleDrop={handleDrop} />
                            </>
                    }
                </Fragment>
            ))}
        </div>
    </div>
}