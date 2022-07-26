import Link from 'next/link'
import styles from './sidebar.module.css'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faChevronLeft,faSearch,faMap,faInfo,faMoon,faSun,faAtom,faSatellite } from '@fortawesome/free-solid-svg-icons'

  var darkSidebarDefault = true;
export default function Sidebar({setDark,setSidebarOpen}) {

    const [darkSidebar, setDarkSidebar] = React.useState(darkSidebarDefault);
    const [sidebarOpenProp, setSidebarOpenProp] = React.useState(false);
      return (  
        <>  
    <nav className={darkSidebar?(sidebarOpenProp?(styles.navDark):(styles.navDarkClose)):(sidebarOpenProp?(styles.nav):(styles.navClose))}>
    
        
    <icon onClick={() =>{setSidebarOpen((p)=>!p),setSidebarOpenProp((p)=>!p)}}><FontAwesomeIcon icon={sidebarOpenProp?(faChevronLeft):(faBars)} width={'20px'} height={'20px'} /></icon>
   
    
    

    {sidebarOpenProp?(<><input placeholder="Search..." />
          <Link href="/">
            <a>Home</a>
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
      <button onClick={()=>{setDark((p)=>!p),setDarkSidebar((p)=>!p)}}>Theme</button>
      </>):(<>
          <icon onClick={() =>{setSidebarOpen((p)=>!p),setSidebarOpenProp((p)=>!p)}}><FontAwesomeIcon icon={faSearch} width={'20px'} height={'20px'} /></icon>
          <Link href="/">
          <icon><FontAwesomeIcon icon={faHouse} width={'20px'} height={'20px'} /></icon>
          </Link>
          <Link href="/map">
          <icon><FontAwesomeIcon icon={faMap} width={'20px'} height={'20px'} /></icon>
          </Link>
          <Link href="/map3D">
          <icon><FontAwesomeIcon icon={faAtom} width={'20px'} height={'20px'} /></icon>
          </Link>
          <Link href="/satelites">
          <icon><FontAwesomeIcon icon={faSatellite} width={'20px'} height={'20px'} /></icon>
          </Link>
          <Link href="/docu">
          <icon><FontAwesomeIcon icon={faInfo} width={'20px'} height={'20px'} /></icon>
          </Link>
      <button><icon onClick={() =>{setDark((p)=>!p),setDarkSidebar((p)=>!p)}}><FontAwesomeIcon icon={darkSidebar?(faSun):(faMoon)} width={'20px'} height={'20px'} /></icon></button>
      
      </>)}
      
    </nav></>
  ) 
}

