import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/satelites.module.css'
import Tle from './tle'
import Link from 'next/link'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook,faBookOpen,faMap,faSatellite,faAtom } from '@fortawesome/free-solid-svg-icons'
import active from './active.json'
import { Scrollbars } from 'react-custom-scrollbars';
import * as React from 'react';


/* export default function BasicTable() {
  return (
    
  );
} */




export default function Satelites() {

  const [dark,setDark] = useState(true);
  const [sidebarOpen,setSidebarOpen] = useState(false);

  function assignTheme(){
      if(sidebarOpen){
      return (styles.mainDark)}
      else {return (styles.mainDarkClose)}}

  return (
    <>
    <Sidebar setDark={setDark} setSidebarOpen={setSidebarOpen}/>
    <div className={styles.container}>
    
      <Head>
        <title>Satélites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      {/* <a href='/about' className={styles.about}>About</a> */}
      <main className={assignTheme()}>
        <h1 className={styles.title} style={{'font-size':'86px'}}><a href="/" className={styles.logo}>{/* <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png'}/>
        </a> */}Satélites <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a>  
        </h1>
        
        <div className={styles.grid}>
          <a href={`https://pbs.twimg.com/media/FbpdscqWYAA_DK8?format=png&name=small`} target="_blank" className={styles.card}>
          <div className={styles.imageGif}>
            <img href = {`https://pbs.twimg.com/media/FbpdscqWYAA_DK8?format=png&name=small`} target="_blank" src ={'https://pbs.twimg.com/media/FbpdscqWYAA_DK8?format=png&name=small'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faBook} width={'100px'} cursor={'pointer'}/> */} HISTÓRICO{/* </icon> */} {/* &darr; */}</h2>
            <p></p>
          </a>

          <a href="https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2018/07/ard-new.jpg" target='_blank' className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2018/07/ard-new.jpg" target='_blank' src ={'https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2018/07/ard-new.jpg'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faMap} width={'100px'} cursor={'pointer'}/> */} USOS{/* </icon> */} {/* &darr; */}</h2>
            <p></p>
            <i> </i>
          </a>

          <a href="https://spaceflight101.com/wp-content/uploads/2017/12/2017-Stats-2.jpg" target='_blank' className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "https://spaceflight101.com/wp-content/uploads/2017/12/2017-Stats-2.jpg" target='_blank' src ={'https://spaceflight101.com/wp-content/uploads/2017/12/2017-Stats-2.jpg'}/>
          </div>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faAtom} width={'100px'} cursor={'pointer'}/> */} FAMILIAS MÁS IMPORTANTES{/* </icon> */} {/* &darr; */}</h2>
            <p></p>
          </a>

          <a href="https://spaceflight101.com/wp-content/uploads/2017/12/2017-Stats-1.jpg" target='_blank' className={styles.card}>
          <div className={styles.imageGif}>
            <img href = "https://spaceflight101.com/wp-content/uploads/2017/12/2017-Stats-1.jpg" target='_blank' src ={'https://spaceflight101.com/wp-content/uploads/2017/12/2017-Stats-1.jpg'}/>
          </div>
          <div className={styles.imageGif}>
            <img href = {`https://pbs.twimg.com/media/Fbpg5zoXoAE7vh9?format=jpg&name=medium`} target='_blank' src ={'https://pbs.twimg.com/media/Fbpg5zoXoAE7vh9?format=jpg&name=medium'}/>
          </div>
          
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faSatellite} width={'100px'} cursor={'pointer'}/> */} DISTRIBUCIÓN POR PAÍSES{/* </icon> */} {/* &darr; */}</h2>
            <p></p>
          </a>

          <a href={`https://pbs.twimg.com/media/Fbph1UlXEAEFQRA?format=jpg&name=large`} target='_blank' className={styles.card}>
            <h2 style={{'font-size':'36px'}}>{/* <icon><FontAwesomeIcon icon={faSatellite} width={'100px'} cursor={'pointer'}/> */} BUSCADOR{/* </icon> */} {/* &darr; */}</h2>
            <div className={styles.imageGif}>
            <img href = {`https://pbs.twimg.com/media/Fbph1UlXEAEFQRA?format=jpg&name=large`} target='_blank' src ={`https://pbs.twimg.com/media/Fbph1UlXEAEFQRA?format=jpg&name=large`}/>
          </div>
            <p></p>
          </a>

          <a href="/about"  style={{position:'fixed',bottom:'5%',right:'5%',width:'4.2%',height:'6%',padding:'0.8%',margin:'0px'}}>
            <h2 style={{'font-size':'20px'}}>{/* <icon><FontAwesomeIcon icon={faSatellite} width={'100px'} cursor={'pointer'}/> */} About{/* </icon> */} {/* &darr; */}</h2>
          </a>
        </div>
      </main>
    </div>
    
    </>
  )
}


