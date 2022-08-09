import React, { useState, useEffect } from 'react';
import { useMap, useGraphics,useWebScene,useScene,useEvents } from "esri-loader-hooks";
import InfoBoxPrint from '../components/infoBoxPrint';
import Sidebar from '../components/sidebar'
import {pointGraphicJson,polygonGraphicJson} from "./graphics";
import assignTLE from './assignTLE'
import Pos from './trace';
import Altitude from './altitude';


const IDdefault=25544;
const totalpoints = 200;
const intervalo = 50000;
const darkDefault = true;
const defaultCenter = [-101.17, 21.78];


// hooks allow us to create a map component as a function
export default function PointMap() {

  
  const [ID,setID] = useState(IDdefault);
  const [interval,setInterval] = useState(intervalo);
  const [totalPoints,setTotalPoints] = useState(totalpoints);
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const tle = assignTLE(ID);
  const posiciones = Pos(tle,totalPoints,interval);
  var altitudes=[];
  for (let i = 0; i < posiciones.length; i++) {
    altitudes[i] = Altitude(tle,totalPoints,interval,posiciones[i].lat,posiciones[i].lng);
  }

  const geometry = {
        type: 'point', // autocasts as new Point()
        x: posiciones[Math.ceil(posiciones.length/2)].lng,
        y: posiciones[Math.ceil(posiciones.length/2)].lat,
        z: altitudes[Math.ceil(posiciones.length/2)]*1000
        } ;   
  
  const vertLine =[[posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,0],
    [posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,altitudes[Math.ceil(posiciones.length/2)]*1000]];
  
  var center = [posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,altitudes[Math.ceil(posiciones.length/2)]*1000];

  var polylineVert = {
    type: "polyline", // autocasts as new Polyline()
    paths: [vertLine]
  };
      
  var lineSymbolVert = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [234, 128, 208,0.5],
    width: 4
  };
  const polylineGraphicJsonVert = {
    geometry: polylineVert,
    symbol: lineSymbolVert
  };

  var symbol = {
    type: "picture-marker", // autocasts as new PictureMarkerSymbol()
    url: "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
    width: 48,
    height: 48
  };  

 /*  var symbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [226, 119, 40]
  } */


  var markersPast=[];
  var markersFuture=[]; 

  for (let i = 0; i < posiciones.length; i++) {
    markersPast[i]=[posiciones[i].lng,posiciones[i].lat,altitudes[i]*1000];
  }
  for (let i = 0; i < posiciones.length; i++) {
    markersFuture[i]=[posiciones[i].lng,posiciones[i].lat,10000];
  }

  var polylinePast = {
    type: "polyline", // autocasts as new Polyline()
    paths: [markersPast]
  };

  var polylinePast = {
    type: "polyline", // autocasts as new Polyline()
    paths: [markersPast]
  };
  var polylineFuture = {
    type: "polyline", // autocasts as new Polyline()
    paths: [markersFuture]
  };

  var lineSymbolPast = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [255, 192, 49,0.5],
    width: 4
  };

  var lineSymbolFuture = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [175, 175, 175,0.5],
    width: 4
  };


  
  const polylineGraphicJsonPast = {
    geometry: polylinePast,
    symbol: lineSymbolPast
  };
  const polylineGraphicJsonFuture = {
    geometry: polylineFuture,
    symbol: lineSymbolFuture
  };


  var map = {
    basemap: (dark)?("dark-gray-vector"):("satellite"),
    ground: "world-elevation",
  };
  const options = {
      view: {
        zoom: 2,
        ui: {
          components:['attribution']
        },
        environment:{
          lighting: {
            // enable shadows for all the objects in a scene
            directShadowsEnabled: false,
            // set the date and a time of the day for the current camera location
            //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
          }  
        },
        constraints: {
          altitude: {
            max: 12000000000 // meters
          }
        }
      }
  };

  function styleMap(sidebarOpen) {
    if (sidebarOpen){
        return({
            height: '100vh',
            width: '100%',
            background:'black',
            padding:{
              right:0},
            margin:0,
            'overflow-y':'hidden'
    })
    } else {return({
        height: '100vh',
        width: '100%',
        background:'black',
        padding:{
          right:0},
        margin:0,
        'overflow-y':'hidden'
    })}
}

function styleMapTheme(dark) {
  if (dark){
  }
  else {
    map.basemap='satellite'
  }
}

  
  const [ref,view] = useScene(map, options);
  
  


  // takes a view instance and graphic as a POJO
  // the point will be replaced if the lat/lng props change
  
  const graphics = [polylineGraphicJsonVert,pointGraphicJson,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonFuture];
  useGraphics(view, graphics);
 


  return( <>
  <InfoBoxPrint setID={setID} dark={dark} setInterval={setInterval} setTotalPoints={setTotalPoints} />
  <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>
  
  <div style={styleMap(sidebarOpen)} ref={ref} />
  </>
  )
}
