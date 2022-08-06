import React, { useState, useEffect } from 'react';
import { useMap, useGraphics,useWebScene,useScene } from "esri-loader-hooks";
import InfoBoxPrint from '../components/infoBoxPrint';
import Sidebar from '../components/sidebar'
import {pointGraphicJson,polygonGraphicJson} from "./graphics";
import assignTLE from './assignTLE'
import Pos from './trace';
import Altitude from './altitude';

const latitude=50.321;
const longitude=27.321;
const IDdefault=25544;
const totalpoints = 100;
const intervalo = 320000;
const darkDefault = true;


// hooks allow us to create a map component as a function
export default function PointMap() {

  
  const [ID,setID] = useState(IDdefault);
  const [interval,setInterval] = useState(intervalo);
  const [totalPoints,setTotalPoints] = useState(totalpoints);
  const [sidebarOpen,setSidebarOpen] = useState(false);

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

  /* const punto = {
      type: "point ", // autocasts as new Point()
      x: -101.17,
      y: 21.78,
      z: 10010
    }; */
  
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
  /* var markersFuture=[]; */

  for (let i = 0; i < posiciones.length; i++) {
    markersPast[i]=[posiciones[i].lng,posiciones[i].lat,altitudes[i]*1000];
  }
  /* for (let i = Math.ceil(posiciones.length/2)+1; i < posiciones.length; i++) {
    markersFuture[i]=[posiciones[i].lng,posiciones[i].lat];
  } */


  var polylinePast = {
    type: "polyline", // autocasts as new Polyline()
    paths: [markersPast]
  };
  /* var polylineFuture = {
    type: "polyline", // autocasts as new Polyline()
    paths: [markersFuture]
  }; */

  var lineSymbolPast = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [255, 192, 49],
    width: 4
  };

 /*  var lineSymbolFuture = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [175, 175, 175],
    width: 4
  }; */


  
  const polylineGraphicJsonPast = {
    geometry: polylinePast,
    symbol: lineSymbolPast
  };
  /* const polylineGraphicJsonFuture = {
    geometry: polylineFuture,
    symbol: lineSymbolFuture
  }; */


  var map = {
    basemap: "dark-gray-vector",
    ground: "world-elevation"
  };
  const options = {
      view: {
        zoom: 2,
        center: [-101.17, 21.78],
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
            "paddingRight":'250px',
            "paddingLeft":'250px'
    })
    } else {return({
        height: '100vh',
        width: '100%',
        "paddingRight":'250px',
        "paddingLeft":'100px'
    })}
}

function styleMapTheme(dark) {
  if (dark){
  }
  else {
    map.basemap='satellite'
  }
}

  const [dark, setDark] = useState(true);
  const [ref,view] = useWebScene(map, options);
  
  


  // takes a view instance and graphic as a POJO
  // the point will be replaced if the lat/lng props change
  
  const graphics = [pointGraphicJson,polylineGraphicJsonPast , {geometry,symbol}];
  useGraphics(view, graphics);



  return( <>
  <InfoBoxPrint setID={setID} dark={dark} setInterval={setInterval} setTotalPoints={setTotalPoints} />
  <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>
  <div style={styleMap(sidebarOpen)} ref={ref} />
  </>
  )
}
