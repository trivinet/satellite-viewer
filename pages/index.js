import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Index.module.css'
import Sidebar from '../components/sidebar'
import Language from '../components/language'
import { useState, useEffect } from 'react'
import active from '../components/active.json'
import {lightGlobal, lngGlobal} from '../pages/_app'

export default function Home() {

  const [light,setLight] = useState(lightGlobal);
  const [lng,setLng] = useState(lngGlobal);
  const [sidebarOpen,setSidebarOpen] = useState(false);

  function assignTheme(light,sidebarOpen){
    {if(light){
      if(sidebarOpen){
      return (styles.main)}
      else {return (styles.mainClose)}}
      else{
        if(sidebarOpen){
          return (styles.mainDark)}
          else {return (styles.mainDarkClose)}
      }
  }}

  useEffect(() => {lightGlobal = light}, [light]);
  useEffect(() => {lngGlobal = lng;}, [lng]);

  return (
    <>
      <Sidebar setLight={setLight} setSidebarOpen={setSidebarOpen} lng={lng} />
      <Language setLng={setLng} />

      <div className={light ? styles.containerLight : styles.containerDark}>
        <Head>
          <title>Satellite Viewer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={assignTheme(light, sidebarOpen)}>
          <h1 className={light ? styles.titleLight : styles.title} style={{ fontSize: '86px' }}>
            {lng === 'ESP' ? 'Bienvenido a ' : 'Welcome to '}
            <Link href="/" className={styles.logo}>
              Satellite Viewer <span className={styles.imageGifTitle}>
                <img src="https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif" alt="" />
              </span>
            </Link>
          </h1>

          <div className={styles.grid}>
            <Link href="/docu" className={styles.card}>
              <div className={styles.imageGif}>
                <img src="/gifDocu.gif" alt="" />
              </div>
              <h2 style={{ fontSize: '36px', fontFamily: ['Alumni Sans Pinstripe', 'sans-serif'] }}>
                {lng === 'ESP' ? 'Documentación' : 'Documentation'}
              </h2>
              <p style={{ fontFamily: ['Alumni Sans Pinstripe', 'sans-serif'] }}>
                {lng === 'ESP'
                  ? 'Encuentra información en profundidad sobre TLEs, Mecánica Orbital y más.'
                  : 'Find in-depth information about TLEs, Orbital Mechanics and more.'}
              </p>
            </Link>

            <Link href="/map" className={styles.card}>
              <div className={styles.imageGif}>
                <img src="gifMap2D.gif" alt="" />
              </div>
              <h2 style={{ fontSize: '36px' }}>
                {lng === 'ESP' ? 'Mapa 2D' : '2D Map'}
              </h2>
              <p style={{ fontFamily: ['Alumni Sans Pinstripe', 'sans-serif'] }}>
                {lng === 'ESP'
                  ? 'Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 3D interactivo con los satélites disponibles en tiempo real.'
                  : 'Learn about tracks, orbital objects and locations on an interactive 3D map with available satellites in real time.'}
              </p>
            </Link>

            <Link href="/map3D" className={styles.card}>
              <div className={styles.imageGif}>
                <img src="gifMap3D.gif" alt="" />
              </div>
              <h2 style={{ fontSize: '36px' }}>
                {lng === 'ESP' ? 'Mapa 3D' : '3D Map'}
              </h2>
              <p>
                {lng === 'ESP'
                  ? 'Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 3D interactivo con los satélites disponibles en tiempo real.'
                  : 'Learn about tracks, orbital objects and locations on an interactive 3D map with available satellites in real time.'}
              </p>
            </Link>

            <Link href="/satelites" className={styles.card}>
              <div className={styles.imageGif}>
                <img src="sats.webp" alt="" />
              </div>
              <h2 style={{ fontSize: '36px' }}>
                {lng === 'ESP' ? 'Satélites' : 'Satellites'}
              </h2>
              <p>
                {lng === 'ESP'
                  ? `Información miscelánea sobre satélites, tipos de traza, estadístico de países, etc. Se está monitorizando un total de ${active.length} satélites`
                  : `Miscellaneous information on satellites, track types, country statistics, etc. A total of ${active.length} satellites are being monitorized.`}
              </p>
            </Link>
          </div>

          <Link href="/about">
            <h4 style={{ position: 'absolute', top: '95%', right: '5%', fontSize: '20px', padding: 0, margin: 0, height: '15px' }}>
              {lng === 'ESP' ? 'Acerca de' : 'About'}
            </h4>
          </Link>
        </main>
      </div>
    </>
  )
}


