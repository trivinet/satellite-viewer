import React, { useState, useEffect } from 'react';
import { useMap, useGraphics,useWebScene,useScene,useEvents } from "esri-loader-hooks";
import InfoBoxPrint from '../components/infoBoxPrint';
import Sidebar from '../components/sidebar'
import {pointGraphicJson,polygonGraphicJson} from "./graphics";
import assignTLE from './assignTLE'
import Pos from './trace';
import Altitude from './altitude';
import styles from '../styles/Home.module.css';
import TimePoints from './getTimes';
import { getMeanMotion } from 'tle.js';
import TLEinfo from '../components/TLEinfo';


const IDdefault=25544;
const totalpoints = 100;
const intervalo = 50000;
const darkDefault = true;
const defaultCenter = [0, 0];
const velAngTierra = 9/2154100 ; //º/ms
const periodoTierra = (23*60*60+56*60+4)*1000 ; //período tierra en ms


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
  const [viewMode,setViewMode] = useState('ECI');
  const [viewTrace, setViewTrace] = useState(true);
  const [tleInfoShow,setTleInfoShow] = useState(true);
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

  var tleInfoCont=[];

  /* if(dark){setBasemap('dark-gray-vector')
setEnvironment({
  lighting: {
    // enable shadows for all the objects in a scene
    directShadowsEnabled: false,
    // set the date and a time of the day for the current camera location
    //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
  }  
})}else{setBasemap('satellite')
setEnvironment({
  background: {
    type: "color",
    color: [255, 252, 244, 1]
  },
  lighting: {
    // enable shadows for all the objects in a scene
    directShadowsEnabled: false,
    // set the date and a time of the day for the current camera location
    //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
  }  
})} */

  if(tleInfoShow){
    if(selectedFam){tleInfoCont=(<TLEinfo ID={IDfam} ></TLEinfo>);}else{
    tleInfoCont=(<TLEinfo ID={ID} ></TLEinfo>);
    }
  }else{tleInfoCont=[]}

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

  
  
  var symbol = {
    type: "picture-marker", // autocasts as new PictureMarkerSymbol()
    width: 6,
    height: 6,
  
    color:[208, 208, 208,0.6],
  }; 


  for (let i = 0; i < ID.length; i++) {
 
  tle = assignTLE(ID[i]);
  if (tle!=''){
  posiciones = Pos(tle,0.5,0);
  if (posiciones!=''){

  
  altitudes.push(Altitude(tle,interval,0,posiciones[0].lat,posiciones[0].lng));
  
  geometry={
        type: 'point', // autocasts as new Point()
        x: posiciones[Math.ceil(posiciones.length/2)].lng,
        y: posiciones[Math.ceil(posiciones.length/2)].lat,
        z: altitudes[i]*1000
        };   
  
  vertLine =[[posiciones[0].lng,posiciones[0].lat,0],
    [posiciones[0].lng,posiciones[0].lat,altitudes[i]*1000]];

  polylineVert = {
    type: "polyline", // autocasts as new Polyline()
    paths: vertLine
  };
      
  lineSymbolVert = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [153, 153, 153,0.46],
      width: 1
    /*  [160, 250, 124,0.98] [234, 128, 208,0.5]*/
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

    var tle = assignTLE(mark);
    var posiciones = Pos(tle,totalPoints,interval);
    var tiempos = TimePoints(totalPoints, interval);
    var altitudes=[];
    var markersPast=[];
    var markersFuture=[];
    var markersEciPast=[];
    
    if (posiciones!=''){
    for (let j = 0; j < posiciones.length; j++) {
      altitudes.push(Altitude(tle,interval,j-Math.ceil(posiciones.length/2),posiciones[j].lat,posiciones[j].lng));
    }
    
    for (let j = 0; j < posiciones.length; j++) {
      markersPast[j]=[posiciones[j].lng,posiciones[j].lat,altitudes[j]*1000];
    }

    var periodoSat = periodoTierra/(getMeanMotion(tle));
    
    var ptosPeriodo = Math.ceil(periodoSat/interval);

    for (let j = 0; j < Math.min(ptosPeriodo,totalPoints); j++){
      markersEciPast[j] = [posiciones[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)].lng+velAngTierra*(tiempos[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)]-tiempos[Math.floor(tiempos.length/2)]),posiciones[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)].lat,altitudes[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)]*1000];
    }

    for (let j = 0; j < posiciones.length; j++) {
      markersFuture[j]=[posiciones[j].lng,posiciones[j].lat,10000];
    }


    polylinePast = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersPast]
    };

    polylineEciPast = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersEciPast]
    };

    polylineFuture = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersFuture]
    };

    lineSymbolPast = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [250,114,104,0.28],/* [234, 128, 208,0.5] *//* [255, 192, 49,0.5] */
      width: 2
      /* color: [156,152,247] [255, 192, 49,0.5] ,
      width: 1 */
    };

    lineSymbolEciPast = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [198,35,104,0.58],/* [255, 192, 49,0.5] */
      width: 2 
      /* color: [255, 192, 49,0.5],
      width: 1 */
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
    polylineGraphicJsonEciPast = {
      geometry: polylineEciPast,
      symbol: lineSymbolEciPast
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

    /* symbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      url:  "https://cdn-icons-png.flaticon.com/512/1042/1042820.png", 
      "https://www.pngall.com/wp-content/uploads/2016/04/Satellite-PNG-File.png" , 
      "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
      width: 28,
      height: 28,
      color:'red'
    };  */ 
    var symbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      
      width: 8,
      height: 8,
    
      color:[250,143,223,0.9]/* [208, 208, 208,0.6] */
    }; 
  
      
    vertLine =[[posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,0],
    [posiciones[Math.ceil(posiciones.length/2)].lng,posiciones[Math.ceil(posiciones.length/2)].lat,altitudes[Math.ceil(posiciones.length/2)]*1000]];

    polylineVert = {
      type: "polyline", // autocasts as new Polyline()
      paths: vertLine
    };
      
    lineSymbolVert = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [250,143,223,0.7],/* [245, 189, 34,0.96] */
      width: 1.5
    };

    polylineGraphicJsonVert = {
      geometry: polylineVert,
      symbol: lineSymbolVert
    };


    switch (viewMode) {
      case 'ECEF':
        if (viewTrace) {graphics.push(polylineGraphicJsonVert,polylineGraphicJsonPast,{geometry , symbol}, polylineGraphicJsonFuture )
      } else {graphics.push(polylineGraphicJsonVert,polylineGraphicJsonPast,{geometry , symbol} )}
      break;
      case 'ECI':
        graphics.push(polylineGraphicJsonVert,polylineGraphicJsonEciPast , {geometry,symbol})
      break;
      case 'BOTH':
        if (viewTrace) {graphics.push(polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonFuture,polylineGraphicJsonEciPast)
      } else {graphics.push(polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonEciPast)}
      break;
      default:
        var graphics = [polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonFuture, polylineGraphicJsonEciPast];
}
  

  }}
  }else{

  var tle = assignTLE(ID);
  var posiciones = Pos(tle,totalPoints,interval);
  var tiempos = TimePoints(totalPoints, interval);
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
      color: [153, 153, 153,0.46],
      width: 1
    };
    var polylineGraphicJsonVert = {
      geometry: polylineVert,
      symbol: lineSymbolVert
    };
  
      var symbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      src: /* "https://thumbs.files.fm/thumb_show.php?i=j3yw6egm2&view", */
      /* "https://thumbs.files.fm/thumb_show.php?i=455mh9fyf&view", */ /* './Satellite-png-hd.png', */
      /* "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuhmFmxNIb5gqkSUZMivYIQj2tcy361W3AsA&usqp=CAU", */
      /* "https://cdn-icons-png.flaticon.com/512/1042/1042820.png", */
      /* "https://www.pngall.com/wp-content/uploads/2016/04/Satellite-PNG-File.png" , */
       "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
      /* "https://aios.global/wp-content/uploads/2020/06/sattelite.png", */
      width: 6,
      height: 6,
      
      /* color:'white', */
      /* opacity: '0.7', */
    
      color:[208, 208, 208,0.6],
    }; 
  
    var markersPast=[];
    var markersFuture=[]; 
    var markersEciPast=[];
  
    for (let i = 0; i < posiciones.length; i++) {
      markersPast[i]=[posiciones[i].lng,posiciones[i].lat,altitudes[i]*1000];
      }

      var periodoSat = periodoTierra/(getMeanMotion(tle));

    var ptosPeriodo = Math.ceil(periodoSat/interval);

    for (let j = 0; j < Math.min(ptosPeriodo,totalPoints); j++){
      markersEciPast[j] = [posiciones[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)].lng+velAngTierra*(tiempos[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)]-tiempos[Math.floor(tiempos.length/2)]),posiciones[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)].lat,altitudes[j+totalPoints/2-Math.floor(Math.min(ptosPeriodo,totalPoints)/2)]*1000];
    }

    var polylinePast = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersPast]
    };

    var lineSymbolPast = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [250,114,104,0.28],/* [234, 128, 208,0.5] *//* [255, 192, 49,0.5] */
      width: 2
    };

    var polylineGraphicJsonPast = {
      geometry: polylinePast,
      symbol: lineSymbolPast
    };
    


    var polylineEciPast = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersEciPast]
    };
  
    var lineSymbolEciPast = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [198,35,104,0.58],/* [255, 192, 49,0.5] */
      width: 2 
    };
  
    var polylineGraphicJsonEciPast = {
      geometry: polylineEciPast,
      symbol: lineSymbolEciPast
    };

    /* let template = {
      // autocasts as new PopupTemplate()
      title: "Joselito",
      content: "Launch number of",
       actions: [
        {
          // Create a popup action to display the satellite track.
          title: "Show Satellite Track",
          id: "track",
          className: "esri-icon-globe"
        }
      ]
    };

    let punto = {
      geometry: geometry,
      symbol: {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
         url: "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png", 
        width: 48,
        height: 48
      },
      attributes: {
        name: 'commonName',
        jose: 'eljose'
        year: fullLaunchYear,
        id: noradId,
        number: launchNum,
        time: time,
        line1: line1,
        line2: line2
      },
      popupTemplate: template
    }; */

    
    for (let i = 0; i < posiciones.length; i++) {
      markersFuture[i]=[posiciones[i].lng,posiciones[i].lat,10000];
    }
    
    var polylineFuture = {
      type: "polyline", // autocasts as new Polyline()
      paths: [markersFuture]
    };

    var lineSymbolFuture = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [175, 175, 175,0.5],
      width: 1
    };

    var polylineGraphicJsonFuture = {
      geometry: polylineFuture,
      symbol: lineSymbolFuture
    };

    switch (viewMode) {
      case 'ECEF':
        if (viewTrace) {var graphics = [polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonFuture]
      } else {var graphics = [polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol}];}
      break;
      case 'ECI':
        var graphics = [polylineGraphicJsonVert,polylineGraphicJsonEciPast ,/*  punto, */{geometry,symbol}]
      break;
      case 'BOTH':
        if (viewTrace) {var graphics = [polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonFuture,polylineGraphicJsonEciPast]
      } else {var graphics = [polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonEciPast];}
      break;
      default:
        var graphics = [polylineGraphicJsonVert,polylineGraphicJsonPast , {geometry,symbol},polylineGraphicJsonFuture, polylineGraphicJsonEciPast];
}

    

  }

  var map = {
    basemap: "dark-gray-vector",
    ground: "world-elevation",
  };/* ):(map = {
    basemap: "satellite",
    ground: "world-elevation",
  }); */

   

  var options={
    view: {
      center:defaultCenter,
      zoom: 2,
      ui: {
        components:['attribution']
      },
      popup: {
        dockEnabled: true,
        /* 
        right:'10px',
        top:'10px', */
        dockOptions: {
          buttonEnabled: false,
        breakpoint: true,
        position:"top-right"
        },
      defaultPopupTemplateEnabled: true
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
    },
    popup: {
      dockEnabled: true,
      /* 
      right:'10px',
      top:'10px', */
      dockOptions: {
        buttonEnabled: false,
      breakpoint: true,
      position:"top-right"
      },
    defaultPopupTemplateEnabled: true
    },
    environment:{
      
      lighting: {
        // enable shadows for all the objects in a scene
        directShadowsEnabled: false,
        // set the date and a time of the day for the current camera location
        //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
      }  
    }
}/* ):(options = {
  view: {
    center:defaultCenter,
    zoom: 2,
    ui: {
      components:['attribution']
    },
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
      breakpoint: true,
      position:"top-right"
      },
    defaultPopupTemplateEnabled: true
    },
    environment:{
      background: {
        type: "color",
        color: [255, 252, 244, 1]
      },
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
  },
  popup: {
    dockEnabled: true,
    dockOptions: {
      buttonEnabled: false,
    breakpoint: true,
    position:"top-right"
    },
  defaultPopupTemplateEnabled: true
  },
  environment:{
    lighting: {
      // enable shadows for all the objects in a scene
      directShadowsEnabled: false,
      // set the date and a time of the day for the current camera location
      //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
    }  
  }
}) */

  

  function styleMap() {
    if(dark){
      return({
      height: '100vh',
      width: '100%',
      background:'black',
      padding:{
        right:0},
      margin:0,
      'overflowY':'hidden'
})}else{return({
  height: '100vh',
  width: '100%',
  background:'#FFFCF4',
  padding:{
    right:0},
  margin:0,
  'overflowY':'hidden',
  color:'#FFFCF4'
})}}



  

    /* useEffect(() => {
      if (!ref) {
        // view hasn't been created yet
        return;
      }
      if (ref.basemap!=basemap) {
        
        ref.basemap = basemap;
        
      }
    }, [basemap]); */

  
  const [ref,view] = useScene(map, options);

  useEffect(() => {
    if (!view) {
      // view hasn't been created yet
      return;
    }
    if (view.center !== center) {
      // zoom prop has changed, update view
      /* console.log(center[1],center[0]) */
      view.center = [center[1]+3,center[0]+3,altitudes[Math.ceil(posiciones.length/2)]*1000];
      /* view.zoom = 3; */
      /* console.log(view) */
    }
  }, [center]);


  

  useEffect(() => {
    if (!view) {
      // view hasn't been created yet
      return;
    }
    if (view.environment!=environment) {
      // zoom prop has changed, update view
      /* console.log(center[1],center[0]) */
      view.environment=environment;
      /* view.zoom = 3; */
      /* console.log(view) */
    }
  }, [environment]);
  


  /* useEffect(() => {
    if (!view) {
      // view hasn't been created yet
      return;
    }
    if (view.zoom !== Math.round(zoom, 0)) {
      // zoom prop has changed, update view
      view.zoom = zoom;
    }
  }, [zoom, view]); */
  // takes a view instance and graphic as a POJO
  // the point will be replaced if the lat/lng props change
  

  useGraphics(view, graphics);


  return( <>
  <InfoBoxPrint setID={setID} dark={dark} setInterval={setInterval} setTotalPoints={setTotalPoints} setSelectedFam={setSelectedFam} setCenter={setCenter} setMark={setMark} setViewMode={setViewMode} setViewTrace={setViewTrace} setTleInfoShow={setTleInfoShow} setIDfam={setIDfam}/>
  <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen} setBasemap={setBasemap} setEnvironment={setEnvironment}/>
  {tleInfoCont}
  <div style={styleMap()} ref={ref}></div>
  </>
  )
}
