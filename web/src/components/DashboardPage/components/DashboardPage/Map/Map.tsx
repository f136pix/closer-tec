import {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";

import {ITechncian} from "../../../../../types";

type IParams = {
    filteredTechnicians: ITechncian[] | null;
}

type ILocs = {
    id: number;
    name: string;
    position: {
        lat: number;
        lng: number;
    }

}

// seting initial bounds to brazil
const markers: ILocs[] = [
    {
        id: 1,
        name: "North Brasil",
        position: {lat: 2.8328034416353316, lng: -60.720670438290846}
    },
    {
        id: 2,
        name: "East Brasil",
        position: {lat: -12.70850408650963, lng: -31.535873679150015}
    },
    {
        id: 2,
        name: "South Brasil",
        position: {lat: -33.45049281632124, lng: -53.70043700118142}
    },
    {
        id: 2,
        name: "West Brasil",
        position: {lat: -18.94923923631646, lng: -61.15408634602573}
    }
];

function Map(params: IParams) {
    const [activeMarker, setActiveMarker] = useState(null);
    const [mapRef, setMapRef] = useState<null | google.maps.Map>(null);

    // resize maps on filter
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (mapRef && params.filteredTechnicians?.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            params!.filteredTechnicians!.map(({latitude, longitude}) => {
                bounds.extend({
                    lat: latitude,
                    lng: longitude,
                });
            });
            mapRef.fitBounds(bounds);
        }
    }, [params.filteredTechnicians]);
    const handleActiveMarker = (marker: any): void => {
        // if is already selected does nothing
        if (marker === activeMarker) {
            return;
        }
        // set selected marked to the clicked one
        setActiveMarker(marker);
    };

    const handleOnLoad = (map: any): void => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({position}) => bounds.extend(position));
        map.fitBounds(bounds);
        setMapRef(map);
    };


    return (
        <>
            <GoogleMap
                onLoad={handleOnLoad}
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={{width: "100vw", height: "100%"}}
                clickableIcons={false}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                {params.filteredTechnicians?.map(({id, lastName, latitude, longitude}) => {
                    if (latitude == null || longitude == null) return null;
                    return (
                        <Marker
                            key={id}
                            position={{lat: latitude, lng: longitude}}
                            onClick={() => handleActiveMarker(id)}
                        >
                            {activeMarker === id ? (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    <div>{lastName}</div>
                                </InfoWindow>
                            ) : null}
                        </Marker>
                    );
                })}
            </GoogleMap>
        </>
    );
}

export default Map;
