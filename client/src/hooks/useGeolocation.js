import { useEffect, useState } from "react";

const useGeolocation = () => {
    const [geolocation, setGeolocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    })
    const onSuccess = geolocation => {
        setGeolocation({
            loaded: true,
            coordinates: {
                lat: geolocation.coords.latitude,
                lng: geolocation.coords.longitude
            }
        })
    }
    const onError = error => {
        setGeolocation({
            loaded: true,
            error,
        })
    }
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])
    return geolocation
}
export default useGeolocation