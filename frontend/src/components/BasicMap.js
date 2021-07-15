import React,{ useState,useRef,useEffect } from 'react';
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import np from'../assets/np.json';  

const Userlocation = () => {
    const[location,setLocation]=useState({ 
        loaded:false,
        coordinates: { lat:'', lng:''}
    });

    const onSuccess=location=>{

        setLocation({

            loaded:true,
            coordinates: {
                lat:location.coords.latitude,
                lng:location.coords.longitude,
            }
        })
    };
    const onError=error=>{
        
        setLocation({

            loaded:true,
            error,
        })
    }

    useEffect(() => {
        if(!("geolocation" in navigator) ){
            onError({
                code:0,
                message:"Geolocation not supported",
            })

        }
            navigator.geolocation.getCurrentPosition(onSuccess,onError)
        
    }, []);

    return location;
 
}

const OsmProviders ={ maptiler: {
    url:"https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=5ANtaqsGNao7fiwFYqHX",
    attribution:'&copy;<a href="https://www.maptiler.com/">Maptiler</a> &copy; <a href="https://www.osm.org/copyright">OpenStreetMap</a> contributors'
    }
}

const markerIcon =new L.icon(
    {
        iconUrl:require("../assets/download.png").default,
        iconSize:[35,45],
        iconAnchor:[17,45],
        popupAnchor:[3,-46],
    }
);
const myIcon =new L.icon(
    {
        iconUrl:require("../assets/mark.png").default,
        iconSize:[35,45],
        iconAnchor:[17,45],
        popupAnchor:[3,-46],
    }
);

const BasicMap=()=> {

    const [center,setCenter]=useState({ lat:29.5239, lng:82.0788});
    const ZOOM_LEVEL=9;
    const mapRef=useRef();
    const location=Userlocation(); 

    const showMylocation=() =>{

        if(location.loaded && !location.error){

            mapRef.current.leafletElement.flyTo([location.coordinates.lat,location.coordinates.lng],ZOOM_LEVEL,{animate:true})
        }
        else{
            alert(location.error.message)
        }
    }


    return (
        <div>
            <Map
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
            >
            <TileLayer url={OsmProviders.maptiler.url} attribution={OsmProviders.maptiler.attribution} />
            
            {location.loaded && !location.error && (
                <Marker 
                 icon ={myIcon} 
                 position={[location.coordinates.lat,location.coordinates.lng]}>

                 <Popup>
                    <b>You are here dammit</b>
                </Popup>


                </Marker>
            )
            
            
            
            }
            {np.map((city,idx)=><Marker
             position={[city.lat,city.lng]} 
             icon={markerIcon}
             key={idx}
             >
                <Popup>
                    <b>{city.city}</b>
                </Popup>

            </Marker>)}

            </Map>
            <button onClick={showMylocation}></button>

        </div>
    )
}

export default BasicMap
