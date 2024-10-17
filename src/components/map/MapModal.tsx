import { useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { ListingReduxType } from '@/types/types';
import MapPopUp from './map-pop-up';

import { FaMapMarkedAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

interface MapModalProps {
    lat: number;
    lng: number;
    homeList?: ListingReduxType[];
}

const MapModal = ({ lat, lng, homeList }: MapModalProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const latCenter = useMemo(() => lat, [lat])
    const lngCenter = useMemo(() => lng, [lng])

    return (
        <div>
            <button type="button" className="flex flex-row items-center justify-center gap-3 rounded-[0.45rem] border text-zinc-700 font-semibold px-4 py-2 hover:bg-zinc-200"
                onClick={() => setIsOpen(!isOpen)}
            ><FaMapMarkedAlt className="text-xl text-teal-800" /> Map</button>

            {isOpen
                ? <div className='fixed z-20 top-[74px] left-0 w-full h-full bg-white'>
                    <div className="w-fit ml-auto cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <IoClose size={30} />
                    </div>
                    <div className='w-full h-full rounded-[0.45rem] p-2'>
                        <MapContainer style={{ height: "100%", width: "100%" }} center={[latCenter, lngCenter]} zoom={11} scrollWheelZoom={true}>
                            <TileLayer
                                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {homeList?.map((homeItem: ListingReduxType, i) => (
                                <Marker key={i} position={[parseFloat(homeItem.location.latitude), parseFloat(homeItem.location.longitude)]}>
                                    <Popup closeButton={false} >
                                        <MapPopUp homeItem={homeItem} />
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
                : null}

        </div>
    )
}

export default MapModal
