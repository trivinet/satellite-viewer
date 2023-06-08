import Link from 'next/link';
import styles from './sidebar.module.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faChevronLeft,faSearch,faMap,faInfo,faMoon,faSun,faAtom,faSatellite } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {darkGlobal} from '../pages/_app'


export default function Sidebar({setDark,setSidebarOpen}) {

    const [darkSidebar, setDarkSidebar] = React.useState(darkGlobal);
    const [sidebarOpenProp, setSidebarOpenProp] = React.useState(false);

    useEffect(() => {
      darkGlobal = darkSidebar;
  }, [darkSidebar]);

      return (  
        <>  
    <nav className={darkSidebar?(sidebarOpenProp?(styles.navDark):(styles.navDarkClose)):(sidebarOpenProp?(styles.nav):(styles.navClose))}>
    
    {sidebarOpenProp?(<>{/* <input placeholder="Search..." /> */}

          <icon onClick={() =>{setSidebarOpen((p)=>!p),setSidebarOpenProp((p)=>!p)}}><FontAwesomeIcon icon={sidebarOpenProp?(faChevronLeft):(faBars)} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={'markerTooltipMenu'}/></icon><ReactTooltip place={'top'} id={"markerTooltipMenu"} html={true}>CERRAR</ReactTooltip>

          <Link href="/"> 
            <a>MENÚ</a>
            
          </Link>
          <Link href="/map">
              <a>Map 2D</a>
          </Link>
          <Link href="/map3D">
              <a>Map 3D</a>
          </Link>
          <Link href="/satelites">
              <a>Satélites</a>
          </Link>
          <Link href="/docu">
              <a>Documentación</a>
          </Link>
      <button onClick={()=>{setDark((p)=>!p),setDarkSidebar((p)=>!p) /* ,(!darkSidebar)?(setBasemap('dark-gray-vector'),
setEnvironment({
  lighting: {
    // enable shadows for all the objects in a scene
    directShadowsEnabled: false,
    // set the date and a time of the day for the current camera location
    //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
  }  
})):((setBasemap('satellite'),
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
}))) */ }}>Theme</button>
      </>):(<>
          <icon onClick={() =>{setSidebarOpen((p)=>!p),setSidebarOpenProp((p)=>!p)}}><FontAwesomeIcon icon={sidebarOpenProp?(faChevronLeft):(faBars)} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={'markerTooltipMenu'}/></icon><ReactTooltip id={"markerTooltipMenu"} html={true}>ABRIR</ReactTooltip>
          {/* <icon onClick={() =>{setSidebarOpen((p)=>!p),setSidebarOpenProp((p)=>!p)}}><FontAwesomeIcon icon={faSearch} width={'20px'} height={'20px'} cursor={'pointer'}></FontAwesomeIcon></icon> */}
          <Link href="/">
          <icon id={'house'}><FontAwesomeIcon icon={faHouse} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipHome"} ></FontAwesomeIcon> <ReactTooltip id={"markerTooltipHome"} html={true}>MENÚ</ReactTooltip></icon>
          </Link>
          <Link href="/map">
          <icon><FontAwesomeIcon icon={faMap} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipMap"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipMap"} html={true}>Map 2D</ReactTooltip></icon>
          </Link>
          <Link href="/map3D">
          <icon><FontAwesomeIcon icon={faAtom} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipMap3"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipMap3"} html={true}>Map 3D</ReactTooltip></icon>
          </Link>
          <Link href="/satelites">
          <icon><FontAwesomeIcon icon={faSatellite} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipSats"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipSats"} html={true}>Sats</ReactTooltip></icon>
          </Link>
          <Link href="/docu">
          <icon><FontAwesomeIcon icon={faInfo} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipDoc"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipDoc"} html={true}>Docu</ReactTooltip></icon>
          </Link>
      <button onClick={() =>{setDark((p)=>!p),setDarkSidebar((p)=>!p)}}><icon /* ,(!darkSidebar)?(setBasemap('dark-gray-vector'),
setEnvironment({
  lighting: {
    // enable shadows for all the objects in a scene
    directShadowsEnabled: false,
    // set the date and a time of the day for the current camera location
    //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
  }  
})):((setBasemap('satellite'),
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
})))  */><FontAwesomeIcon icon={darkSidebar?(faSun):(faMoon)} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipTheme"}></FontAwesomeIcon><ReactTooltip place={'top'} id={"markerTooltipTheme"} html={true}>Tema</ReactTooltip></icon></button>
      
      </>)}
      
    </nav></>
  ) 
}

