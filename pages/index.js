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

  return (
    <>
    <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>
    <div className={(dark)?(styles.containerDark):(styles.containerLight)}>
    
      <Head>
        <title>Satellite Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      {/* <a href='/about' className={styles.about}>About</a> */}
      <main className={assignTheme(dark,sidebarOpen)}>
        <h1 className={(dark)?(styles.title):(styles.titleLight)} style={{'font-size':'86px'}}>
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
            <img href = "/docu" src ={'https://s6.gifyu.com/images/gifDocu.gif'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faBook} width={'100px'} cursor={'pointer'}/> */} Documentación{/* </icon> */} {/* &darr; */}</h2>
            <p>Encuentra información en profundidad sobre TLEs, Mecánica Orbital y más.</p>
          </a>

          <a href="/map" className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/map" src ={'https://s6.gifyu.com/images/gifMap2D.gif'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faMap} width={'100px'} cursor={'pointer'}/> */} Mapa 2D{/* </icon> */} {/* &darr; */}</h2>
            <p>Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 2D interactivo con todos los satélites disponibles en tiempo real.</p>
            <i> </i>
          </a>

          <a href="/map3D" className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/map3D" src ={'https://s6.gifyu.com/images/gifMap3D94990f84b961d5f6.gif'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faAtom} width={'100px'} cursor={'pointer'}/> */} Mapa 3D{/* </icon> */} {/* &darr; */}</h2>
            <p>
            Aprende sobre trazas, objetos orbitales y ubicaciones en un mapa 3D interactivo con todos los satélites disponibles en tiempo real.
            </p>
          </a>

          <a href="/satelites" className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "/satelites" src ={'https://media4.giphy.com/media/drPdD8XyDK3EfEj12G/giphy.gif?cid=790b76117d33aa9883ba5ecc6185e3438ba2509dd24de2cc&rid=giphy.gif&ct=g'}/>
          </div>
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

