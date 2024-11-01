import { useMemo } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'

import { ListingReduxType } from '@/types/types';

import MapPopUp from './map-pop-up'

import "./map.css"
import "leaflet/dist/leaflet.css" //!: Add import "leaflet/dist/leaflet.css" and set style={{ height: 536 }} (it is not style={{ height: 536px }}) to fix do not display map

interface ListingMapProps {
    lat: number;
    lng: number;
    dataListing: ListingReduxType;
}

const ListingMap = ({ dataListing, lat, lng }: ListingMapProps) => {
    const latCenter = useMemo(() => lat, [lat])
    const lngCenter = useMemo(() => lng, [lng])

    if (!latCenter && !lngCenter) {
        return null
    }
    return (
        <div className='w-full h-full rounded-[0.45rem] overflow-hidden'>
            <MapContainer style={{ height: "100%", width: "100%" }} center={[latCenter, lngCenter]} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[parseFloat(dataListing.location.latitude), parseFloat(dataListing.location.longitude)]}>
                    <Popup closeButton={false} >
                        <MapPopUp homeItem={dataListing} />
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default ListingMap
