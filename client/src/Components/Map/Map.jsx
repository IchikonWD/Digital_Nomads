import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerType from 'leaflet/dist/images/marker-icon.png';
import axios from 'axios';
import useGeolocation from '../../hooks/useGeolocation';

const Map = ({ history, match }) => {
  const [lat, setLat] = React.useState(40.42282746499838);
  const [lng, setLng] = React.useState(-3.69791666666665);
  const [cityName, setCityName] = React.useState("The Bridge");
  const [position, setPosition] = React.useState([lat, lng]);
  const geolocation = useGeolocation()
  const route = match.params.id;

  useEffect(() => {
    if (geolocation.loaded) {
      const geoLat = JSON.stringify(geolocation.coordinates.lat)
      const geoLng = JSON.stringify(geolocation.coordinates.lng)
      setLat(geoLat)
      setLng(geoLng)
      setPosition([geoLat, geoLng])
    }
    else if (route) {
      async function fetchData() {
        const url = `http://localhost:5000/api/data/${route}`
        const res = await axios.get(url)
        if (res.data) {
          try {
            if (res.data.length === 0) {
              alert('Please enter a valid city name')
              history.push('/')
            } else {
              const newLat = res.data[0].latitude
              const newLng = res.data[0].longitude
              const newCityName = res.data[0].name
              setLat(newLat)
              setLng(newLng)
              setCityName(newCityName)
              setPosition([newLat, newLng])
            }
          }
          catch (error) {
            console.log(error.response.data.message);
          }
        }
      }
      fetchData()
    }
  }, [route || geolocation.loaded]);
  /* https://localhost.com/map/Madrid
  En este caso route es Madrid
  Esto se lo pasarias al fetch rollo: axios.get(`https://localhost.com:5000/api/data/${route}`)
  y te traeria los datos de la bbdd de madrid
  Madrid -> /map/Madrid 
  */
  const markerIcon = new Icon({
    iconUrl: markerType,
  });
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(position, 13);
    return null;
  }
  return (
    <>
      {/* <div>{geolocation.loaded ? JSON.stringify(geolocation) : "Data not available"}</div> */}
      <MapContainer
        center={position}
        // zoom={13}
        scrollWheelZoom={true}
        style={{ height: '85vh', width: '100%' }}
      >
        <ChangeView />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/fabriziocarella/ckv13ligb2e8m14o3587xvk6p/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>{cityName}</Popup>
        </Marker>
      </MapContainer>
    </>

  );
};

export default Map;