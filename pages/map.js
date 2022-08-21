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
import { getSatelliteInfo,getLatLngObj } from 'tle.js';

  
const totalpoints = 200;
const intervalo = 50000;
const IDdefault=25544;
const darkDefault = true;
const defaultCenter = [Pos(assignTLE(IDdefault),1,intervalo)[0].lat,Pos(assignTLE(25544),1,intervalo)[0].lng];


export default function SimpleMap(){

    const [ID,setID] = useState(IDdefault);
    const [dark,setDark] = useState(true);
    const [sidebarOpen,setSidebarOpen] = useState(false);
    const [interval,setInterval] = useState(intervalo);
    const [totalPoints,setTotalPoints] = useState(totalpoints);
    const [selectedFam, setSelectedFam] = useState(false);
    const [center,setCenter] = useState(defaultCenter);
    const [mark,setMark] = useState('');

    function styleMap(sidebarOpen) {
        if (sidebarOpen){
            return({
                height: '100vh',
                width: '100%',
                "padding-right":'250px',
                "padding-left":'250px',
                background: 'black'
        })
        } else {return({
            height: '100vh',
            width: '100%',
            "padding-right":'250px',
            "padding-left":'100px',
            background: 'black'
        })}
    }

  //marker
  /* const AnyReactComponent = ({ text }) => <div className={styles.marker}> {text}</div>; */
  const AnyReactComponent = () => <div className={styles.marker}><p></p>
  </div>;
  //traza futuro
  const AnyReactComponentTraceFuture = ({ text,info,number }) => <div className={styles.markerTraceFuture}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
  <ReactTooltip id={"markerTooltip"+number} type='dark' html={true}>{info}</ReactTooltip></div>;

  //traza pasado
  const AnyReactComponentTracePast = ({ text,info,number }) => <div className={styles.markerTracePast}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
  <ReactTooltip id={"markerTooltip"+number} html={true}>{info}</ReactTooltip></div>;
  const AnyReactComponentTraceMark = ({ text,info,number }) => <div className={styles.markerTraceMark}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
  <ReactTooltip id={"markerTooltip"+number} html={true}>{info}</ReactTooltip></div>;

  //variables mapa
  const defaultProps = {
    center: {
      lat: center[0],
      lng: center[1]
    },
    zoom: 0
  }

  if(selectedFam){
    
    var markers=[];
    for (let i = 0; i < ID.length; i++) {

    var tle = assignTLE(ID[i]); 

    var name = tle.split('\n')[0];
  
  //calcula (lat,long)
    var posiciones = Pos(tle,1,interval);

  //calcula tiempos (ms)
    var tiempos = TimePoints(1, interval);

  //crea markers
    markers.push(<AnyReactComponentTracePast
          lat={posiciones[1].lat}
          lng={posiciones[1].lng}
          text="·"
          info= {'ID: '+ ID[i] + ', name: ' + name}
          number={i}
/>)}
        if (mark!=''){
            name = assignTLE(mark).split('\n')[0];
            var posicionesMark=Pos(assignTLE(mark),totalPoints,interval);
            var tiempos = TimePoints(totalPoints, interval);
            
            for (let i=0;i<totalPoints;i++){
                markers.push(<AnyReactComponentTraceFuture
                    lat={posicionesMark[i].lat}
                    lng={posicionesMark[i].lng}
                    text='.'
                    info= {'ID: '+ mark + ', name: ' + name + '<br/>' +
                    posicionesMark[i].lat.toString().substring(0,7)+"º , "+posicionesMark[i].lng.toString().substring(0,7) +"º, "+ getSatelliteInfo(assignTLE(mark),Date.now(),getLatLngObj(assignTLE(mark),Date.now()).lat,getLatLngObj(assignTLE(mark),Date.now()).lng,0).height.toString().substring(0,9) + 'km' +'<br />'+
                     '\ time:' + tiempos[i] }
                    number={ID.length+i}
                  />)
            }

            markers.push(<AnyReactComponentTraceMark
                lat={posicionesMark[Math.ceil(totalPoints/2)].lat}
                lng={posicionesMark[Math.ceil(totalPoints/2)].lng}
                text='.'
                info= {'ID: '+ mark + ', name: ' + name + '<br/>' +
                posicionesMark[Math.ceil(totalPoints/2)].lat.toString().substring(0,7)+"º , "+posicionesMark[Math.ceil(totalPoints/2)].lng.toString().substring(0,7) +"º, "+ getSatelliteInfo(assignTLE(mark),Date.now(),getLatLngObj(assignTLE(mark),Date.now()).lat,getLatLngObj(assignTLE(mark),Date.now()).lng,0).height.toString().substring(0,9) + 'km' +'<br />'+
                 '\ time:' + tiempos[Math.ceil(totalPoints/2)] }
                number={ID.length+totalPoints}
              />)
            
        }
  }else{

  const tle = assignTLE(ID); 

  const name = tle.split('\n')[0];

  //calcula (lat,long)
  const posiciones = Pos(tle,totalPoints,interval);

  //calcula tiempos (ms)
  const tiempos = TimePoints(totalPoints, interval);

  //crea markers
  var markers=[];
  markers.push(<AnyReactComponent
    lat={posiciones[Math.ceil(posiciones.length/2)].lat}
    lng={posiciones[Math.ceil(posiciones.length/2)].lng}
  />)
  for (let i = 0; i < Math.ceil(posiciones.length/2); i++) {
      markers.push(<AnyReactComponentTracePast
          lat={posiciones[i].lat}
          lng={posiciones[i].lng}
          text="·"
          info= {'ID: '+ ID + ', name: ' + name + '<br/>' +
            posiciones[i].lat.toString().substring(0,7)+"º , "+posiciones[i].lng.toString().substring(0,7) +"º, "+ getSatelliteInfo(tle,Date.now(),posiciones[i].lat,posiciones[i].lng,0).height.toString().substring(0,9) + 'km'+'<br />'+
           '\ time:' + tiempos[i] }
          number={i}
        />)
  }
  for (let i = Math.ceil(posiciones.length/2); i < posiciones.length; i++) {
    markers.push(<AnyReactComponentTraceFuture
      lat={posiciones[i].lat}
      lng={posiciones[i].lng}
      text="·"
      info={'ID: '+ ID + ', name: ' + name + '<br/>' + posiciones[i].lat.toString().substring(0,7)+"º , "+posiciones[i].lng.toString().substring(0,7) +"º" +posiciones[i].lng.toString().substring(0,7) +"º, "+ getSatelliteInfo(tle,Date.now(),posiciones[i].lat,posiciones[i].lng,0).height.toString().substring(0,9) + 'km'+ '<br />' + "time: " + tiempos[i]}
      number={i}
    />)
  }
}
  //config mapa
  const handleApiLoaded = (map, maps) => {};
    return (
      // Important! Always set the container height explicitly
     <> 
      <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>
      <InfoBoxPrint setID={setID} dark={dark} setInterval={setInterval} setTotalPoints={setTotalPoints} setSelectedFam={setSelectedFam} setCenter={setCenter} setMark={setMark} />
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
      {markers}
    </GoogleMapReact>
    
    
  </div>
  </>
    );
}

