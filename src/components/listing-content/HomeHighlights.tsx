import moment from 'moment'

import { formatter } from "@/lib/utils";
import { ListingReduxType } from "@/types/types";

import { FaCalendarDay, FaParking } from "react-icons/fa"
import { GiParkBench } from "react-icons/gi";
import { MdSell, MdSquareFoot } from "react-icons/md";
import { BsHouseCheckFill } from 'react-icons/bs';

interface HomeHighlightsProps {
    dataListing: ListingReduxType
}

const HomeHighlights: React.FC<HomeHighlightsProps> = ({ dataListing }) => {
    const date = dataListing.createAt && new Date(dataListing.createAt).toLocaleDateString('pt-BR')

    return (
        <div className='w-full flex flex-col gap-5 border rounded-[0.5rem] p-3'>
            <h3 className="font-semibold text-xl">Home Highlights</h3>
            <table className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <tbody className='col-span-1 flex flex-col gap-2'>
                    <tr className='grid grid-cols-2'>
                        <td className="col-span-1 flex flex-row items-center justify-start gap-3 text-zinc-600"><MdSell className="text-lg" />Business Type</td>
                        <td className="text-sm font-semibold">{dataListing.formType}</td>
                    </tr>
                    <tr className='grid grid-cols-2'>
                        <td className="flex flex-row items-center justify-start gap-3 text-zinc-600"><MdSquareFoot className="text-lg" /> Price/Sqft</td>
                        {dataListing.discountPrice
                            ? <td className="text-sm font-semibold">{dataListing.regularPrice && dataListing.discountPrice && dataListing.squaremetre && formatter.format((dataListing.regularPrice - dataListing.discountPrice) / dataListing.squaremetre)}</td>
                            : <td className="text-sm font-semibold">{dataListing.regularPrice && dataListing.discountPrice && dataListing.squaremetre && formatter.format(dataListing.regularPrice / dataListing.squaremetre)}</td>}
                    </tr>
                    <tr className='grid grid-cols-2'>
                        <td className="col-span-1 flex flex-row gap-3 text-zinc-600"><FaCalendarDay className="text-lg" />Listed</td>
                        <td className="col-span-1 text-sm font-semibold">{moment(date, "DD/MM/YYYY").fromNow()}</td>
                    </tr>
                </tbody>
                <tbody className='col-span-1 flex flex-col gap-2'>
                    <tr className='grid grid-cols-2'>
                        <td className="col-span-1 flex flex-row items-center justify-start gap-3 text-zinc-600"><GiParkBench className="text-lg" />Furnish</td>
                        <td className="col-span-1 text-sm font-semibold">{dataListing.furnished ? 'Yes' : 'None'}</td>
                    </tr>
                    <tr className='grid grid-cols-2'>
                        <td className="col-span-1 flex flex-row items-center justify-start gap-3 text-zinc-600"><FaParking className="text-lg" /> Parking</td>
                        <td className="col-span-1 text-sm font-semibold">{dataListing.parking ? 'Open Parking' : 'None'}</td>
                    </tr>
                    {
                        dataListing.amenities.length > 0
                        && <tr className='grid grid-cols-2'>
                            <td className="col-span-1 text-zinc-600">
                                <div className='flex flex-row items-center justify-start gap-3'>
                                    <BsHouseCheckFill className="text-lg" /> Amenities
                                </div>
                            </td>
                            <td className='col-span-1 flex flex-col gap-1'>
                                {dataListing.amenities.map((amenity, i) => (
                                    <p key={i} className='text-sm font-semibold'>- {amenity}</p>
                                ))}
                            </td>
                        </tr>
                    }
                </tbody>

            </table>
        </div >
    )
}

export default HomeHighlights
