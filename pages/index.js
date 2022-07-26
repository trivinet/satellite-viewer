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


export default function Home() {

  const [dark,setDark] = useState(true);
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [hover, setHover] = useState(false);

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
    <div className={styles.container} style={{ height: '100vh' , width: '100%'}}>
      <Head>
        <title>Satellite Viewer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={assignTheme(dark,sidebarOpen)}>
        <h1 className={styles.title}>
          Welcome to <a href="/">Satellite-Viewer!</a>
        </h1>
        <h2>Server <hserver className={styles.hserver}>{(<Tle></Tle>)}</hserver></h2>
        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}
        
        <div className={styles.grid}>
          <a href="/docu" className={styles.card}>
            <h2><icon><FontAwesomeIcon icon={faBook} width={'100px'} cursor={'pointer'}/>Documentation</icon> &rarr;</h2>
            <p>Find in-depth information about TLE, Orbital Mechanics and more.</p>
          </a>

          <a href="/map" className={styles.card}>
            <h2><icon><FontAwesomeIcon icon={faMap} width={'100px'} cursor={'pointer'}/>2D Maps</icon> &rarr;</h2>
            <p>Learn about traces, orbital shapes and locations in an interactive map with every available Satellite</p>
            <i> </i>
          </a>

          <a href="/satelites" className={styles.card}>
            <h2><icon><FontAwesomeIcon icon={faSatellite} width={'100px'} cursor={'pointer'}/>Satélites</icon> &rarr;</h2>
            <p>Se han cargado un total de {active.length} satélites</p>
          </a>

          <a
            href="/Map3D"
            className={styles.card}
          >
            <h2><icon><FontAwesomeIcon icon={faAtom} width={'100px'} cursor={'pointer'}/>3D Maps</icon> &rarr;</h2>
            <p>
            Learn about traces, orbital shapes and locations in an interactive 3D map with every available Satellite
            </p>
          </a>
        </div>
       
      </main>

      <footer className={styles.footer}>
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
          <a>About</a>
        </Link>
        </a>
      </footer>
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
