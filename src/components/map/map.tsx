import { useMemo } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'

import { ListingReduxType } from '@/types/types';

import MapPopUp from './map-pop-up'

import "./map.css"
import "leaflet/dist/leaflet.css" //!: Add import "leaflet/dist/leaflet.css" and set style={{ height: 536 }} (it is not style={{ height: 536px }}) to fix do not display map

interface SearchMapProps {
    lat: number;
    lng: number;
    homeList?: ListingReduxType[];
}
const SearchMap: React.FC<SearchMapProps> = ({ lat, lng, homeList }) => {
    const latCenter = useMemo(() => lat, [lat])
    const lngCenter = useMemo(() => lng, [lng])

    if (!latCenter && !lngCenter) {
        return null
    }
    return (
        <div className='w-full h-full rounded-[0.45rem]'>
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
    )
}

export default SearchMap
