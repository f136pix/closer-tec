import React from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

type ILocation = {
    address: string;
    lat: number;
    lng: number;
};


const location : ILocation= {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
};

const LocationPin = ({ locationInfo }) => (
    <div className="pin">
        <Icon icon={locationIcon} className="pin-icon" />
        <p className="pin-text">{locationInfo}</p>
    </div>
);

const Map = () => {
    return (
        <div className="map">
            <h2 className="text-white">Come Visit Us At Our Campus</h2>

            <div className="w-[10rem] h-[10rem]">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAAKPtqmfn_dKTzhOvK2zwKjKt75hVkhpo" }}
                    defaultCenter={location}
                    defaultZoom={17}>
                    <LocationPin
                        lat={location.lat}
                        lng={location.lng}
                        text={location.address}
                    />
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default Map;