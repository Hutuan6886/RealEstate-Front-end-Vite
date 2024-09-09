import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import "./map.css"
import "leaflet/dist/leaflet.css" //!: Add import "leaflet/dist/leaflet.css" and set style={{ height: 536 }} (it is not style={{ height: 536px }}) to fix do not display map
import MapPopUp from './map-pop-up'
import { useEffect, useState } from 'react';
import { HomeType } from '@/types/types';
interface SearchMapProps {
    lat: number;
    lng: number;
    homeList?: HomeType[];
}
const SearchMap: React.FC<SearchMapProps> = ({ lat, lng, homeList }) => {

    const [latCenter, setLatCenter] = useState<number>(0)
    const [lngCenter, setLngCenter] = useState<number>(0)

    useEffect(() => {
        setLatCenter(lat)
        setLngCenter(lng)
    }, [lat, lng])

    if (!latCenter && !lngCenter) {
        return null
    }
    return (
        <div className='w-full h-fit rounded-[0.45rem] overflow-hidden'>
            <MapContainer style={{ height: 536 }} center={[latCenter, lngCenter]} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {homeList?.map((homeItem: HomeType, i) => (
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
