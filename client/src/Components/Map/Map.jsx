import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerType from 'leaflet/dist/images/marker-icon.png';

const Map = ({ history, match }) => {
  const [lat, setLat] = React.useState(40.42282746499838);
  const [lng, setLng] = React.useState(-3.69791666666665);
  const [position, setPosition] = React.useState([lat, lng]);

  const route = match.params.id;

  const markerIcon = new Icon({
    iconUrl: markerType,
  });

  /* https://localhost.com/map/Madrid

En este caso route es Madrid
Esto se lo pasarias al fetch rollo: axios.get(`https://localhost.com:5000/api/data/${route}`)
y te traeria los datos de la bbdd de madrid
Madrid -> /map/Madrid 

*/

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '85vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/fabriziocarella/ckv13ligb2e8m14o3587xvk6p/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
      />
      <Marker position={position} icon={markerIcon}>
        <Popup>The Bridge</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
