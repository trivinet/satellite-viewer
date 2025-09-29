import React, { useState, useEffect } from 'react';
import { useGraphics,useScene } from "esri-loader-hooks";
import InfoBoxPrint from '../components/infoBoxPrint';
import Sidebar from '../components/sidebar'
import assignTLE from '../components/assignTLE'
import Pos from '../components/trace';
import Altitude from '../components/altitude';
import styles from '../styles/Home.module.css';
import TimePoints from '../components/getTimes';
import { getMeanMotion } from 'tle.js';
import TLEinfo from '../components/TLEinfo';
import {lightGlobal, lngGlobal} from '../pages/_app'
import Language from '../components/language';

const IDdefault=25544;
const totalpoints = 100;
const intervalo = 50000;
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
  const [light, setLight] = useState(lightGlobal);
  const [lng, setLng] = useState(lngGlobal);
  const [center,setCenter] = useState(defaultCenter);
  const [mark,setMark] = useState('');
  const [viewMode,setViewMode] = useState('ECI');
  const [viewTrace, setViewTrace] = useState(true);
  const [tleInfoShow,setTleInfoShow] = useState(true);
  const [IDfam,setIDfam] = useState('');
  const [dismissedOnce, setDismissedOnce] = useState(false);

  // --- helpers to keep the 3D code safe (same idea as map.js) ---
const computePos = (tleString, points, intervalMs) => {
  try {
    if (!tleString || typeof tleString !== 'string') return null;
    const pos = Pos(tleString, points, intervalMs);
    if (!Array.isArray(pos) || pos.length === 0) return null;
    const p0 = pos[0];
    if (!Number.isFinite(p0?.lat) || !Number.isFinite(p0?.lng)) return null;
    return pos;
  } catch {
    return null;
  }
};
const safeAltitude = (tleString, i, offset, lat, lng) => {
  try {
    const v = Altitude(tleString, interval, offset, lat, lng);
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
};

// Error collection for this render (we'll de-dupe below)
let tleErrorIds = [];
let graphics = [];


  var environment = [];
  var basemap = [];

  !light ?  environment = {
    lighting: {
      // enable shadows for all the objects in a scene
      directShadowsEnabled: false,
      // set the date and a time of the day for the current camera location
      //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
    }  
  } : environment = {
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
  }
  !light ? basemap = "dark-gray-vector" : 'satellite';


  /* const [environment,setEnvironment] = useState(dark ? {
        lighting: {
          // enable shadows for all the objects in a scene
          directShadowsEnabled: false,
          // set the date and a time of the day for the current camera location
          //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
        }  
      } : {
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
      });
      const [basemap,setBasemap] = useState(dark ? "dark-gray-vector" : 'satellite'); */

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
    if(selectedFam){tleInfoCont=(<TLEinfo ID={IDfam} light={light} lng={lng}></TLEinfo>);}else{
    tleInfoCont=(<TLEinfo ID={ID} light={light} lng={lng}></TLEinfo>);
    }
  }else{tleInfoCont=[]}

    if (selectedFam) {
    // family cloud (one point per ID)
      for (let i = 0; i < ID.length; i++) {
        const tle = assignTLE(ID[i]);
        const pos = computePos(tle, 1, interval);
        if (!pos) { tleErrorIds.push(ID[i]); continue; }
        const p0 = pos[0];
        const h  = safeAltitude(tle, 0, 0, p0.lat, p0.lng) ?? 0;

        const geometry     = { type:'point', x:p0.lng, y:p0.lat, z:h*1000 };
        const polylineVert = { type:'polyline', paths:[[p0.lng,p0.lat,0],[p0.lng,p0.lat,h*1000]] };
        const lineSymbolVert = { type:'simple-line', color:[153,153,153,0.46], width:1 };
        const symbolPoint    = { type:'picture-marker', width:6, height:6, color:[208,208,208,0.6] };

        graphics.push({ geometry: polylineVert, symbol: lineSymbolVert }, { geometry, symbol: symbolPoint });
      }

      // highlighted member trace
      if (mark) {
        const tle = assignTLE(mark);
        const posiciones = computePos(tle, totalPoints, interval);
        if (!posiciones) { tleErrorIds.push(mark); }
        else {
          const tiempos   = TimePoints(totalPoints, interval);
          const mid       = Math.ceil(posiciones.length/2);
          const altitudes = posiciones.map((p, idx) =>
            safeAltitude(tle, idx, idx - mid, p.lat, p.lng) ?? 0
          );

          const markersPast   = posiciones.map((p, i) => [p.lng, p.lat, altitudes[i]*1000]);
          const periodoSat    = periodoTierra / getMeanMotion(tle);
          const ptosPeriodo   = Math.ceil(periodoSat/interval);
          const eciCount      = Math.min(ptosPeriodo, totalPoints);
          const half          = Math.floor(eciCount/2);

          const markersEciPast = [];
          for (let j = 0; j < eciCount; j++) {
            const k = j + mid - half;
            markersEciPast.push([
              posiciones[k].lng + velAngTierra * (tiempos[k] - tiempos[mid]),
              posiciones[k].lat,
              altitudes[k] * 1000
            ]);
          }
          const markersFuture = posiciones.map(p => [p.lng, p.lat, 10000]);

          const polylinePast     = { type:'polyline', paths:[markersPast] };
          const polylineEciPast  = { type:'polyline', paths:[markersEciPast] };
          const polylineFuture   = { type:'polyline', paths:[markersFuture] };
          const lineSymbolPast   = { type:'simple-line', color:[250,114,104,0.28], width:2 };
          const lineSymbolEci    = { type:'simple-line', color:[198,35,104,0.58], width:2 };
          const lineSymbolFuture = { type:'simple-line', color:[175,175,175,0.5], width:1 };

          const midGeom = { type:'point', x:posiciones[mid].lng, y:posiciones[mid].lat, z:altitudes[mid]*1000 };
          const vertLine = { type:'polyline', paths:[[midGeom.x, midGeom.y, 0],[midGeom.x, midGeom.y, midGeom.z]] };
          const vertSym  = { type:'simple-line', color:[250,143,223,0.7], width:1.5 };
          const dotSym   = { type:'picture-marker', width:8, height:8, color:[250,143,223,0.9] };

          if (viewMode === 'ECEF') {
            graphics.push({geometry:vertLine, symbol:vertSym},
                          {geometry:polylinePast, symbol:lineSymbolPast},
                          {geometry:midGeom, symbol:dotSym});
            if (viewTrace) graphics.push({geometry:polylineFuture, symbol:lineSymbolFuture});
          } else if (viewMode === 'ECI') {
            graphics.push({geometry:vertLine, symbol:vertSym},
                          {geometry:polylineEciPast, symbol:lineSymbolEci},
                          {geometry:midGeom, symbol:dotSym});
          } else { // BOTH
            graphics.push({geometry:vertLine, symbol:vertSym},
                          {geometry:polylinePast, symbol:lineSymbolPast},
                          {geometry:midGeom, symbol:dotSym});
            if (viewTrace) graphics.push({geometry:polylineFuture, symbol:lineSymbolFuture});
            graphics.push({geometry:polylineEciPast, symbol:lineSymbolEci});
          }
        }
      }

    }else {
      // single ID
      const tle = assignTLE(ID);
      const posiciones = computePos(tle, totalPoints, interval);
      if (!posiciones) { tleErrorIds.push(ID); }
      else {
        const tiempos   = TimePoints(totalPoints, interval);
        const mid       = Math.ceil(posiciones.length/2);
        const altitudes = posiciones.map((p, idx) =>
          safeAltitude(tle, idx, idx - mid, p.lat, p.lng) ?? 0
        );

        const geometry     = { type:'point', x:posiciones[mid].lng, y:posiciones[mid].lat, z:altitudes[mid]*1000 };
        const vertLine     = { type:'polyline', paths:[[geometry.x, geometry.y, 0],[geometry.x, geometry.y, geometry.z]] };
        const vertSym      = { type:'simple-line', color:[153,153,153,0.46], width:1 };
        const pointSym     = { type:'picture-marker', src:"https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png", width:6, height:6, color:[208,208,208,0.6] };

        const markersPast  = posiciones.map((p, i) => [p.lng, p.lat, altitudes[i]*1000]);

        const periodoSat   = periodoTierra / getMeanMotion(tle);
        const ptosPeriodo  = Math.ceil(periodoSat/interval);
        const eciCount     = Math.min(ptosPeriodo, totalPoints);
        const half         = Math.floor(eciCount/2);

        const markersEciPast = [];
        for (let j = 0; j < eciCount; j++) {
          const k = j + mid - half;
          markersEciPast.push([
            posiciones[k].lng + velAngTierra * (tiempos[k] - tiempos[mid]),
            posiciones[k].lat,
            altitudes[k] * 1000
          ]);
        }
        const markersFuture = posiciones.map(p => [p.lng, p.lat, 10000]);

        const polylinePast     = { type:'polyline', paths:[markersPast] };
        const polylineEciPast  = { type:'polyline', paths:[markersEciPast] };
        const polylineFuture   = { type:'polyline', paths:[markersFuture] };
        const lineSymbolPast   = { type:'simple-line', color:[250,114,104,0.28], width:2 };
        const lineSymbolEci    = { type:'simple-line', color:[198,35,104,0.58], width:2 };
        const lineSymbolFuture = { type:'simple-line', color:[175,175,175,0.5], width:1 };

        if (viewMode === 'ECEF') {
          graphics.push({geometry:vertLine, symbol:vertSym},
                        {geometry:polylinePast, symbol:lineSymbolPast},
                        {geometry, symbol:pointSym});
          if (viewTrace) graphics.push({geometry:polylineFuture, symbol:lineSymbolFuture});
        } else if (viewMode === 'ECI') {
          graphics.push({geometry:vertLine, symbol:vertSym},
                        {geometry:polylineEciPast, symbol:lineSymbolEci},
                        {geometry, symbol:pointSym});
        } else { // BOTH
          graphics.push({geometry:vertLine, symbol:vertSym},
                        {geometry:polylinePast, symbol:lineSymbolPast},
                        {geometry, symbol:pointSym});
          if (viewTrace) graphics.push({geometry:polylineFuture, symbol:lineSymbolFuture});
          graphics.push({geometry:polylineEciPast, symbol:lineSymbolEci});
        }
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
    if(!light){
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
    if (!view) return;
    if (view.center !== center) {
      view.center = [center[1] + 3, center[0] + 3, 10000]; // simple Z fallback
    }
  }, [center, view]);


  

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
  
  useEffect(() => {
    lightGlobal = light;
  }, [light]);

  useEffect(() => {
    lngGlobal = lng;
  }, [lng]);
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
  
  const uniqueErrIds = React.useMemo(
    () => Array.from(new Set(tleErrorIds)),
    [selectedFam, ID, IDfam, mark, totalPoints, interval]
  );
  const showTleError = uniqueErrIds.length > 0 && !dismissedOnce;

  useGraphics(view, graphics);


  return( <>
  <InfoBoxPrint setID={setID} light={light} setInterval={setInterval} setTotalPoints={setTotalPoints} setSelectedFam={setSelectedFam} 
  setCenter={setCenter} setMark={setMark} setViewMode={setViewMode} setViewTrace={setViewTrace} setTleInfoShow={setTleInfoShow} 
  setIDfam={setIDfam} lng={lng}/>
  <Language setLng={setLng}></Language>
  <Sidebar setLight={setLight} setSidebarOpen={setSidebarOpen}  lng={lng}/>
  {tleInfoCont}
  { showTleError && (
    <div
        className={`${styles.tleBanner} ${light ? styles.tleBannerLight : styles.tleBannerDark}`}
        role="status"
        aria-live="polite"
    >
        <div className={styles.tleBannerHeader}>
        <span className={styles.tleDot} />
        <strong>
            {lng === 'ESP' ? 'TLE no disponible' : 'TLE not available'}
        </strong>
        <button
            type="button"
            className={styles.tleBannerClose}
            aria-label={lng === 'ESP' ? 'Cerrar' : 'Close'}
            onClick={() => setDismissedOnce(true)}>
            ×
        </button>
        </div>

        <div className={styles.tleBannerBody}>
        {lng === 'ESP'
            ? 'No se pudo calcular la órbita para:'
            : 'Could not compute orbit for:'}
        {' '}
        <details>
            <summary className={styles.tleSummary}>
            {uniqueErrIds.length}{' '}
            {lng === 'ESP' ? 'elemento(s)' : 'item(s)'}
            </summary>
            <div className={styles.tleList}>
            {uniqueErrIds.join(', ')}
            </div>
        </details>
        </div>
    </div>
    )}
  <div style={styleMap()} ref={ref}></div>
  </>
  )
}
