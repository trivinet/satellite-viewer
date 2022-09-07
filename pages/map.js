import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from '../styles/Home.module.css';
import Pos from '../components/trace';
import ReactTooltip from 'react-tooltip';
import TimePoints from '../components/getTimes';
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import assignTLE from '../components/assignTLE'
import InfoBoxPrint from '../components/infoBoxPrint';
import { getSatelliteInfo,getLatLngObj } from 'tle.js';
import TLEinfo from '../components/TLEinfo';

  
const totalpoints = 200;
const intervalo = 50000;
const IDdefault=25544;
const darkDefault = true;
const defaultCenter = [38,-5];


export default function SimpleMap(){

    const [ID,setID] = useState('');
    const [dark,setDark] = useState(true);
    const [sidebarOpen,setSidebarOpen] = useState(false);
    const [interval,setInterval] = useState(intervalo);
    const [totalPoints,setTotalPoints] = useState(totalpoints);
    const [selectedFam, setSelectedFam] = useState(false);
    const [center,setCenter] = useState(defaultCenter);
    const [mark,setMark] = useState('');
    const [viewMode,setViewMode] = useState('ECI');
    const [viewTrace, setViewTrace] = useState(true);
    const [tleInfoShow,setTleInfoShow] = useState(false);
    const [IDfam,setIDfam] = useState('');
    const [environment,setEnvironment] = useState({
        lighting: {
          // enable shadows for all the objects in a scene
          directShadowsEnabled: false,
          // set the date and a time of the day for the current camera location
          //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
        }  
      });
  const [basemap,setBasemap] = useState("dark-gray-vector");

    /* function styleMap(sidebarOpen) {
        if (sidebarOpen){
            return({
                height: '100vh',
                width: '100%',
                "padding-right":'250px',
                "padding-left":'250px',
                background: '#0F0F09'
        })
        } else {return({
            height: '100vh',
            width: '100%',
            "padding-right":'250px',
            "padding-left":'100px',
            background: '#0F0F09'
        })}
    } */

    var tleInfoCont=[];

  if(tleInfoShow){
    if(selectedFam){tleInfoCont=(<TLEinfo ID={IDfam} ></TLEinfo>);}else{
    tleInfoCont=(<TLEinfo ID={ID} ></TLEinfo>);
    }
  }else{tleInfoCont=[]}

    function styleMap(sidebarOpen) {
        return({
            height: '100vh',
            width: '100%',
            "padding-right":'0px',
            "padding-left":'0px',
            background: '#0F0F09'
    })
    }

  //marker
  /* const AnyReactComponent = ({ text }) => <div className={styles.marker}> {text}</div>; */
  const AnyReactComponent = () => <div className={styles.marker}><p></p>
  </div>;
  //traza futuro
  const AnyReactComponentTraceFuture = ({ text,info,number }) => <div className={styles.markerTraceFuture}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
  <ReactTooltip id={"markerTooltip"+number} type='dark' html={true}>{info}</ReactTooltip></div>;
  const AnyReactComponentTraceFamily = ({ text,info,number,ID2 }) => <div onClick={() => {setMark(ID2.toString()),setTotalPoints(totalpoints),setIDfam(ID2.toString()),setTleInfoShow(true)}} className={styles.markerTraceFamily}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
  <ReactTooltip id={"markerTooltip"+number} type='dark' html={true}>{info}</ReactTooltip></div>;
  const AnyReactComponentTraceIDFam = ({ text,info,number }) => <div className={styles.markerTraceIDFam}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
    <ReactTooltip id={"markerTooltip"+number} html={true}>{info}</ReactTooltip></div>;
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
    if (tle!=''){
    var name = tle.split('\n')[0];
  
  //calcula (lat,long)
    var posiciones = Pos(tle,1,interval);

  //calcula tiempos (ms)
    var tiempos = TimePoints(1, interval);

  //crea markers
  if (posiciones!=''){
    markers.push(<AnyReactComponentTraceFamily
          ID2={ID[i]}
          lat={posiciones[1].lat}
          lng={posiciones[1].lng}
          text="·"
          info= {'ID: '+ ID[i] + ', Nombre: ' + name}
          number={i}
/>)}}}
        if (mark!=''){
            name = assignTLE(mark).split('\n')[0];
            var posicionesMark=Pos(assignTLE(mark),totalPoints,interval);
            var tiempos = TimePoints(totalPoints, interval);
            
            for (let i=0;i<totalPoints;i++){
                markers.push(<AnyReactComponentTraceIDFam
                    lat={posicionesMark[i].lat}
                    lng={posicionesMark[i].lng}
                    text='.'
                    info= {'ID: '+ mark + ', Nombre: ' + name + '<br/>' +
                    'lat: '+posicionesMark[i].lat.toString().substring(0,7)+"º , "+'lng: '+posicionesMark[i].lng.toString().substring(0,7) +"º, "+ 'alt: ' +getSatelliteInfo(assignTLE(mark),Date.now(),getLatLngObj(assignTLE(mark),Date.now()).lat,getLatLngObj(assignTLE(mark),Date.now()).lng,0).height.toString().substring(0,9) + 'km' +'<br />'+
                     '\ Época: ' + tiempos[i] }
                    number={ID.length+i}
                  />)
            }

            markers.push(<AnyReactComponentTraceMark
                lat={posicionesMark[Math.ceil(totalPoints/2)].lat}
                lng={posicionesMark[Math.ceil(totalPoints/2)].lng}
                text='.'
                info= {'ID: '+ mark + ', Nombre: ' + name + '<br/>' +
                posicionesMark[Math.ceil(totalPoints/2)].lat.toString().substring(0,7)+"º , "+posicionesMark[Math.ceil(totalPoints/2)].lng.toString().substring(0,7) +"º, "+ getSatelliteInfo(assignTLE(mark),Date.now(),getLatLngObj(assignTLE(mark),Date.now()).lat,getLatLngObj(assignTLE(mark),Date.now()).lng,0).height.toString().substring(0,9) + 'km' +'<br />'+
                 '\ Época:' + tiempos[Math.ceil(totalPoints/2)] }
                number={ID.length+totalPoints}
              />)
            
        }
  }else{
    var markers=[];
    if (ID!=''){
  const tle = assignTLE(ID); 

  const name = tle.split('\n')[0];

  //calcula (lat,long)
  const posiciones = Pos(tle,totalPoints,interval);

  //calcula tiempos (ms)
  const tiempos = TimePoints(totalPoints, interval);

  //crea markers
  markers.push(<AnyReactComponent
    lat={posiciones[Math.ceil(posiciones.length/2)].lat}
    lng={posiciones[Math.ceil(posiciones.length/2)].lng}
  />)
  for (let i = 0; i < Math.ceil(posiciones.length/2); i++) {
      markers.push(<AnyReactComponentTracePast
          lat={posiciones[i].lat}
          lng={posiciones[i].lng}
          text="·"
          info= {'ID: '+ ID + ', Nombre: ' + name + '<br/>' +
            'lat: ' + posiciones[i].lat.toString().substring(0,7)+"º , lng: "+posiciones[i].lng.toString().substring(0,7) +"º, alt: "+ getSatelliteInfo(tle,Date.now(),posiciones[i].lat,posiciones[i].lng,0).height.toString().substring(0,9) + 'km'+'<br />'+
           '\ Época: ' + tiempos[i] }
          number={i}
        />)
  }
  for (let i = Math.ceil(posiciones.length/2); i < posiciones.length; i++) {
    markers.push(<AnyReactComponentTraceFuture
      lat={posiciones[i].lat}
      lng={posiciones[i].lng}
      text="·"
      info={'ID: '+ ID + ', Nombre: ' + name + '<br/>' + 'lat: '+posiciones[i].lat.toString().substring(0,7)+"º , lng: "+posiciones[i].lng.toString().substring(0,7) +"º, alt: "+ getSatelliteInfo(tle,Date.now(),posiciones[i].lat,posiciones[i].lng,0).height.toString().substring(0,9) + 'km'+ '<br />' + "Época: " + tiempos[i]}
      number={i}
    />)
  }
}}
  //config mapa
  const handleApiLoaded = (map, maps) => {};
    return (
      // Important! Always set the container height explicitly
     <> 
      <Sidebar style={{ opacity: '1'}} setDark={setDark} setSidebarOpen={setSidebarOpen} setBasemap={setBasemap} setEnvironment={setEnvironment}/>
      <InfoBoxPrint setID={setID} dark={dark} setInterval={setInterval} setTotalPoints={setTotalPoints} setSelectedFam={setSelectedFam} setCenter={setCenter} setMark={setMark} setViewMode={setViewMode} setViewTrace={setViewTrace} setTleInfoShow={setTleInfoShow} setIDfam={setIDfam}/>
      {tleInfoCont}
    <div style={{height: '100vh',width: '100%',paddingRight:'0px'}}>
    <GoogleMapReact className="Mapa"
      bootstrapURLKeys={{ key: "AIzaSyDKrg6ygIgLkBGpUX29D9hc2OtKprEQvGY" }}
      options={{
        zoomControl:false,
        fullscreenControl: false,
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
                      "color": '#BABABA'/* "#e3e3e3" */
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
                    "color": /* "#2D333C" */'#0F0F09'
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
      defaultCenter={defaultCenter}
      defaultZoom={defaultProps.zoom}
      center={center}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
      {markers}
    </GoogleMapReact>
  </div>
  </>
    );
}

