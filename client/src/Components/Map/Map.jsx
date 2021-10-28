import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerType from 'leaflet/dist/images/marker-icon.png';
import axios from 'axios';
import useGeolocation from '../../hooks/useGeolocation';
import Header from '../Header/Header'

const Map = ({ history, match }) => {
  const [lat, setLat] = React.useState(40.42282746499838);
  const [lng, setLng] = React.useState(-3.69791666666665);
  const [cityName, setCityName] = React.useState('The Bridge');
  const [position, setPosition] = React.useState([lat, lng]);
  const [preloadCities, setPreloadCities] = React.useState([]);
  const geolocation = useGeolocation();

  let route = match.params.id;

  useEffect(() => {
    if (geolocation.loaded) {
      const geoLat = JSON.stringify(geolocation.coordinates.lat);
      const geoLng = JSON.stringify(geolocation.coordinates.lng);
      setLat(geoLat);
      setLng(geoLng);
      setPosition([geoLat, geoLng]);
    } else if (route) {
      async function fetchData() {
        const url = `http://localhost:5000/api/data/${route}`;
        const res = await axios.get(url);
        if (res.data) {
          try {
            if (res.data.length === 0) {
              alert('Please enter a valid city name');
              history.push('/');
            } else {
              const newLat = res.data[0].latitude;
              const newLng = res.data[0].longitude;
              const newCityName = res.data[0].name;
              setLat(newLat);
              setLng(newLng);
              setCityName(newCityName);
              setPosition([newLat, newLng]);
            }
          } catch (error) {
            console.log(error.response.data.message);
          }
        }
      }
      fetchData();
    }
  }, [
    route,
    geolocation.loaded,
    history,
    geolocation.coordinates.lat,
    geolocation.coordinates.lng,
  ]);

  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost:5000/api/data/`;
      const res = await axios.get(url);
      if (res.data) {
        try {
          if (res.data.length === 0) {
            alert('Error, we didnt received any data');
            history.push('/');
          } else {
            const allCities = res.data;
            const filteredCities = allCities.map((city) => {
              return {
                name: city.name,
                latitude: city.latitude,
                longitude: city.longitude,
                description: city.description,
              };
            });
            setPreloadCities(filteredCities);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    }
    fetchData();
  }, [history]);

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
    <Header/>
      <MapContainer
        center={position}
        // zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
      >
        <ChangeView />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/fabriziocarella/ckv13ligb2e8m14o3587xvk6p/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
        />
        {preloadCities ? (
          preloadCities.map((city, i) => {
            return (
              <Marker
                position={[city.latitude, city.longitude]}
                icon={markerIcon}
                key={i}
              >
                <Popup>
                  <Link to={`/city/${city.name}`}>{city.name}</Link>
                  <br />
                  {city.description}
                </Popup>
              </Marker>
            );
          })
        ) : (
          <Marker position={position} icon={markerIcon}>
            <Popup>{cityName}</Popup>
          </Marker>
        )}
        {geolocation.loaded ? (
          <Marker
            position={[geolocation.coordinates.lat, geolocation.coordinates.lng]}
            icon={markerIcon}
          >
            <Popup>Your current position</Popup>
          </Marker>
        ) : (
          ''
        )}
      </MapContainer>
    </>
  );
};

export default Map;
