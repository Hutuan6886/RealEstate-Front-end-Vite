import { formatter } from "@/lib/utils";
import moment from 'moment'
import { FaCalendarDay, FaParking } from "react-icons/fa"
import { GiParkBench } from "react-icons/gi";
import { MdSquareFoot } from "react-icons/md";

interface HomeHighlightsProps {
    parking?: boolean;
    price?: number;
    sqft?: number;
    createAt?: Date
}

const HomeHighlights: React.FC<HomeHighlightsProps> = ({ parking, price, sqft, createAt }) => {
    const date = createAt && new Date(createAt).toLocaleDateString('pt-BR')

    return (
        <div className='w-full flex flex-col gap-5 border rounded-[0.5rem] p-3'>
            <h3 className="font-semibold text-xl">Home Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="grid grid-cols-2">
                    <div className="grid gap-2 col-span-1">
                        <h3 className="flex flex-row items-center justify-start gap-3 text-zinc-600"><FaParking className="text-lg" /> Parking</h3>
                        <h3 className="flex flex-row items-center justify-start gap-3 text-zinc-600"><GiParkBench className="text-lg" />Outdoor</h3>
                    </div>
                    <div className="grid gap-2 col-span-1">
                        <p className="font-semibold">{parking ? 'Open Parking' : 'None'}</p>
                        <p className="font-semibold">Porch</p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="grid gap-2 col-span-1">
                        <h3 className="flex flex-row items-center justify-start gap-3 text-zinc-600"><MdSquareFoot className="text-lg" /> Price/Sqft</h3>
                        <h3 className="flex flex-row items-center justify-start gap-3 text-zinc-600"><FaCalendarDay className="text-lg" />Listed</h3>
                    </div>
                    <div className="grid gap-2 col-span-1">
                        <p className="font-semibold">{price && sqft && formatter.format(price / sqft)}</p>
                        <p className="font-semibold">{moment(date, "DD/MM/YYYY").fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHighlights
