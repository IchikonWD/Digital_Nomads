import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerType from "leaflet/dist/images/marker-icon.png";

const Map = () => {
  
  const currentPosition = [40.42282746499838, -3.6925770399221793]
  const markerIcon = new Icon({
    iconUrl:markerType
  })

  return (
    <MapContainer center={currentPosition} zoom={13} scrollWheelZoom={true} style={{ height: "85vh", width: "100%" }} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/fabriziocarella/ckv13ligb2e8m14o3587xvk6p/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
      />
      <Marker position={currentPosition} icon={markerIcon}>
        <Popup>
          The Bridge
        </Popup>
      </Marker>
    </MapContainer>
  )
};

export default Map;