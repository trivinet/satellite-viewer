import Head from 'next/head'
import styles from '../styles/Docu.module.css'
import Sidebar from '../components/sidebar'
import Language from '../components/language'
import React, {useEffect, useState} from 'react'
import {darkGlobal, lngGlobal} from '../pages/_app'

const tle = `ISS (ZARYA)
1 25544U 98067A   22200.18518544  .00008537  00000+0  15726-3 0  9998
2 25544  51.6408 178.1024 0004971  26.6345  84.2777 15.50023189 350148`; 



export default function About(){
  /* const [dark,setDark] = useState(darkGlobal); */
  const [dark,setDark] = useState(darkGlobal);
  console.log(darkGlobal?('true'):('false'))
  const [lng,setLng] = useState(lngGlobal);
  const [sidebarOpen,setSidebarOpen] = useState(false);

  useEffect(() => {
    darkGlobal = dark,
    console.log(darkGlobal?('true'):('false'));}, [dark]);
  useEffect(() => {
    lngGlobal = lng;}, [lng]);

  function assignTheme(){
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
  
  return(
    <> 
    <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen} lng={lng}/>
    
  <div className={(dark)?(styles.container):(styles.containerLight)}>
     <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={assignTheme()}>
      <h1 className={(dark)?(styles.title):(styles.titleLight)} style={{'fontSize':'86px'}}><a className={styles.logo}>{/* <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png'}/>
        </a> */}ABOUT <a className={styles.imageGifTitle}>
            <img href = "/about" src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a>  
        </h1> 
        
        <p>Esta página ha sido producto de un Trabajo de Fin de Grado para la <a href={'https://www.upc.edu/es'} style={{textDecoration:'underline'}} target='_blank' rel="noreferrer">Universidad Politécnica de Cataluña</a>, en la <a style={{textDecoration:'underline'}} href={'https://eetac.upc.edu/es'} target='_blank' rel="noreferrer">Escuela de Ingeniería Técnica y Aeroespacial de Castelldefels</a> (EETAC), titulación en Grado de Sistemas Aeroespaciales</p>
        <h2 href={'https://twitter.com/sats_viewer'} target='_blank' rel="noreferrer" /* style= { dark ?{'background':'grey'} : {'background' : 'orange'}} */>Podrás encontrar más infomarción sobre la página en Twitter</h2>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p>Satellite-Viewer es un proyecto realizado por José Triviño Ruiz.</p>
        <p>Septiembre del 2022</p>
      </main>
      </div>
      <Language setLng={setLng}/>
      </>
  )
}