import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from '../styles/Home.module.css';
import Pos from './trace';
import ReactTooltip from 'react-tooltip';
import TimePoints from './getTimes';
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import assignTLE from './assignTLE'
import InfoBoxPrint from '../components/infoBoxPrint';

  
const totalpoints = 500;
const intervalo = 50000;/* 
const hora = new Date(100000000000);
const horaActual = Date.now(); */

//var ID=false;

const IDdefault=25544;
const darkDefault = true;
//const ID = 902;

export default function SimpleMap(){

    const [ID,setID] = useState(IDdefault);
    const [dark,setDark] = useState(true);
    const [sidebarOpen,setSidebarOpen] = useState(false);
    const [interval,setInterval] = useState(intervalo);
    const [totalPoints,setTotalPoints] = useState(totalpoints);

    function styleMap(sidebarOpen) {
        if (sidebarOpen){
            return({
                height: '100vh',
                width: '100%',
                "padding-right":'250px',
                "padding-left":'250px'
        })
        } else {return({
            height: '100vh',
            width: '100%',
            "padding-right":'250px',
            "padding-left":'100px'
        })}
    }

  //marker
  const AnyReactComponent = ({ text }) => <div className={styles.marker}> {text}</div>;
  //traza futuro
  const AnyReactComponentTraceFuture = ({ text,info,number }) => <div className={styles.markerTraceFuture}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
  <ReactTooltip id={"markerTooltip"+number} type='dark' html={true}>{info}</ReactTooltip></div>;

  //traza pasado
  const AnyReactComponentTracePast = ({ text,info,number }) => <div className={styles.markerTracePast}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
  <ReactTooltip id={"markerTooltip"+number} html={true}>{info}</ReactTooltip></div>;

  //variables mapa
  const defaultProps = {
    center: {
      lat: 38.9862,
      lng: -5.2557
    },
    zoom: 0
  }
  //tle
   /* const tle = `ISS (ZARYA)
    1 25544U 98067A   22200.18518544  .00008537  00000+0  15726-3 0  9998
    2 25544  51.6408 178.1024 0004971  26.6345  84.2777 15.50023189 350148`; */
   /*  const tle = `CALSPHERE 1             
    1 00900U 64063C   22202.77533537  .00000453  00000+0  47325-3 0  9991
    2 00900  90.1734  41.5384 0024926 280.2982 199.7183 13.73846342875373`;  */
  const tle = assignTLE(ID); 

  const name = tle.split('\n')[0];
  //const tle = TLE;
  //calcula (lat,long)
  const posiciones = Pos(tle,totalPoints,interval);
  if (posiciones != 'Server Failed') {

  //calcula tiempos (ms)
  const tiempos = TimePoints(totalPoints, interval);

  //crea markers
  var markers=[];
  for (let i = 0; i < Math.ceil(posiciones.length/2); i++) {
      markers.push(<AnyReactComponentTracePast
          lat={posiciones[i].lat}
          lng={posiciones[i].lng}
          text="·"
          info= {'ID: '+ ID + ', name: ' + name + '<br/>' +
            posiciones[i].lat.toString().substring(0,7)+"º , "+posiciones[i].lng.toString().substring(0,7) +"º"+'<br />'+
           '\ time:' + tiempos[i] }
          number={i}
        />)
  }
  for (let i = Math.ceil(posiciones.length/2); i < posiciones.length; i++) {
    markers.push(<AnyReactComponentTraceFuture
      lat={posiciones[i].lat}
      lng={posiciones[i].lng}
      text="·"
      info={'ID: '+ ID + ', name: ' + name + '<br/>' + posiciones[i].lat.toString().substring(0,7)+"º , "+posiciones[i].lng.toString().substring(0,7) +"º"
      + '<br />' + "time: " + tiempos[i]}
      number={i}
    />)
  }
}
else {
    markers=[];
    markers.push(<AnyReactComponentTracePast
        lat={0}
        lng={0}
        text="·"
        info= {'Server Failed'}
      />)
}
  //config mapa
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  //const latLonObj = getLatLngObj(tle,/*  optionalTimestampMS+120000 */Date.now());
 // ⬅️ si está light, mostramos light map
 //{{ height: '100vh' , width: '100%', "padding-right":'250px',"padding-left":'250px'}
    return (
      // Important! Always set the container height explicitly
     <> 
      <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>
      <InfoBoxPrint setID={setID} dark={dark} setInterval={setInterval} setTotalPoints={setTotalPoints} />

    <div style={styleMap(sidebarOpen)}>
    <GoogleMapReact className="Mapa"
      bootstrapURLKeys={{ key: "AIzaSyDKrg6ygIgLkBGpUX29D9hc2OtKprEQvGY" }}
      options={{
        styles:
        !dark? 
        [ //lightTheme
          {
              "featureType": "administrative",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#e3e3e3"
                  }
              ]
          },
          {
              "featureType": "landscape.natural",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#cccccc"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit.line",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit.station.airport",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit.station.airport",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#EFEDEE"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          }
      ]:[ //darkTheme
        {
            "stylers": [
                {
                    "hue": "#ff1a00"
                },
                {
                    "invert_lightness": true
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 33
                },
                {
                    "gamma": 0.5
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2D333C"
                }
            ]
        },
        {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
                  
              },
              {
                  "saturation": "-100"
              }
          ]
      },
    ]
      }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
        {(posiciones.length>1)?(
      <AnyReactComponent
        lat={posiciones[Math.ceil(posiciones.length/2)].lat}
        lng={posiciones[Math.ceil(posiciones.length/2)].lng}
      />):(<AnyReactComponent
        lat={posiciones[0].lat}
        lng={posiciones[0].lng}
      />)}
      {markers}
    </GoogleMapReact>
    
    
  </div>
  </>
    );
}


/* SimpleMap.getLayout = function getLayout(page) {
    const [ID,setID] = useState(null);
  return (   
    <Layout>
        {page}
      {<InfoBoxPrint setID={setID}/>}
    </Layout>
  )
} */
