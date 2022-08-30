import React, { useState, useEffect } from 'react';
import { useMap, useGraphics,useWebScene,useScene,useEvents } from "esri-loader-hooks";
import InfoBoxPrint from '../components/infoBoxPrint';
import Sidebar from '../components/sidebar'
import {pointGraphicJson,polygonGraphicJson} from "./graphics";
import assignTLE from './assignTLE'
import Pos from './trace';
import Altitude from './altitude';
import styles from '../styles/Home.module.css';


const IDdefault=25544;
const totalpoints = 100;
const intervalo = 50000;
const darkDefault = true;
const defaultCenter = [-101.17, 21.78];


// hooks allow us to create a map component as a function
export default function PointMap() {

  
  const [ID,setID] = useState(IDdefault);
  const [interval,setInterval] = useState(intervalo);
  const [totalPoints,setTotalPoints] = useState(totalpoints);
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [selectedFam, setSelectedFam] = useState(false);
  const [dark, setDark] = useState(true);
  const [center,setCenter] = useState(defaultCenter);
  const [mark,setMark] = useState('');

  
  if(selectedFam){

  var tle =[];
  var posiciones =[];
  var geometry = [];
  var vertLine = [];
  var polylineVert=[];
  var lineSymbolVert=[];
  var polylineGraphicJsonVert=[];
  var symbol=[];
  var markersPast=[]; //órbita
  var markersFuture=[]; //traza
  var polylinePast=[]; 
  var polylineFuture=[];
  var lineSymbolPast=[];
  var lineSymbolFuture=[];
  var polylineGraphicJsonPast=[];
  var polylineGraphicJsonFuture=[];
  var graphics=[];
  var altitudes=[];
  var polylineVertSaved=[];
  var polylineFutureSaved=[];
  var polylinePastSaved=[];
  var geometrySaved=[];

  
  symbol = {
    type: "picture-marker", // autocasts as new PictureMarkerSymbol()
    url: /* "https://cdn-icons-png.flaticon.com/512/1042/1042820.png", */
    /* "https://www.pngall.com/wp-content/uploads/2016/04/Satellite-PNG-File.png" , */
    "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
    width: 28,
    height: 28
  };  
  console.log(ID.length)
  for (let i = 0; i < ID.length; i++) {
 
  tle = assignTLE(ID[i]);
  if (tle!=''){
  posiciones = Pos(tle,totalPoints,interval);
  if (posiciones!=''){

  for (let j = 0; j < posiciones.length; j++) {
    altitudes.push(Altitude(tle,interval,j-Math.ceil(posiciones.length/2),posiciones[j].lat,posiciones[j].lng));
  }
  
  geometry={
        type: 'point', // autocasts as new Point()
        x: posiciones[Math.ceil(posiciones.length/2)].lng,
        y: posiciones[Math.ceil(posiciones.length/2)].lat,
        z: altitudes[Math.ceil(posiciones.length/2)]*1000
        };   
  
  vertLine =[[posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,0],
    [posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,altitudes[Math.ceil(posiciones.length/2)]*1000]];

  polylineVert = {
    type: "polyline", // autocasts as new Polyline()
    paths: vertLine
  };
      
  lineSymbolVert = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [160, 250, 124,0.98]/* [234, 128, 208,0.5] */,
    width: 1
  };

  polylineGraphicJsonVert = {
    geometry: polylineVert,
    symbol: lineSymbolVert
  };

   graphics.push(polylineGraphicJsonVert,/* pointGraphicJson ,*//* polylineGraphicJsonPast  ,*/ {geometry , symbol}/*, polylineGraphicJsonFuture */);

  }
  }
  }
  if (mark!=''){

    var posiciones = Pos(assignTLE(mark),totalPoints,interval);
    var altitudes=[];
    var markersPast=[];
    var markersFuture=[];
    
    if (posiciones!=''){
    for (let j = 0; j < posiciones.length; j++) {
      altitudes.push(Altitude(assignTLE(mark),interval,j-Math.ceil(posiciones.length/2),posiciones[j].lat,posiciones[j].lng));
    }
    
    for (let j = 0; j < posiciones.length; j++) {
      markersPast[j]=[posiciones[j].lng,posiciones[j].lat,altitudes[j]*1000];
    }
    for (let j = 0; j < posiciones.length; j++) {
      markersFuture[j]=[posiciones[j].lng,posiciones[j].lat,10000];
    }


    polylinePast = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersPast]
    };

    polylineFuture = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersFuture]
    };

    lineSymbolPast = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [156,152,247]/* [255, 192, 49,0.5] */,
      width: 1
    };

    lineSymbolFuture = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [175, 175, 175,0.5],
      width: 1
    };

    polylineGraphicJsonPast = {
      geometry: polylinePast,
      symbol: lineSymbolPast
    };
    polylineGraphicJsonFuture = {
      geometry: polylineFuture,
      symbol: lineSymbolFuture
    };

    geometry={
      type: 'point', // autocasts as new Point()
      x: posiciones[Math.ceil(posiciones.length/2)].lng,
      y: posiciones[Math.ceil(posiciones.length/2)].lat,
      z: altitudes[Math.ceil(posiciones.length/2)]*1000
    }; 

    symbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      url: /* "https://cdn-icons-png.flaticon.com/512/1042/1042820.png", */
      /* "https://www.pngall.com/wp-content/uploads/2016/04/Satellite-PNG-File.png" , */
      "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
      width: 28,
      height: 28,
      color:'red'
    };  
      
    vertLine =[[posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,0],
    [posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,altitudes[Math.ceil(posiciones.length/2)]*1000]];

    polylineVert = {
      type: "polyline", // autocasts as new Polyline()
      paths: vertLine
    };
      
    lineSymbolVert = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [245, 189, 34,0.96],
      width: 4
    };

    polylineGraphicJsonVert = {
      geometry: polylineVert,
      symbol: lineSymbolVert
    };

    graphics.push(polylineGraphicJsonVert,polylineGraphicJsonPast,{geometry , symbol}, polylineGraphicJsonFuture );

  }}
  }else{
  var tle = assignTLE(ID);
  var posiciones = Pos(tle,totalPoints,interval);
  var altitudes=[];
    for (let i = 0; i < posiciones.length; i++) {
      altitudes.push(Altitude(tle,interval,i-Math.ceil(posiciones.length/2),posiciones[i].lat,posiciones[i].lng));
    }
  
    var geometry = {
          type: 'point', // autocasts as new Point()
          x: posiciones[Math.ceil(posiciones.length/2)].lng,
          y: posiciones[Math.ceil(posiciones.length/2)].lat,
          z: altitudes[Math.ceil(posiciones.length/2)]*1000
          } ;   
    
    var vertLine =[[posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,0],
      [posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,altitudes[Math.ceil(posiciones.length/2)]*1000]];
  
    var polylineVert = {
      type: "polyline", // autocasts as new Polyline()
      paths: [vertLine]
    };
        
    var lineSymbolVert = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [234, 128, 208,0.5],
      width: 4
    };
    var polylineGraphicJsonVert = {
      geometry: polylineVert,
      symbol: lineSymbolVert
    };
  
      var symbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      url: /* './Satellite-png-hd.png', */
      /* "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuhmFmxNIb5gqkSUZMivYIQj2tcy361W3AsA&usqp=CAU", */
      /* "https://cdn-icons-png.flaticon.com/512/1042/1042820.png", */
      /* "https://www.pngall.com/wp-content/uploads/2016/04/Satellite-PNG-File.png" , */
       "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
      /* "https://aios.global/wp-content/uploads/2020/06/sattelite.png", */
      width: 28,
      height: 28
    }; 
  
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
    var polylineFuture = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersFuture]
    };
  
    var lineSymbolPast = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [234, 128, 208,0.5]/* [255, 192, 49,0.5] */,
      width: 4
    };
  
    var lineSymbolFuture = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [175, 175, 175,0.5],
      width: 4
    };
  
  
    
    var polylineGraphicJsonPast = {
      geometry: polylinePast,
      symbol: lineSymbolPast
    };
    var polylineGraphicJsonFuture = {
      geometry: polylineFuture,
      symbol: lineSymbolFuture
    };
    var graphics = [polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonFuture];
  }

  


  var map = {
    basemap: (dark)?("dark-gray-vector"):("satellite"),
    ground: "world-elevation",
  };
  const options = {
      view:{
        constraints: {
          altitude: {
            max: 12000000000 // meters
          }
      }
      },
        zoom: 3,
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
        }
        
  };

  function styleMap(sidebarOpen) {
        return({
            height: '100vh',
            width: '100%',
            background:'black',
            padding:{
              right:0},
            margin:0,
            'overflowY':'hidden'
    })
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
  

  useGraphics(view, graphics);


  return( <>
  <InfoBoxPrint setID={setID} dark={dark} setInterval={setInterval} setTotalPoints={setTotalPoints} setSelectedFam={setSelectedFam} setCenter={setCenter} setMark={setMark}/>
  <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>

  <div style={styleMap(sidebarOpen)} ref={ref}></div>
  </>
  )
}
