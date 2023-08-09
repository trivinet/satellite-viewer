import Link from 'next/link';
import styles from './sidebar.module.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faChevronLeft,faSearch,faMap,faInfo,faMoon,faSun,faAtom,faSatellite } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {lightGlobal} from '../pages/_app'


export default function Sidebar({setLight,setSidebarOpen, lng}) {

    const [lightSidebar, setLightSidebar] = React.useState(lightGlobal);
    const [sidebarOpenProp, setSidebarOpenProp] = React.useState(false);

    useEffect(() => {
      lightGlobal = lightSidebar;
  }, [lightSidebar]);

      return (  
        <>  
    <nav className={lightSidebar?(sidebarOpenProp?(styles.nav):(styles.navClose)):(sidebarOpenProp?(styles.navDark):(styles.navDarkClose))}>
    
    {sidebarOpenProp?(<>

          <icon onClick={() =>{setSidebarOpen((p)=>!p),setSidebarOpenProp((p)=>!p)}}><FontAwesomeIcon icon={sidebarOpenProp?(faChevronLeft):(faBars)} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={'markerTooltipMenu'}/></icon><ReactTooltip place={'top'} id={"markerTooltipMenu"} html={true}>{(lng=='ESP')?('CERRAR'):('CLOSE')}</ReactTooltip>

          <Link href="/"> 
            <a>{(lng=='ESP')?('MENÚ'):('MENU')}</a>
          </Link>

          <Link href="/map">
              <a>{(lng=='ESP')?('Mapa 2D'):('2D Map')}</a>
          </Link>
          
          <Link href="/map3D">
              <a>{(lng=='ESP')?('Mapa 3D'):('3D Map')}</a>
          </Link>

          <Link href="/satelites">
              <a>{(lng=='ESP')?('Satélites'):('Satellites')}</a>
          </Link>

          <Link href="/docu">
              <a>{(lng=='ESP')?('Documentación'):('Documentation')}</a>
          </Link>
      <button onClick={()=>{setLight((p)=>!p),setLightSidebar((p)=>!p)}}>{(lng=='ESP')?('Tema'):('Theme')}</button>
      </>):(<>
          <icon onClick={() =>{setSidebarOpen((p)=>!p),setSidebarOpenProp((p)=>!p)}}><FontAwesomeIcon icon={sidebarOpenProp?(faChevronLeft):(faBars)} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={'markerTooltipMenu'}/></icon><ReactTooltip id={"markerTooltipMenu"} html={true}>{(lng=='ESP')?('ABRIR'):('OPEN')}</ReactTooltip>
          
          <Link href="/">
          <icon id={'house'} ><FontAwesomeIcon icon={faHouse} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipHome"}></FontAwesomeIcon> <ReactTooltip id={"markerTooltipHome"} html={true}>{(lng=='ESP')?('MENÚ'):('MENU')}</ReactTooltip></icon>
          </Link>

          <Link href="/map">
          <icon><FontAwesomeIcon icon={faMap} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipMap"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipMap"} html={true}>{(lng=='ESP')?('Mapa 2D'):('2D Map')}</ReactTooltip></icon>
          </Link>

          <Link href="/map3D">
          <icon><FontAwesomeIcon icon={faAtom} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipMap3"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipMap3"} html={true}>{(lng=='ESP')?('Mapa 3D'):('3D Map')}</ReactTooltip></icon>
          </Link>

          <Link href="/satelites">
          <icon><FontAwesomeIcon icon={faSatellite} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipSats"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipSats"} html={true}>{(lng=='ESP')?('Satélites'):('Satellites')}</ReactTooltip></icon>
          </Link>

          <Link href="/docu">
          <icon><FontAwesomeIcon icon={faInfo} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipDoc"}></FontAwesomeIcon><ReactTooltip id={"markerTooltipDoc"} html={true}>{(lng=='ESP')?('Documentación'):('Documentation')}</ReactTooltip></icon>
          </Link>

      <button onClick={() =>{setLight((p)=>!p),setLightSidebar((p)=>!p)}}><icon><FontAwesomeIcon icon={lightSidebar?(faMoon):(faSun)} width={'20px'} height={'20px'} cursor={'pointer'} data-tip data-for={"markerTooltipTheme"}></FontAwesomeIcon><ReactTooltip place={'top'} id={"markerTooltipTheme"} html={true}>{(lng=='ESP')?('Tema'):('Theme')}</ReactTooltip></icon></button>
      
      </>)}
      
    </nav></>
  ) 
}

