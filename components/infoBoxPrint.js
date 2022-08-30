import styles from './infoBoxPrint.module.css'
import React, { useState, useEffect } from 'react';
import active from '../pages/active.json';
import assignTLE from '../pages/assignTLE';
import Sidebar from './sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faChevronLeft,faSearch,faMap,faInfo,faMoon,faSun,faAnglesUp,faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import { Scrollbars } from 'react-custom-scrollbars';
import { getLatLngObj,getSatelliteInfo } from 'tle.js';
import generateIDs from '../pages/generateIDs';
import Pos from '../pages/trace';

/* const tle = `ISS (ZARYA)
  1 25544U 98067A   22200.18518544  .00008537  00000+0  15726-3 0  9998
  2 25544  51.6408 178.1024 0004971  26.6345  84.2777 15.50023189 350148`; */
    /* const TLEdefault = `CALSPHERE 1             
    1 00900U 64063C   22202.77533537  .00000453  00000+0  47325-3 0  9991
    2 00900  90.1734  41.5384 0024926 280.2982 199.7183 13.73846342875373`; */
 const IDdefault = 25544;
 const IDMeteo=[25338,25991,27509,28054,28654,28912,29155,29522,32958,33463,33591,35491,35865,35951,36411,36744,37214,37849,38049,38552,38771,39260,40069,40267,40367,40732,41105,41836,41866,41882,41884,41885,41886,41887,41888,41889,41890,41891,43010,43013,43226,43491,43689,43823,44387,49008,51850];
 const IDNOAA=[4793,6235,6920,7529,9057,11060,11416,12553,13923,15427,16969,19531,21263,22739,23455,25338,26536,27453,28654,33591,37849,43013];
 const IDGPS=[24876,26360,26605,27663,27704,28190,28474,28874,29486,29601,32260,32384,32711,35752,36585,37753,38833,39166,39533,39741,40105,40294,40534,40730,41019,41328,43873,44506,45854,46826,48859];
 const IDGlonass=[32275,32276,32393,32395,36111,36112,36401,36402,37139,37867,37868,37869,39155,39620,40001,40315,41330,41554,42939,43508,43687,44299,44850,45358,46805,52984];
 const IDGalileo=[37846,37847,38857,38858,40128,40129,40544,40545,40889,40890,41174,41175,41549,41550,41859,41860,41861,41862,43055,43056,43057,43058,43564,43565,43566,43567,49809,49810];
 const IDBeidou=[36287,36828,37210,37256,37384,37763,37948,38091,38250,38251,38775,38953,40549,40748,40749,40938,41434,41586,43001,43002,43107,43108,43207,43208,43245,43246,43539,43581,43582,43602,43603,43622,43623,43647,43648,43683,43706,43707,44204,44231,44337,44542,44543,44709,44793,44794,44864,44865,45344,45807];
 const IDIRNSS=[39199,39635,40269,40547,41241,41384,41469,43286];
 const IDQZS=[37158,42738,42917,42965];
 const IDEgnos=[28868,28899,37158,37605,37951,38652,38779,38977,39617,39727,41028,41589,42709,42738,42917,42965,46114];
 const IDGNSS=[24876,26360,26605,27663,27704,28190,28474,28874,29486,29601,32260,32384,32711,35752,36585,37753,38833,39166,39533,39741,40105,40294,40534,40730,41019,41328,43873,44506,45854,46826,48859,32275,32276,32393,32395,36111,36112,36401,36402,37139,37867,37868,37869,39155,39620,40001,40315,41330,41554,42939,43508,43687,44299,44850,45358,46805,52984,37846,37847,38857,38858,40128,40129,40544,40545,40889,40890,41174,41175,41549,41550,41859,41860,41861,41862,43055,43056,43057,43058,43564,43565,43566,43567,49809,49810,36287,36828,37210,37256,37384,37763,37948,38091,38250,38251,38775,38953,40549,40748,40749,40938,41434,41586,43001,43002,43107,43108,43207,43208,43245,43246,43539,43581,43582,43602,43603,43622,43623,43647,43648,43683,43706,43707,44204,44231,44337,44542,44543,44709,44793,44794,44864,44865,45344,45807,39199,39635,40269,40547,41241,41384,41469,43286,37158,42738,42917,42965,28868,28899,37158,37605,37951,38652,38779,38977,39617,39727,41028,41589,42709,42738,42917,42965,46114];
 const IDStations=generateIDs('Stations');
 const IDScience=generateIDs('Science');
 const IDOneWeb=generateIDs('OneWeb');
 const IDGeo=generateIDs('ActiveGeo');
 const IDStarlink=generateIDs('Starlink');
 const IDIridium=generateIDs('Iridium');
 const IDInstelsat=generateIDs('Intelsat');
 const IDMolniya=generateIDs('Molniya');




export default function infoBoxPrint({setID,dark,setInterval,setTotalPoints,setSelectedFam,setCenter,setMark,setViewMode,setViewTrace}) {

    //
    const [selectedSat, setSelectedSat] = React.useState(true);
    const [selectedFamInt,setSelectedFamInt] = React.useState(false);
    const [availableSats, setAvailableSat] = React.useState(true);
    const [availableFam, setAvailableFam] = React.useState(true);
    const [settings, setSettings] = React.useState(false);
    const [settingsInterval, setSettingsInterval] = React.useState(false);
    const [settingsPoints, setSettingsPoints] = React.useState(false);
    const [settingsTraza3D,setSettingsTraza3D] = React.useState(false);
    const [settingsSistRef3D,setSettingsSistRef3D] = React.useState(false);
    const [IDsel, setIDsel] = React.useState(IDdefault);
    const [intervalSaved,setIntervalSaved] = React.useState(50000);
    const [totalPointsSaved,setTotalPointsSaved] = React.useState(200);
    const [viewModeSaved,setViewModeSaved] = React.useState('ECI');
    const [viewTraceSaved,setViewTraceSaved] = React.useState(true);
    

    



    var activeSorted = active.sort((a,b) => a.OBJECT_NAME - b.OBJECT_NAME);

    var itemsArchiveBuildInitial = [];
      for (let i = 0; i < activeSorted.length; i++) {
        itemsArchiveBuildInitial.push(
        <button onClick={() => {setSelectedFam(false),setSelectedFamInt(false),setID(activeSorted[i].NORAD_CAT_ID),setIDsel(activeSorted[i].NORAD_CAT_ID),setCenter([Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved)[0].lat,Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved)[0].lng])}}>
          <a>{activeSorted[i].OBJECT_NAME}</a>
        </button>
        )
      }
    
    var familias = [];
      for (let i = 0; i < 10; i++) {
        familias=[(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDStations),setIDsel(IDStations),setCenter([0,0])}}><a>Estaciones</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDScience),setIDsel(IDScience),setCenter([0,0])}}><a>Ciencia</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDMeteo),setIDsel(IDMeteo),setCenter([0,0])}}><a>Meteorología</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDNOAA),setIDsel(IDNOAA),setCenter([0,0])}}><a>NOAA</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDGPS),setIDsel(IDGPS),setCenter([0,0])}}><a>GPS</a>
          </button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDGlonass),setIDsel(IDGlonass),setCenter([0,0])}}><a>GLONASS</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDGalileo),setIDsel(IDGalileo),setCenter([0,0])}}><a>GALILEO</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDBeidou),setIDsel(IDBeidou),setCenter([0,0])}}><a>BEIDOU</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDIRNSS),setIDsel(IDIRNSS),setCenter([0,0])}}><a>IRNSS</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDQZS),setIDsel(IDQZS),setCenter([0,0])}}><a>QZSS</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDEgnos),setIDsel(IDEgnos),setCenter([0,0])}}><a>WAAS/EGNOS/MSAS</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDGNSS),setIDsel(IDGNSS),setCenter([0,0])}}><a>GNSS</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDGeo),setIDsel(IDGeo),setCenter([0,0])}}><a>Geosíncronos</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDIridium),setIDsel(IDIridium),setCenter([0,0])}}><a>Iridium</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDInstelsat),setIDsel(IDInstelsat),setCenter([0,0])}}><a>Intelsat</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDMolniya),setIDsel(IDMolniya),setCenter([0,0])}}><a>Molniya</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDOneWeb),setIDsel(IDOneWeb),setCenter([0,0])}}><a>Oneweb</a></button>
        ),(
          <button onClick={() => {setSelectedFam(true),setSelectedFamInt(true),setTotalPoints(1),setID(IDStarlink),setIDsel(IDStarlink),setCenter([0,0])}}><a>Starlink</a></button>
        )
      
      ]
      }

    var IDsDisplayed=[];
    function displayIDs(IDsInput){
      for (let i = 0; i < IDsInput.length; i++) {
        IDsDisplayed.push(<button style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}} onClick={() => {setMark(IDsInput[i]),setTotalPoints(totalPointsSaved),setInterval(intervalSaved)}} ><a>{assignTLE(IDsInput[i]).split('\n')[0]}, {IDsInput[i]}</a></button>)
      }
      return(IDsDisplayed)
    }

    const [itemsArchive,setItemsArchive] = useState(itemsArchiveBuildInitial);
    
    function handleChange(event) {
      var itemsArchiveBuild=[];
      if(event.target.value===''){setItemsArchive(itemsArchiveBuildInitial)} else{
      for (let i = 0; i < activeSorted.length; i++) {
        if(event.target.value===activeSorted[i].OBJECT_NAME.substring(0,event.target.value.length)||event.target.value.toUpperCase()===activeSorted[i].OBJECT_NAME.substring(0,event.target.value.length)||event.target.value===activeSorted[i].NORAD_CAT_ID.toString().substring(0,event.target.value.length))
        {
          itemsArchiveBuild.push(
          <button onClick={() => {setSelectedFam(false),setSelectedFamInt(false),setTotalPoints(totalPointsSaved),setInterval(intervalSaved),setID(activeSorted[i].NORAD_CAT_ID),setIDsel(activeSorted[i].NORAD_CAT_ID),setCenter([Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved).lat,Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved).lng])}}>
            <a>{activeSorted[i].OBJECT_NAME}</a>
          </button>
          )
        }}
        setItemsArchive(itemsArchiveBuild);
        return(itemsArchive)
    }
  }

  return (
    
    <>
     
    <nav className={dark?(styles.navDark):(styles.nav)}>
          <>
            <input placeholder="Search..." onChange={handleChange} onClick={() =>setAvailableSat((p)=>true)}/>      
            <p><icon onClick={() =>setSelectedSat((p)=>!p)}><FontAwesomeIcon icon={(selectedSat)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/></icon>Selección</p>
            {selectedSat?(selectedFamInt?(<>{<>
            {displayIDs(IDsel)}
            </>}</>):(<>{<>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>ID: {IDsel}</p>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>
              <p>Nombre: {assignTLE(IDsel).split('\n')[0]}</p>
              <p>L1: {assignTLE(IDsel).split('\n')[1]}</p>
              <p>L2: {assignTLE(IDsel).split('\n')[2]}</p>
              <p>Fecha: {Date(Date.now())}</p>
              <p>Latitud: {getLatLngObj(assignTLE(IDsel),Date.now()).lat} º</p>
              <p>Longitud: {getLatLngObj(assignTLE(IDsel),Date.now()).lng} º</p>
              <p>Altitud: {getSatelliteInfo(assignTLE(IDsel),Date.now(),getLatLngObj(assignTLE(IDsel),Date.now()).lat,getLatLngObj(assignTLE(IDsel),Date.now()).lng,0).height} km</p></p>
            </>}</>)):(<>{<>
            <p hidden={true}  style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>ID: {IDsel}</p>
            <p hidden={true} style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>
              <p>Nombre: {assignTLE(IDsel).split('\n')[0]}</p>
              <p>L1: {assignTLE(IDsel).split('\n')[1]}</p>
              <p>L2: {assignTLE(IDsel).split('\n')[2]}</p></p>
            </>}</>)}

            <p><icon onClick={() =>setSettings((p)=>!p)}><FontAwesomeIcon icon={(settings)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/></icon>Ajustes</p>
            {settings?(<>
              <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon onClick={() =>setSettingsInterval((p)=>!p)}><FontAwesomeIcon icon={(settingsInterval)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon> Intervalo</p>
              {settingsInterval?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setInterval(10000),setIntervalSaved(10000)}}>10s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(20000),setIntervalSaved(20000)}}>20s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(50000),setIntervalSaved(50000)}}>50s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(100000),setIntervalSaved(100000)}}>100s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(200000),setIntervalSaved(200000)}}>200s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(500000),setIntervalSaved(500000)}}>500s</buttonset></>

              }</>):('')}

              <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon onClick={() =>setSettingsPoints((p)=>!p)}><FontAwesomeIcon icon={(settingsPoints)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon> Puntos Totales</p>
              {settingsPoints?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(100),setTotalPointsSaved(100)}}>100</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(200),setTotalPointsSaved(200)}}>200</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(500),setTotalPointsSaved(500)}}>500</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(1000),setTotalPointsSaved(1000)}}>1000</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(2000),setTotalPointsSaved(2000)}}>2000</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(5000),setTotalPointsSaved(5000)}}>5000</buttonset></>

              }</>):('')}

              <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon onClick={() =>setSettingsTraza3D((p)=>!p)}><FontAwesomeIcon icon={(settingsTraza3D)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon> Traza en 3D</p>
              {settingsTraza3D?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setViewTrace(true),setViewTraceSaved(true)}}>Visible</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setViewTrace(false),setViewTraceSaved(false)}}>No visible</buttonset></>

              }</>):('')}

              <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon onClick={() =>setSettingsSistRef3D((p)=>!p)}><FontAwesomeIcon icon={(settingsSistRef3D)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon> Sistema de Referencia 3D</p>
              {settingsSistRef3D?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setViewMode('ECEF'),setViewModeSaved('ECEF')}}>ECEF</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setViewMode('ECI'),setViewModeSaved(20000)}}>ECI</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setViewMode('BOTH'),setViewModeSaved(20000)}}>ECI/ECEF</buttonset></>

              }</>):('')}
            </>):('')}

            <p><icon onClick={() =>setAvailableSat((p)=>!p)}><FontAwesomeIcon icon={(availableSats)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>SATéLITES</icon></p>
            
            {availableSats?(<>{itemsArchive}</>):('')}

            <p><icon onClick={() =>setAvailableFam((p)=>!p)}><FontAwesomeIcon icon={(availableFam)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>Familias</icon></p>
            
            {availableFam?(<>{familias}</>):('')}
            
          </>
          
    </nav>
    
    </>
    )
}
