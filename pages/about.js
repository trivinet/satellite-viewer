import Head from 'next/head'
import styles from '../styles/Docu.module.css'
import Sidebar from '../components/sidebar'
import Language from '../components/language'
import React, {useEffect, useState} from 'react'
import {lightGlobal, lngGlobal} from '../pages/_app'

const tle = `ISS (ZARYA)
1 25544U 98067A   22200.18518544  .00008537  00000+0  15726-3 0  9998
2 25544  51.6408 178.1024 0004971  26.6345  84.2777 15.50023189 350148`; 



export default function About(){
  
  const [light,setLight] = useState(lightGlobal);
  const [lng,setLng] = useState(lngGlobal);
  const [sidebarOpen,setSidebarOpen] = useState(false);

  useEffect(() => {
    lightGlobal = light;}, [light]);
  useEffect(() => {
    lngGlobal = lng;}, [lng]);

  function assignTheme(){
    {if(light){
      if(sidebarOpen){return (styles.main)}
      else {return (styles.mainClose)}}
      else{
        if(sidebarOpen){return (styles.mainDark)}
          else {return (styles.mainDarkClose)}
      }
  }}
  
  return(
    <> 
    <Sidebar setLight={setLight} setSidebarOpen={setSidebarOpen} lng={lng}/>
    
  <div className={(light)?(styles.containerLight):(styles.container)}>
     <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={assignTheme()}>
      <h1 className={(light)?(styles.titleLight):(styles.title)} style={{'fontSize':'86px'}}><a className={styles.logo}>{/* <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png'}/>
        </a> */}{(lng == 'ESP')?("ACERCA DE "):("ABOUT ")}<a className={styles.imageGifTitle}>
            <img href = "/about" src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a>  
        </h1> 
        
        <p>{(lng == 'ESP')?("Esta página fue inicialmente producto de un Trabajo de Fin de Grado para la titulación de Ingeniería Aeroespacial, en un programa de movilidad para la "):("This webpage was initially created as a project to obtain the Bachelor's Degree of Aerospace Engineering for ")}<a href={'https://www.us.es/'} style={{textDecoration:'underline'}} target='_blank' rel="noreferrer">Universidad de Sevilla</a>{(lng == 'ESP')?(" y la "):(" and ")}<a href={'https://www.upc.edu/es'} style={{textDecoration:'underline'}} target='_blank' rel="noreferrer">Universidad Politécnica de Cataluña</a></p>
        <h2 href={'https://twitter.com/sats_viewer'} target='_blank' rel="noreferrer"> {(lng == 'ESP')?("Podrás encontrar más información sobre la página en X (antiguamente Twitter)"):("You'll find more info about the status of the webpage on X (former Twitter)")}</h2>
        <p>{(lng == 'ESP')?("Contáctame por LinkedIn o a la cuenta oficial de X (Twitter)"):("Contact me via LinkedIn or directly to the official account of X (Twitter)")}</p>
        <p></p>
        <p></p>
        <p></p>
        <p>{(lng == 'ESP')?("Satellite-Viewer es un proyecto realizado por José Triviño Ruiz."):("Satellite-Viewer is a project created and developed by José Triviño Ruiz")}</p>
        <p>{(lng == 'ESP')?("Septiembre del 2022"):("September of 2022")}</p>
      </main>
      </div>
      <Language setLng={setLng}/>
      </>
  )
}