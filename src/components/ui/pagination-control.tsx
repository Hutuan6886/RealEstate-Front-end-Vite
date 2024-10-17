import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationControlProps {
    currentPage: number;
    postsPerPage: number;
    totalPosts: number;
    paginationNumberClick: (page: number) => void
    previousPage: () => void
    nextPage: () => void
}
const PaginationControl = ({ currentPage, postsPerPage, totalPosts, paginationNumberClick, previousPage, nextPage }: PaginationControlProps) => {
    const pageNumber: number[] = []     //todo: mảng chứa dữ liệu trong từng page

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)  //todo: push số lượng dữ liệu vào mỗi page
    }

    return (
        <div className="w-fit h-full">
            <div className="flex flex-row flex-wrap items-center justify-center gap-1">
                {currentPage !== 1 ? <button className="border border-teal-700 bg-teal-700 text-white rounded-[0.45rem] shadow-lg p-2 cursor-pointer hover:text-teal-700 hover:bg-white"
                    onClick={previousPage}
                ><FaChevronLeft /></button> : null}
                {pageNumber.map((page: number, i: number) => (
                    currentPage === page
                        ? <button key={i} className="font-semibold text-teal-700 bg-white border border-teal-700 rounded-[0.45rem] shadow-lg px-3 py-1 cursor-pointer hover:bg-teal-50" onClick={() => paginationNumberClick(page)}>{page}</button>
                        : <button key={i} className="font-semibold text-teal-700 bg-teal-50 rounded-[0.45rem] px-3 py-1 cursor-pointer hover:bg-zinc-200" onClick={() => paginationNumberClick(page)}>{page}</button>
                ))}
                {currentPage !== pageNumber.length ? <button className="border border-teal-700 bg-teal-700 text-white rounded-[0.45rem] shadow-lg p-2 cursor-pointer hover:text-teal-700 hover:bg-white"
                    onClick={nextPage}
                ><FaChevronRight /></button> : null}
            </div>
        </div>
    )
}

export default PaginationControl
