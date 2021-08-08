import React,{ useState,useRef,useEffect } from 'react';
import {MapContainer,TileLayer,Marker,Popup,useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import "./BasicMap.css";
import {makeStyles, Button} from "@material-ui/core"
import np from'../assets/np.json';  

const markerIcon =new L.icon(
    {
        iconUrl:require("../assets/redMark.png").default,
        iconSize:[35,45],
        iconAnchor:[17,45],
        popupAnchor:[3,-46],
    }
);

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, (map.getZoom()+5) > 18  ? 18 : map.getZoom()+5)
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={markerIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

const BasicMap=()=> {
    // const classes = useStyles();
    
    const [center,setCenter]=useState({ lat:27.68120419340318, lng:85.31848276858595});
    const ZOOM_LEVEL=10;

    return (
        <div className="map">
            <MapContainer
                center={center}
                zoom={ZOOM_LEVEL}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
            <LocationMarker />
            {np.map((city,idx)=><Marker
             position={[city.lat,city.lng]} 
             key={idx}
             >
                <Popup>
                    <b>{city.city}</b>
                </Popup>

            </Marker>)}

            </MapContainer>

        </div>
    )
}

export default BasicMap
