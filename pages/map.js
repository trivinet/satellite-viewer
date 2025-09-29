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
import Language from '../components/language';
import { getSatelliteInfo,getLatLngObj } from 'tle.js';
import TLEinfo from '../components/TLEinfo';
import {lightGlobal, lngGlobal} from '../pages/_app'
  
const totalpoints = 200;
const intervalo = 50000;
const IDdefault=25544;
const defaultCenter = [38,-5];


export default function SimpleMap(){

    const [ID,setID] = useState('');
    const [lng,setLng] = useState(lngGlobal);
    const [light,setLight] = useState(lightGlobal);
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
    const [familyTipContent, setFamilyTipContent] = useState(null);
    const [pastTipContent, setPastTipContent] = useState(null);
    const [markTipContent, setMarkTipContent] = useState(null);
    const [futureTipContent, setFutureTipContent] = useState(null);


    useEffect(() => { lightGlobal = light;}, [light]);
    useEffect(() => { lngGlobal = lng;}, [lng]);

    const nowTs = Date.now();

    const computeTrace = (tleString, points, intervalMs) => {
    try {
        if (!tleString || typeof tleString !== 'string') return null;
        const pos = Pos(tleString, points, intervalMs);
        if (!Array.isArray(pos) || pos.length === 0) return null;
        // basic sanity on first point
        const p0 = pos[0];
        if (!isFinite(p0?.lat) || !isFinite(p0?.lng)) return null;

        const times = TimePoints(points, intervalMs);
        return { pos, times };
    } catch (e) {
        // console.warn('computeTrace failed', e);
        return null;
    }
    };

    const safeSatInfo = (tleString, ts, lat, lng) => {
    try {
        return getSatelliteInfo(tleString, ts, lat, lng, 0);
    } catch {
        return null;
    }
    };

    var tleInfoCont=[];
    let tleErrorIds = [];

  if(tleInfoShow){
    if(selectedFam){tleInfoCont=(<TLEinfo ID={IDfam} light={light} lng={lng}></TLEinfo>);}else{
    tleInfoCont=(<TLEinfo ID={ID} light={light} lng={lng}></TLEinfo>);
    }
  }else{tleInfoCont=[]}

  
  //marker
  const AnyReactComponent = () => <div className={styles.marker}><p></p></div>;
  //traza futuro
  const AnyReactComponentTraceFamily = ({ text, info, number, ID2 }) => (
    <div
        onClick={() => {
        setMark(ID2.toString());
        setTotalPoints(totalpoints);
        setIDfam(ID2.toString());
        setTleInfoShow(true);
        }}
        className={styles.markerTraceFamily}
        onMouseEnter={() => {
        setFamilyTipContent(info);
        // IMPORTANT for react-tooltip v3: bind to dynamically added anchors
        ReactTooltip.rebuild();
        }}
        onMouseLeave={() => {
        setPastTipContent?.(null);   // or the matching setter for that marker
        setMarkTipContent?.(null);
        setFutureTipContent?.(null);
        setFamilyTipContent?.(null);
        ReactTooltip.hide();         // <= key line: hide any visible tooltip
        }}

    >
        {/* all family markers point to the same shared tooltip id */}
        <p data-tip data-for="markerTooltipFamily">{text}</p>
    </div>
    );
  const AnyReactComponentTraceIDFam = ({ text,info,number }) => <div className={styles.markerTraceIDFam}><p data-tip data-for={"markerTooltip"+number}>{text}</p>
    <ReactTooltip id={"markerTooltip"+number} html={true}>{info}</ReactTooltip></div>;
  //traza pasado
  const AnyReactComponentTracePast = ({ text, info, number }) => (
  <div className={styles.markerTracePast}
       onMouseEnter={() => { setPastTipContent(info); ReactTooltip.rebuild(); }}
       onMouseLeave={() => {
        setPastTipContent?.(null);   // or the matching setter for that marker
        setMarkTipContent?.(null);
        setFutureTipContent?.(null);
        setFamilyTipContent?.(null);
        ReactTooltip.hide();         // <= key line: hide any visible tooltip
        }}
    >
    <p data-tip data-for="markerTooltipPast">{text}</p>
  </div>
);

const AnyReactComponentTraceMark = ({ text, info, number }) => (
  <div className={styles.markerTraceMark}
       onMouseEnter={() => { setMarkTipContent(info); ReactTooltip.rebuild(); }}
       onMouseLeave={() => {
        setPastTipContent?.(null);   // or the matching setter for that marker
        setMarkTipContent?.(null);
        setFutureTipContent?.(null);
        setFamilyTipContent?.(null);
        ReactTooltip.hide();         // <= key line: hide any visible tooltip
        }}
    >
    <p data-tip data-for="markerTooltipMark">{text}</p>
  </div>
);

const AnyReactComponentTraceFuture = ({ text, info, number }) => (
  <div className={styles.markerTraceFuture}
       onMouseEnter={() => { setFutureTipContent(info); ReactTooltip.rebuild(); }}
       onMouseLeave={() => {
        setPastTipContent?.(null);   // or the matching setter for that marker
        setMarkTipContent?.(null);
        setFutureTipContent?.(null);
        setFamilyTipContent?.(null);
        ReactTooltip.hide();         // <= key line: hide any visible tooltip
        }}
    >
    <p data-tip data-for="markerTooltipFuture">{text}</p>
  </div>
);


  //variables mapa
  const defaultProps = {
    center: {
      lat: center[0],
      lng: center[1]
    },
    zoom: 0
  }

  let markers=[];

  if(selectedFam){
    
    for (let i = 0; i < ID.length; i++) {
        var tle = assignTLE(ID[i]); 
        if (tle!=''){
            var name = tle.split('\n')[0];
            //calcula (lat,long)
            const trace = computeTrace(tle, 1, interval);
            if (!trace) { tleErrorIds.push(ID[i]); continue; }
            const posiciones = trace.pos;
            const tiempos = trace.times;
            //crea markers
            if (posiciones && posiciones.length) {
                markers.push(<AnyReactComponentTraceFamily
                key={`fam-${ID}-${posiciones.length}`}
                   ID2={ID[i]}
                    lat={posiciones[0].lat}
                    lng={posiciones[0].lng}
                    text="·"
                    info= {'ID: '+ ID[i] + ', Nombre: ' + name}
                    number={i}/>
                    )
    }}}

    if (mark!=''){
        name = assignTLE(mark).split('\n')[0];
        const tleMark = assignTLE(mark);
        const traceMark = computeTrace(tleMark, totalPoints, interval);
        if (!traceMark) { tleErrorIds.push(mark); }
        else {
          const posicionesMark = traceMark.pos;
          const tiempos = traceMark.times;
        
            for (let i=0;i<totalPoints;i++){
                const satInfo = safeSatInfo(tleMark, nowTs, posicionesMark[i].lat, posicionesMark[i].lng);
                const altStr = satInfo ? (satInfo.height.toString().substring(0,9) + 'km') : 'alt: n/a';
                markers.push(<AnyReactComponentTraceIDFam
                    key={`idf-${ID}-${i}`}
                    lat={posicionesMark[i].lat}
                    lng={posicionesMark[i].lng}
                    text='.'
                    info= {'ID: '+ mark + ', Nombre: ' + name + '<br/>' +
                    'lat: '+posicionesMark[i].lat.toString().substring(0,7)+"º , "+'lng: '+posicionesMark[i].lng.toString().substring(0,7) +"º, "+ 'alt: ' +altStr + '<br />'+
                    '\ Época: ' + tiempos[i] }
                    number={ID.length+i}
                    />)
            }

        const mid = Math.ceil(totalPoints/2);
        const satInfoMid = safeSatInfo(tleMark, nowTs, posicionesMark[mid].lat, posicionesMark[mid].lng);
        const altMidStr = satInfoMid ? (satInfoMid.height.toString().substring(0,9) + 'km') : 'alt: n/a';

        markers.push(<AnyReactComponentTraceMark
            key={`mark-${mark}-${mid}`}
            lat={posicionesMark[mid].lat}
            lng={posicionesMark[mid].lng}
            text='.'
            info= {'ID: '+ mark + ', Nombre: ' + name + '<br/>' +
            posicionesMark[mid].lat.toString().substring(0,7)+"º , "+posicionesMark[mid].lng.toString().substring(0,7) +"º, "+ altMidStr + '<br />' +
                '\ Época:' + tiempos[Math.ceil(totalPoints/2)] }
            number={ID.length+totalPoints}
            />)}}
  }else{
    if (ID!=''){
        const tle = assignTLE(ID); 
        const name = tle.split('\n')[0];
        //calcula (lat,long)
        const trace = computeTrace(tle, totalPoints, interval);
        if (!trace) {tleErrorIds.push(ID);
        } else {
            const posiciones = trace.pos;
            const tiempos = trace.times;

            //crea markers
            markers.push(<AnyReactComponent
                key={`center-${ID}-${posiciones.length}`}
                lat={posiciones[Math.ceil(posiciones.length/2)].lat}
                lng={posiciones[Math.ceil(posiciones.length/2)].lng}
            />)
            for (let i = 0; i < Math.ceil(posiciones.length/2); i++) {
                const satInfo = safeSatInfo(tle, nowTs, posiciones[i].lat, posiciones[i].lng);
                const altStr = satInfo ? (satInfo.height.toString().substring(0,9) + 'km') : 'alt: n/a';
                markers.push(<AnyReactComponentTracePast
                    key={`past-${ID}-${i}`}
                    lat={posiciones[i].lat}
                    lng={posiciones[i].lng}
                    text="·"
                    info= {'ID: '+ ID + ', Nombre: ' + name + '<br/>' +
                        'lat: ' + posiciones[i].lat.toString().substring(0,7)+"º , lng: "+posiciones[i].lng.toString().substring(0,7) +"º, "+ altStr + '<br />' +
                    '\ Época: ' + tiempos[i] }
                    number={i}
                    />)
            }
            for (let i = Math.ceil(posiciones.length/2); i < posiciones.length; i++) {
                const satInfo = safeSatInfo(tle, nowTs, posiciones[i].lat, posiciones[i].lng);
                const altStr = satInfo ? (satInfo.height.toString().substring(0,9) + 'km') : 'alt: n/a';
                markers.push(<AnyReactComponentTraceFuture
                    key={`future-${ID}-${i}`}
                    lat={posiciones[i].lat}
                    lng={posiciones[i].lng}
                    text="·"
                    info={'ID: '+ ID + ', Nombre: ' + name + '<br/>' + 
                        'lat: '+posiciones[i].lat.toString().substring(0,7)+"º , lng: "+posiciones[i].lng.toString().substring(0,7) +"º, "+ altStr + '<br />' + "Época: " + tiempos[i]}
                    number={i}
                />)
            }
    }}}

    const uniqueErrIds = React.useMemo(
        () => Array.from(new Set(tleErrorIds)),
        [selectedFam, ID, IDfam, mark, totalPoints, interval]
    );
    const [dismissedOnce, setDismissedOnce] = React.useState(false);
    const showTleError = uniqueErrIds.length > 0 && !dismissedOnce;

    const renders = React.useRef(0);
    renders.current++;
    console.debug('SimpleMap render', renders.current);
    if (renders.current > 50) throw new Error('Render loop guard: SimpleMap');


  //config mapa
  const handleApiLoaded = (map, maps) => {};
    return (
      // Important! Always set the container height explicitly
     <> 
      <Sidebar setLight={setLight} setSidebarOpen={setSidebarOpen} lng={lng}/>
      <Language setLng={setLng}></Language>
      <InfoBoxPrint setID={setID} light={light} setInterval={setInterval} setTotalPoints={setTotalPoints} setSelectedFam={setSelectedFam} 
      setCenter={setCenter} setMark={setMark} setViewMode={setViewMode} setViewTrace={setViewTrace} setTleInfoShow={setTleInfoShow} 
      setIDfam={setIDfam}  lng={lng}/>
      {tleInfoCont}
    <div style={{height: '100vh',width: '100%',paddingRight:'0px',position: 'relative' }}>
    <GoogleMapReact className="Mapa"
      bootstrapURLKeys={{ key: "AIzaSyDKrg6ygIgLkBGpUX29D9hc2OtKprEQvGY" }}
      options={{
        zoomControl:false,
        fullscreenControl: false,
        styles:
        light? 
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

  </div>
    <ReactTooltip id="markerTooltipPast"   type="dark" html={true} getContent={() => pastTipContent}   delayShow={100} globalEventOff="click" />
    <ReactTooltip id="markerTooltipMark"   type="dark" html={true} getContent={() => markTipContent}   delayShow={100} globalEventOff="click" />
    <ReactTooltip id="markerTooltipFuture" type="dark" html={true} getContent={() => futureTipContent} delayShow={100} globalEventOff="click" />
    <ReactTooltip id="markerTooltipFamily" type="dark" html={true} getContent={() => familyTipContent} delayShow={100} globalEventOff="click" />
  </>
    );
}

