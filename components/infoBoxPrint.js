import styles from './infoBoxPrint.module.css'
import React, { useState, useEffect } from 'react';
import active from './active.json';
import assignTLE from './assignTLE';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faChevronLeft,faSearch,faMap,faInfo,faMoon,faSun,faAnglesUp,faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import { Scrollbars } from 'react-custom-scrollbars';
import { getLatLngObj,getSatelliteInfo } from 'tle.js';
import generateIDs from './generateIDs';
import Pos from './trace';
import ReactTooltip from 'react-tooltip';

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




export default function InfoBoxPrint({setID,light,setInterval,setTotalPoints,setSelectedFam,setCenter,setMark,setViewMode,setViewTrace,setTleInfoShow,setIDfam, lng}) {

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
    

    


//SATÉLITES
    var activeSorted = active.sort((a,b) => a.OBJECT_NAME - b.OBJECT_NAME);

    var itemsArchiveBuildInitial = [];
      for (let i = 0; i < activeSorted.length; i++) {
        itemsArchiveBuildInitial.push(
        <button onClick={() => {setMark(''),setSelectedFam(false),setSelectedFamInt(false),setTleInfoShow(true),setID(activeSorted[i].NORAD_CAT_ID),setIDsel(activeSorted[i].NORAD_CAT_ID),setCenter([Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved)[0].lat,Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved)[0].lng])}}>
          <a>{activeSorted[i].OBJECT_NAME}</a>
        </button>
        )
      }
    


//SATÉLITES INPUT

      const [itemsArchive,setItemsArchive] = useState(itemsArchiveBuildInitial);
    
      function handleChange(event) {
        var itemsArchiveBuild=[];
        if(event.target.value===''){setItemsArchive(itemsArchiveBuildInitial)} else{
        for (let i = 0; i < activeSorted.length; i++) {
          if(event.target.value===activeSorted[i].OBJECT_NAME.substring(0,event.target.value.length)||event.target.value.toUpperCase()===activeSorted[i].OBJECT_NAME.substring(0,event.target.value.length)||event.target.value===activeSorted[i].NORAD_CAT_ID.toString().substring(0,event.target.value.length))
          {
            itemsArchiveBuild.push(
            <button onClick={() => {setID(activeSorted[i].NORAD_CAT_ID),setIDsel(activeSorted[i].NORAD_CAT_ID),setMark(''),setTleInfoShow(true),setSelectedFam(false),setSelectedFamInt(false)/* ,setTotalPoints(totalPointsSaved),setInterval(intervalSaved) */,setCenter([Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved)[0].lat,Pos(assignTLE(activeSorted[i].NORAD_CAT_ID),1,intervalSaved)[0].lng])}}>
              <a>{activeSorted[i].OBJECT_NAME}</a>
            </button>
            )
          }}
          setItemsArchive(itemsArchiveBuild);
          return(itemsArchive)
      }
    }

//FAMILIAS
    var familias = [];
      for (let i = 0; i < 10; i++) {
        familias=[(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true)/* ,setTotalPoints(1) */,setID(IDStations),setIDsel(IDStations),setCenter([0,0])}}><a>{(lng=='ESP')?("Estaciones"):("Stations")}</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true)/* ,setTotalPoints(1) */,setID(IDScience),setIDsel(IDScience),setCenter([0,0])}}><a>{(lng=='ESP')?("Ciencia"):("Stcience")}</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true)/* ,setTotalPoints(1) */,setID(IDMeteo),setIDsel(IDMeteo),setCenter([0,0])}}><a>{(lng=='ESP')?("Meteorología"):("Meteorology")}</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true)/* ,setTotalPoints(1) */,setID(IDNOAA),setIDsel(IDNOAA),setCenter([0,0])}}><a>NOAA</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDGPS),setIDsel(IDGPS),setCenter([0,0])}}><a>GPS</a>
          </button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDGlonass),setIDsel(IDGlonass),setCenter([0,0])}}><a>GLONASS</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDGalileo),setIDsel(IDGalileo),setCenter([0,0])}}><a>GALILEO</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDBeidou),setIDsel(IDBeidou),setCenter([0,0])}}><a>BEIDOU</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDIRNSS),setIDsel(IDIRNSS),setCenter([0,0])}}><a>IRNSS</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDQZS),setIDsel(IDQZS),setCenter([0,0])}}><a>QZSS</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDEgnos),setIDsel(IDEgnos),setCenter([0,0])}}><a>WAAS/EGNOS/MSAS</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDGNSS),setIDsel(IDGNSS),setCenter([0,0])}}><a>GNSS</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDGeo),setIDsel(IDGeo),setCenter([0,0])}}><a>{(lng=='ESP')?("Geosíncronos"):("Geosynchronous")}</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDIridium),setIDsel(IDIridium),setCenter([0,0])}}><a>Iridium</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDInstelsat),setIDsel(IDInstelsat),setCenter([0,0])}}><a>Intelsat</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDMolniya),setIDsel(IDMolniya),setCenter([0,0])}}><a>Molniya</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDOneWeb),setIDsel(IDOneWeb),setCenter([0,0])}}><a>Oneweb</a></button>
        ),(
          <button onClick={() => {setMark(''),setTleInfoShow(false),setSelectedFam(true),setSelectedFamInt(true),/* setTotalPoints(1), */setID(IDStarlink),setIDsel(IDStarlink),setCenter([0,0])}}><a>Starlink</a></button>
        )
      
      ]
      }

//IDS FAMILIAS

    var IDsDisplayed=[];
    function displayIDs(IDsInput){
      for (let i = 0; i < IDsInput.length; i++) {
        IDsDisplayed.push(<button 
          style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}} 
          onClick={() => {setTleInfoShow(true),setIDfam(IDsInput[i]),setMark(IDsInput[i]),
            setCenter([Pos(assignTLE(IDsInput[i]),1,intervalSaved)[0].lat,Pos(assignTLE(IDsInput[i]),1,intervalSaved)[0].lng])}}>
          <a>{assignTLE(IDsInput[i]).split('\n')[0]}, {IDsInput[i]}</a>
        </button>)
      }
      return(IDsDisplayed)
    }

    

  return (
    
    <>
     
    <nav className={light?(styles.nav):(styles.navDark)}>
          <>
            <input placeholder={lng=='ESP'?("ID / nombre..."):("ID / name..." )} onChange={handleChange} data-tip data-for={'input'} onClick={() =>setAvailableSat((p)=>true)}/>
            <ReactTooltip className={styles.tooltip} id={"input"} type='dark' html={true}>{lng=='ESP'?("Busca por NORAD ID o nombre del satélite"):("Search by NORAD ID or satellite name")}</ReactTooltip>     
            <p data-tip data-for={'seleccion'} onClick={() =>setSelectedSat((p)=>!p)}><icon ><FontAwesomeIcon icon={(selectedSat)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'}/></icon>{lng=='ESP'?(" Selección"):(" Selection" )}</p>
            <ReactTooltip className={styles.tooltip} id={"seleccion"} type='dark' html={true}>{lng=='ESP'?("IDs seleccionados"):("Selected IDs" )}</ReactTooltip>
            {selectedSat?(selectedFamInt?(<>{<>
            {displayIDs(IDsel)}
            </>}</>):(<>{<>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>ID: {IDsel}</p>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>{lng=='ESP'?("Nombre: "):("Name: " )}{assignTLE(IDsel).split('\n')[0]}</p>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>{lng=='ESP'?("Fecha: "):("Date: " )}{Date(Date.now())}</p>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>{lng=='ESP'?("Latitud: "):("Latitude: " )}{getLatLngObj(assignTLE(IDsel),Date.now()).lat.toString().substring(0,7)} º</p>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>{lng=='ESP'?("Longitud: "):("Longitude: " )}{getLatLngObj(assignTLE(IDsel),Date.now()).lng.toString().substring(0,7)} º</p>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>{lng=='ESP'?("Altitud: "):("Altitude: " )} {getSatelliteInfo(assignTLE(IDsel),Date.now(),getLatLngObj(assignTLE(IDsel),Date.now()).lat,getLatLngObj(assignTLE(IDsel),Date.now()).lng,0).height.toString().substring(0,7)} km</p>
            </>}</>)):(<>{<>
            <p hidden={true}  style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>ID: {IDsel}</p>
            <p hidden={true} style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>
              <p>{lng=='ESP'?("Nombre: "):("Name: " )} {assignTLE(IDsel).split('\n')[0]}</p>
              <p>L1: {assignTLE(IDsel).split('\n')[1]}</p>
              <p>L2: {assignTLE(IDsel).split('\n')[2]}</p></p>
            </>}</>)}

            <p data-tip data-for={'ajustes'} onClick={() =>setSettings((p)=>!p)}><icon ><FontAwesomeIcon icon={(settings)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/></icon>{lng=='ESP'?(" Ajustes"):(" Settings" )}</p><ReactTooltip className={styles.tooltip} id={"ajustes"} type='dark' html={true}>
            {lng=='ESP'?("Ajusta valores tales como el intervalo de muestras, el número total de puntos, la visibilidad de la proyección o el sistema de referencia"):
            ("Adjust values such as sample interval, total number of points, visibility of the projection or the reference system")}</ReactTooltip>
            {settings?(<>
              <p data-tip data-for={'intervalo'} onClick={() =>setSettingsInterval((p)=>!p)} style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon >
                <FontAwesomeIcon icon={(settingsInterval)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon>
                {(lng=='ESP')?(" Intervalo"):(" Interval")}</p>
                <ReactTooltip className={styles.tooltip} id={"intervalo"} type='dark' html={true}>
                  {(lng=='ESP')?("Tiempo entre muestras de ubicación del satélite (cuanto menor sea, más precisa será la traza)")
                  :("Time between location samples of the satellite (the lower the time, the more accurate will be the path)")}</ReactTooltip>
              {settingsInterval?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setInterval(10000),setIntervalSaved(10000)}}>10s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(20000),setIntervalSaved(20000)}}>20s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(50000),setIntervalSaved(50000)}}>50s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(100000),setIntervalSaved(100000)}}>100s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(200000),setIntervalSaved(200000)}}>200s</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(500000),setIntervalSaved(500000)}}>500s</buttonset></>

              }</>):('')}

              <p data-tip data-for={'totPts'} onClick={() =>setSettingsPoints((p)=>!p)} style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon >
                <FontAwesomeIcon icon={(settingsPoints)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon>
                {(lng=='ESP')?(" Puntos totales"):(" Total points")}</p>
                <ReactTooltip className={styles.tooltip} id={"totPts"} type='dark' html={true}>
                  {(lng=='ESP')?("Número total de muestras de ubicación del satélite (cuanto mayor sea, más detalles sobre la evolución de la traza)")
                  :("Total number of location samples of the satellite (the higher the number, the more detailed will be the evolution)")}</ReactTooltip>
              {settingsPoints?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(100),setTotalPointsSaved(100)}}>100</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(200),setTotalPointsSaved(200)}}>200</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(500),setTotalPointsSaved(500)}}>500</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(1000),setTotalPointsSaved(1000)}}>1000</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(2000),setTotalPointsSaved(2000)}}>2000</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(5000),setTotalPointsSaved(5000)}}>5000</buttonset></>

              }</>):('')}

              <p data-tip data-for={'traza'} onClick={() =>setSettingsTraza3D((p)=>!p)} style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon >
                <FontAwesomeIcon icon={(settingsTraza3D)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon>
                {(lng=='ESP')?(" Traza (3D)"):(" Trace (3D)")}</p>
                <ReactTooltip clas2sName={styles.tooltip} id={"traza"} type='dark' html={true}>
                  {(lng=='ESP')?("Marca 'Visible' para poder ver la proyección de la órbita (traza) sobre la tierra"):
                  ("Press 'Visible' to see the proyection of the orbit (trace) on Earth")}</ReactTooltip>
              {settingsTraza3D?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setViewTrace(true),setViewTraceSaved(true)}}>{(lng=='ESP')?("Visible"):("Visible")}</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setViewTrace(false),setViewTraceSaved(false)}}>{(lng=='ESP')?("No Visible"):("Not Visible")}</buttonset></>

              }</>):('')}

              <p data-tip data-for={'sistRef'} onClick={() =>setSettingsSistRef3D((p)=>!p)} style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon >
                <FontAwesomeIcon icon={(settingsSistRef3D)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/>
                </icon>{(lng=='ESP')?(" Sist. Referencia 3D"):(" Reference Syst. 3D")}</p>
                <ReactTooltip className={styles.tooltip} id={"sistRef"} type='dark' html={true}>
                  {(lng=='ESP')?("Establece el sistema de referencia (ECEF: Earth Centered, Earth Fixed, ECI: Earth Centered Inertial, ECEF/ECI: ambas"):
                  ("Stablish the reference system (ECEF: Earth Centered, Earth Fixed, ECI: Earth Centered Inertial, ECEF/ECI: both)")}</ReactTooltip>
              {settingsSistRef3D?(<>{<>

                  <buttonset className={styles.buttonset} onClick={() => {setViewMode('ECEF'),setViewModeSaved('ECEF')}}>ECEF</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setViewMode('ECI'),setViewModeSaved('ECI')}}>ECI</buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setViewMode('BOTH'),setViewModeSaved('BOTH')}}>ECI/ECEF</buttonset></>

              }</>):('')}
            </>):('')}

            <p data-tip data-for={'sats'}><icon onClick={() =>setAvailableSat((p)=>!p)}><FontAwesomeIcon icon={(availableSats)?(faAnglesUp):(faAnglesDown)} 
            width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(" Satélites"):(" Satellites")}</icon></p>
            <ReactTooltip className={styles.tooltip} id={"sats"} type='dark' html={true}>
              {(lng=='ESP')?("Listado de satélites disponibles, ordenados por NORAD ID. Usa la búsqueda para encontrar el que desees que se muestre"):
              ("List of available satellites, sorted by NORAD ID. Use the search to find the one you want to be shown")}</ReactTooltip>
            
            {availableSats?(<>{itemsArchive}</>):('')}

            <p data-tip data-for={'familias'}><icon onClick={() =>setAvailableFam((p)=>!p)}><FontAwesomeIcon icon={(availableFam)?(faAnglesUp):(faAnglesDown)} 
            width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(' Familias'):(' Families')}</icon></p>
            <ReactTooltip className={styles.tooltip} id={"familias"} type='dark' html={true}>
              {(lng=='ESP')?("Listado de familias de satélites disponibles, organizados por empresa, por tipo de órbita o por funcionalidad, según del caso."):
              ("List of available satellite families, grouped by company, type of orbit or by its functionality, depending on the case")}</ReactTooltip>
            
            {availableFam?(<>{familias}</>):('')}
            
          </>
          
    </nav>
    
    </>
    )
}
