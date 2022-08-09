import styles from './infoBoxPrint.module.css'
import React, { useState, useEffect } from 'react';
import active from '../pages/active.json';
import assignTLE from '../pages/assignTLE';
import Sidebar from './sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faChevronLeft,faSearch,faMap,faInfo,faMoon,faSun,faAnglesUp,faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import { Scrollbars } from 'react-custom-scrollbars';

/* const tle = `ISS (ZARYA)
  1 25544U 98067A   22200.18518544  .00008537  00000+0  15726-3 0  9998
  2 25544  51.6408 178.1024 0004971  26.6345  84.2777 15.50023189 350148`; */
    /* const TLEdefault = `CALSPHERE 1             
    1 00900U 64063C   22202.77533537  .00000453  00000+0  47325-3 0  9991
    2 00900  90.1734  41.5384 0024926 280.2982 199.7183 13.73846342875373`; */
 const IDdefault = 25544
export default function infoBoxPrint({setID,dark,setInterval,setTotalPoints}) {

    //
    const [selectedSat, setSelectedSat] = React.useState(true);
    const [availableSats, setAvailableSat] = React.useState(true);
    const [settings, setSettings] = React.useState(false);
    const [settingsInterval, setSettingsInterval] = React.useState(false);
    const [settingsPoints, setSettingsPoints] = React.useState(false);
    const [IDsel, setIDsel] = React.useState(IDdefault);
    //var [TLE,setTLE]= React.useState(TLEdefault);
    

    

    var activeSorted = active.sort((a,b) => a.OBJECT_NAME - b.OBJECT_NAME);

    var itemsArchiveBuildInitial = [];
      for (let i = 0; i < activeSorted.length; i++) {
        itemsArchiveBuildInitial.push(
        <button onClick={() => {setID(activeSorted[i].NORAD_CAT_ID),setIDsel(activeSorted[i].NORAD_CAT_ID)}}>
          <a>{activeSorted[i].OBJECT_NAME}</a>
        </button>
        )
      }
    
    const [itemsArchive,setItemsArchive] = useState(itemsArchiveBuildInitial);
    const [inputSaved,setInputSaved] = useState('a');
    

    function handleChange(event) {
      var itemsArchiveBuild=[];
      setInputSaved(event.target.value);
      if(event.target.value===''){setItemsArchive(itemsArchiveBuildInitial)} else{
      for (let i = 0; i < activeSorted.length; i++) {
        if(event.target.value===activeSorted[i].OBJECT_NAME.substring(0,event.target.value.length)||event.target.value.toUpperCase()===activeSorted[i].OBJECT_NAME.substring(0,event.target.value.length)||event.target.value===activeSorted[i].NORAD_CAT_ID.toString().substring(0,event.target.value.length))
        {
          itemsArchiveBuild.push(
          <button onClick={() => {setID(activeSorted[i].NORAD_CAT_ID),setIDsel(activeSorted[i].NORAD_CAT_ID)}}>
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
            {selectedSat?(<>{<>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>CHOSEN ID: {IDsel}</p>
            <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}>TLE: {assignTLE(IDsel)}</p>
            </>}</>):(<>{<>
            <p hidden={true}>TLE: {assignTLE(IDsel)}</p>
            </>}</>)}
            <p><icon onClick={() =>setSettings((p)=>!p)}><FontAwesomeIcon icon={(settings)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/></icon>Ajustes</p>
            {settings?(<>
              <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon onClick={() =>setSettingsInterval((p)=>!p)}><FontAwesomeIcon icon={(settingsInterval)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon>Intervalo</p>
              {settingsInterval?(<>{<>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(10000)}}>
                  10s
                  </buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(20000)}}>
                  20s
                  </buttonset>
                  <buttonset className={styles.buttonset} onClick={() => {setInterval(50000)}}>
                  50s
                  </buttonset></>
              }</>):('')}
              <p style={{fontSize:'12px',marginLeft:'18px',padding:'5px'}}><icon onClick={() =>setSettingsPoints((p)=>!p)}><FontAwesomeIcon icon={(settingsPoints)?(faAnglesUp):(faAnglesDown)} width={'10px'} height={'10px'} cursor={'pointer'}/></icon>Puntos Totales</p>
              {settingsPoints?(<>{<>
                <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(100)}}>
                100
                </buttonset>
                <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(200)}}>
                200
                </buttonset>
                <buttonset className={styles.buttonset} onClick={() => {setTotalPoints(500)}}>
                500
                </buttonset></>
              }</>):('')}
            </>):('')}
            <p><icon onClick={() =>setAvailableSat((p)=>!p)}><FontAwesomeIcon icon={(availableSats)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>SATéLITES</icon></p>
            
            {availableSats?(<>{itemsArchive}</>):('')}
            
          </>
          
    </nav>
    
    </>
    )
}
