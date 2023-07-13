import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Index.module.css'
import Sidebar from '../components/sidebar'
import Language from '../components/language'
import { useState, useEffect } from 'react'
import active from '../components/active.json'
import {darkGlobal, lngGlobal} from '../pages/_app'



export default function Home() {

  const [dark,setDark] = useState(darkGlobal);
  const [lng,setLng] = useState(lngGlobal);
  const [sidebarOpen,setSidebarOpen] = useState(false);

  function assignTheme(dark,sidebarOpen){
    {if(dark){
      if(sidebarOpen){
      return (styles.mainDark)}
      else {return (styles.mainDarkClose)}}
      else{
        if(sidebarOpen){
          return (styles.main)}
          else {return (styles.mainClose)}
      }
  }}

  useEffect(() => {
    darkGlobal = dark}, [dark]);
  useEffect(() => {
    lngGlobal = lng;}, [lng]);

  return (
    <>
    <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen} lng={lng}/>
    <Language setLng={setLng}></Language>
    <div className={(dark)?(styles.containerDark):(styles.containerLight)}>
    
      <Head>
        <title>Satellite Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      <main className={assignTheme(dark,sidebarOpen)}>
      
        <h1 className={(dark)?(styles.title):(styles.titleLight)} style={{'fontSize':'86px'}}>
          {(lng=='ESP')?('Bienvenido a '):('Welcome to')}<a href="/" className={styles.logo}>{/* <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png'}/>
        </a> */}Satellite Viewer <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a>  
        </h1>
        
        
        <div className={styles.grid}>
          
          <Link href="/docu">
          <a className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/docu" src ={'https://s6.gifyu.com/images/gifDocu.gif'}/>
          </div>
            <h2 style={{'fontSize':'36px', 'fontFamily':['Alumni Sans Pinstripe', 'sans-serif']}}>{(lng=='ESP')?('Documentación'):('Documentation')}</h2>
            <p style={{'fontFamily':['Alumni Sans Pinstripe', 'sans-serif']}}>{(lng=='ESP')?('Encuentra información en profundidad sobre TLEs, Mecánica Orbital y más.'):('Find in-depth information about TLEs, Orbital Mechanics and more.')}</p>
            </a>
          </Link>

          <Link href="/map">
          <a className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/map" src ={'https://s6.gifyu.com/images/gifMap2D.gif'}/>
          </div>
            <h2 style={{'fontSize':'36px'}}>{(lng=='ESP')?('Mapa 2D'):('2D Map')}</h2>
            <p style={{'fontFamily':['Alumni Sans Pinstripe', 'sans-serif']}}>{(lng=='ESP')?('Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 3D interactivo con los satélites disponibles en tiempo real.'):
            ('Learn about tracks, orbital objects and locations on an interactive 3D map with available satellites in real time.')}</p>
            <i> </i>
          </a>
          </Link>

          <Link href="/map3D">
          <a className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/map3D" src ={'https://s6.gifyu.com/images/gifMap3D94990f84b961d5f6.gif'}/>
          </div>
            <h2 style={{'fontSize':'36px'}}>{(lng=='ESP')?('Mapa 3D'):('3D Map')}</h2>
            <p>
            {(lng=='ESP')?('Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 3D interactivo con los satélites disponibles en tiempo real.'):
            ('Learn about tracks, orbital objects and locations on an interactive 3D map with available satellites in real time.')}
            </p>
          </a>
          </Link>

          <Link href="/satelites">
          <a className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/satelites" src ={'https://media4.giphy.com/media/drPdD8XyDK3EfEj12G/giphy.gif?cid=790b76117d33aa9883ba5ecc6185e3438ba2509dd24de2cc&rid=giphy.gif&ct=g'}/>
          </div>
            <h2 style={{'fontSize':'36px'}}>{(lng=='ESP')?('Satélites'):('Satellites')}</h2>
            <p>{(lng=='ESP')?(`Información miscelánea sobre satélites, tipos de traza, estadístico de países, etc. Se está monitorizando un total de ${active.length} satélites`):
            (`Miscellaneous information on satellites, track types, country statistics, etc. A total of ${active.length} satellites are being monitorized.`)}</p>
          </a>
          </Link>
          
          
        </div>

        <Link href="/about">
            <h4 style={{position: 'absolute', top: '95%', right:'5%','fontSize':'20px', padding: '0px', margin: '0px', height:'15px'}}>{(lng=='ESP')?('Acerca de'):('About')}</h4>
        </Link>
        
      </main>
      
      
    </div>
    
    </>
    
  )
}


