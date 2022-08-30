import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Tle from './tle'
import Link from 'next/link'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook,faBookOpen,faMap,faSatellite,faAtom } from '@fortawesome/free-solid-svg-icons'
import active from './active.json'
import { Scrollbars } from 'react-custom-scrollbars';



export default function Home() {

  const [dark,setDark] = useState(true);
  const [sidebarOpen,setSidebarOpen] = useState(false);

  function assignTheme(dark){
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

  return (
    <>
    <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>
    <div className={styles.container}>
    
      <Head>
        <title>Satellite Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      {/* <a href='/about' className={styles.about}>About</a> */}
      <main className={assignTheme(dark,sidebarOpen)}>
        <h1 className={styles.title} style={{'font-size':'86px'}}>
          Bienvenido a <a href="/" className={styles.logo}>{/* <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png'}/>
        </a> */}Satellite Viewer <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a>  
        </h1>
        {/* <h2 style={{position:'fixed', bottom:'5%',right:'5%', borderEndEndRadius:'43%', borderTopLeftRadius:'57%', borderEndStartRadius:'53%' , borderTopRightRadius:'73%', borderEndStartRadius:'35%', borderBottomLeftRadius:'60%', borderBottomRightRadius:'42%', borderBottomRightRadius:'48%', backgroundImage:'-webkit-linear-gradient(225deg, #9c27b0 20%, #aeaeae 100%)', padding:'1.5%'}}>Servidor <hserver className={styles.hserver}>{} ON</hserver></h2> */}

        {/* (<Tle></Tle>) */} 

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}
        
        
        <div className={styles.grid}>
          <a href="/docu" className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/docu" src ={'https://es.bloggif.com/output/6/7/6797c912efade8cb7f01404744fc2a60.gif?1661873354'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faBook} width={'100px'} cursor={'pointer'}/> */} Documentación{/* </icon> */} {/* &darr; */}</h2>
            <p>Encuentra información en profundidad sobre TLEs, Mecánica Orbital y más.</p>
          </a>

          <a href="/map" className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/docu" src ={'https://es.bloggif.com/output/1/f/1f2f8d9100bd1204591d605df40c50d0.gif?1661852652'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faMap} width={'100px'} cursor={'pointer'}/> */} Mapa 2D{/* </icon> */} {/* &darr; */}</h2>
            <p>Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 2D interactivo con todos los satélites disponibles en tiempo real.</p>
            <i> </i>
          </a>

          <a href="/map3D" className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/docu" src ={'https://es.bloggif.com/output/0/a/0a39249124b276dfcd56ff0c6ae3de9c.gif?1661855175'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faAtom} width={'100px'} cursor={'pointer'}/> */} Mapa 3D{/* </icon> */} {/* &darr; */}</h2>
            <p>
            Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 3D interactivo con todos los satélites disponibles en tiempo real.
            </p>
          </a>

          <a href="/satelites" className={styles.card}>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faSatellite} width={'100px'} cursor={'pointer'}/> */} Satélites{/* </icon> */} {/* &darr; */}</h2>
            <p>Información miscelánea sobre satélites, tipos de traza, estadístico de países, etc. Se han cargado un total de {active.length} satélites</p>
          </a>
          <a href="/about" className={styles.card} style={{position:'fixed',bottom:'5%',right:'5%',width:'4.2%',height:'6%',padding:'0.8%',margin:'0px'}}>
            <h2 style={{'font-size':'20px'}}>{/* <icon><FontAwesomeIcon icon={faSatellite} width={'100px'} cursor={'pointer'}/> */} About{/* </icon> */} {/* &darr; */}</h2>
          </a>

          {/* style={{position:'fixed', bottom:'5%',right:'15%', borderEndEndRadius:'43%', borderTopLeftRadius:'57%', borderEndStartRadius:'53%' , borderTopRightRadius:'73%', borderEndStartRadius:'35%', borderBottomLeftRadius:'60%', borderBottomRightRadius:'42%', borderBottomRightRadius:'48%', backgroundImage:'-webkit-linear-gradient(225deg, #9c27b0 20%, #aeaeae 100%)', padding:'1.5%'}} */} 
        </div>
      </main>
      
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <a> 
        <Link href="/about">
          <a >About</a>
        </Link>
        </a>
      </footer> */}
    </div>
    
    </>
  )
}

/* Home.getLayout = function getLayout(page) {
  return (
    <Layout>
     
      {page}
    </Layout>
  )
} */

