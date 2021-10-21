import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerType from "leaflet/dist/images/marker-icon.png";

const Map = () => {
  const theBraich = [40.42282746499838, -3.6925770399221793]
  const markerIcon = new Icon({
    iconUrl:markerType
  })

  // const MAPBOX_TOKEN = "pk.eyJ1IjoiZmFicml6aW9jYXJlbGxhIiwiYSI6ImNrdjEweWo3eDM1a3AybmxuN3pzMGdoMzcifQ.YLIRL15AKr7JLgWkIaKMbA"
  // const MAPBOX_USER = "fabriziocarella"
  // const MAPBOX_STYLE = "ckv13ligb2e8m14o3587xvk6p"
  const URLLayer = `https://api.mapbox.com/styles/v1/fabriziocarella/ckv13ligb2e8m14o3587xvk6p/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmFicml6aW9jYXJlbGxhIiwiYSI6ImNrdjEweWo3eDM1a3AybmxuN3pzMGdoMzcifQ.YLIRL15AKr7JLgWkIaKMbA`

  return (
    <MapContainer center={theBraich} zoom={13} scrollWheelZoom={true} style={{ height: "85vh", width: "100%" }} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url={process.env.REACT_APP_MAPBOX_URL}
        url={URLLayer}
      />
      <Marker position={theBraich} icon={markerIcon}>
        <Popup>
          THE BRAICH
        </Popup>
      </Marker>
    </MapContainer>
  )
};

export default Map;