import Head from 'next/head'
import styles from '../styles/Docu.module.css'
import assignTLE from './assignTLE'
import Sidebar from '../components/sidebar'
import React, { useState} from 'react';


const tle = `ISS (ZARYA)
1 25544U 98067A   22200.18518544  .00008537  00000+0  15726-3 0  9998
2 25544  51.6408 178.1024 0004971  26.6345  84.2777 15.50023189 350148`; 



export default function about(){
  const [dark,setDark] = useState(true);
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [environment,setEnvironment] = useState({
    lighting: {
      // enable shadows for all the objects in a scene
      directShadowsEnabled: false,
      // set the date and a time of the day for the current camera location
      //date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
    }  
  });
const [basemap,setBasemap] = useState("dark-gray-vector");

function assignTheme(dark){
  {if(dark){
    if(dark,sidebarOpen){
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
    <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen} setBasemap={setBasemap} setEnvironment={setEnvironment}/>
  <div className={styles.container}>
     <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={assignTheme(dark,sidebarOpen)}>
      <h1 className={styles.title} style={{'fontSize':'86px'}}><a className={styles.logo}>{/* <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png'}/>
        </a> */}ABOUT <a className={styles.imageGifTitle}>
            <img href = "/about" src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a>  
        </h1> 
        
        <p>Esta página ha sido producto de un Trabajo de Fin de Grado para la <a href={'https://www.upc.edu/es'} style={{textDecoration:'underline'}} target='_blank'>Universidad Politécnica de Cataluña</a>, en la <a style={{textDecoration:'underline'}} href={'https://eetac.upc.edu/es'} target='_blank'>Escuela de Ingeniería Técnica y Aeroespacial de Castelldefels</a> (EETAC), titulación en Grado de Sistemas Aeroespaciales</p>
        <h2 href={'https://twitter.com/sats_viewer'} target='_blank'>Podrás encontrar más infomarción sobre la página en Twitter</h2>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p>Satellite-Viewer es un proyecto realizado por José Triviño Ruiz.</p>
        <p>Septiembre del 2022</p>
      </main>
      </div>
      </>
  )
}