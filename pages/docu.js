import Head from 'next/head'
import styles from '../styles/Docu.module.css'
import assignTLE from '../components/assignTLE'
import Sidebar from '../components/sidebar'
import Language from '../components/language'
import Layout from '../components/layout'
import React, { useState, useEffect } from 'react';
import { getLatLngObj } from "tle.js";
import InfoBoxPrint from '../components/infoBoxPrint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faChevronLeft,faSearch,faMap,faInfo,faMoon,faSun,faAnglesUp,faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip';
import YouTube from 'react-youtube';
import Link from 'next/link'
import {lightGlobal, lngGlobal} from '../pages/_app'

const tle = `0 STARLINK-2360
1 47900U 21021AS  22242.39477444 -.00000011  00000-0  18195-4 0  9991
2 47900  53.0546 290.5183 0001524  79.7172 280.3988 15.06393353 82172`; 

export default function Docu(){
  const [light,setLight] = useState(lightGlobal);
  const [lng,setLng] = useState(lngGlobal);
  const [sidebarOpen,setSidebarOpen] = useState(false);

  const [bisiesto, setBisiesto] = useState(false);

  const [contexto, setContexto] = React.useState(false);
  const [coordenadas,setCoordenadas] = React.useState(false);
  const [propagador,setPropagador] = React.useState(false);
  const [teoriaMecOrb,setTeoMecOrb] = React.useState(false);
  const [infoTLE, setInfoTLE] = React.useState(false);
  const [calculos, setCalculos] = React.useState(false);
  const [satelites, setSatelites] = React.useState(false);
  const [enlaces, setEnlaces] = React.useState(false);
  const [tutorial, setTutorial] = React.useState(false);
  
  useEffect(() => {
    lightGlobal = light;}, [light]);
  useEffect(() => {
    lngGlobal = lng;}, [lng]);

  function assignTheme(light){
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

  function dia (stringEpoch, last2epoch) { 
    var mes;
    var dia;
    var hora;
    var minuto;
    
    var resto = '0.'+stringEpoch.substring(4,13);
    var atr = 'th';
  
    hora = ("0" + Math.floor(resto*24)).slice(-2);
    minuto = ("0" + Math.floor((resto*24-hora)*60)).slice(-2);
  
    switch (last2epoch%4) {
      case 0:
      setBisiesto(true);
      break;
      default:
        if(last2epoch == '00'){setBisiesto(true);}}
  
    if (stringEpoch.substring(0,3)< '032') {
      mes = (lng=='ESP')?("Enero"):('January');
      dia = stringEpoch.substring(1,3);
    } else if (stringEpoch.substring(0,3)< '060' && bisiesto==false) {
      mes = (lng=='ESP')?("Febrero"):('February');
      dia = Math.abs(stringEpoch.substring(1,3)-31);
    } else if (stringEpoch.substring(0,3)< '061' && bisiesto==true) {
      mes = (lng=='ESP')?("Febrero"):('February');
      dia = Math.abs(stringEpoch.substring(0,3)-31);
    } else if (stringEpoch.substring(0,3)< '091' && bisiesto==false) {
      mes = (lng=='ESP')?("Marzo"):('March');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28);
    } else if (stringEpoch.substring(0,3)< '092' && bisiesto==true) {
      mes = (lng=='ESP')?("Marzo"):('March');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29);
    } else if (stringEpoch.substring(0,3)< '121' && bisiesto==false) {
      mes = (lng=='ESP')?("Abril"):('April');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31);
    } else if (stringEpoch.substring(0,3)< '122' && bisiesto==true) {
      mes = (lng=='ESP')?("Abril"):('April');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31);
    } else if (stringEpoch.substring(0,3)< '152' && bisiesto==false) {
      mes = (lng=='ESP')?("Mayo"):('May');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30);
    } else if (stringEpoch.substring(0,3)< '153' && bisiesto==true) {
      mes = (lng=='ESP')?("Mayo"):('May');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30);
    } else if (stringEpoch.substring(0,3)< '182' && bisiesto==false) {
      mes = (lng=='ESP')?("Junio"):('June');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31);
    } else if (stringEpoch.substring(0,3)< '183' && bisiesto==true) {
      mes = (lng=='ESP')?("Junio"):('June');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31);
    } else if (stringEpoch.substring(0,3)< '213' && bisiesto==false) {
      mes = (lng=='ESP')?("Julio"):('July');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30);
    } else if (stringEpoch.substring(0,3)< '214' && bisiesto==true) {
      mes = (lng=='ESP')?("Julio"):('July');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30);
    } else if (stringEpoch.substring(0,3)< '244' && bisiesto==false) {
      mes = (lng=='ESP')?("Agosto"):('August');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31);
    } else if (stringEpoch.substring(0,3)< '245' && bisiesto==true) {
      mes = (lng=='ESP')?("Agosto"):('August');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31);
    } else if (stringEpoch.substring(0,3)< '274' && bisiesto==false) {
      mes = (lng=='ESP')?("Septiembre"):('September');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31);
    } else if (stringEpoch.substring(0,3)< '275' && bisiesto==true) {
      mes = (lng=='ESP')?("Septiembre"):('September');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31);
    } else if (stringEpoch.substring(0,3)< '305' && bisiesto==false) {
      mes = (lng=='ESP')?("Octubre"):('October');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31-30);
    } else if (stringEpoch.substring(0,3)< '306' && bisiesto==true) {
      mes = (lng=='ESP')?("Octubre"):('October');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31-30);
    } else if (stringEpoch.substring(0,3)< '335' && bisiesto==false) {
      mes = (lng=='ESP')?("Noviembre"):('November');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31-30-31);
    } else if (stringEpoch.substring(0,3)< '336' && bisiesto==true) {
      mes = (lng=='ESP')?("Noviembre"):('November');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31-30-31);
    } else if (stringEpoch.substring(0,3)< '366' && bisiesto==false) {
      mes = (lng=='ESP')?("Diciembre"):('December');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31-30-31-30);
    } else {
      mes = (lng=='ESP')?("Diciembre"):('December');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31-30-31-30);
    }
  
    if (dia%10 == 1) {atr = 'st'} else if (dia%10 == 2) {atr = 'nd'}
  
    return((lng=='ESP')?(`${dia} de ${mes}, a las ${hora}:${minuto}`):(`${dia}${atr} of ${mes}, at ${hora}:${minuto}`))
  
  }

  var espaciado = [];
  if((!contexto) && (!coordenadas) && (!teoriaMecOrb) && (!infoTLE) && (!calculos) && (!satelites) && (!enlaces) && (!tutorial) ){
    espaciado=[];
  }
  else{espaciado.push(<><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></>);}


  class Example extends React.Component {
    render() {
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          /* autoplay: 1, */
        },
      };
  
      return <YouTube videoId="Ygvrm6NiSJA" opts={opts} onReady={this._onReady} />;
    }
  
    _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }
  }




  return(
    <> 
  <Sidebar setLight={setLight} setSidebarOpen={setSidebarOpen} lng={lng}/>
  <Language setLng={setLng}></Language>
  <div className={(light)?(styles.containerLight):(styles.container)}>
     <Head>
        <title>{(lng == 'ESP')?('Documentación'):('Documentation')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <main className={assignTheme(light,sidebarOpen)}>
        <h1 className={(light)?(styles.titleLight):(styles.title)} style={{'fontSize':'66px'}}>
        <Link href="/docu" ><a className={styles.logo}>{/* <a className={styles.imageGifTitle}>
            <img href = "/" src ={'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png'}/>
        </a> */}{(lng == 'ESP')?('Documentación'):('Documentation')}<a className={styles.imageGifTitle}>
            <img src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a></Link>
        </h1>

        <h2 onClick={() =>setContexto((p)=>!p)}><icon><FontAwesomeIcon icon={(contexto)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(' Contexto'):(' Context')}</icon></h2>
              {contexto?(<>{<>

                <h3>{(lng == 'ESP')?('Resumen del proyecto'):('Project summary')}</h3>
        <p>{(lng == 'ESP')?('El objetivo del proyecto es el diseño de una aplicación web en la cual puedan visualizarse de forma intuitiva, didáctica y sencilla las diferentes características de los satélites que existen orbitando la tierra. Se trata de establecer una guía teórica y breves explicaciones sobre el funcionamiento de los mismos, así como la muestra de los mapas desde donde se pueda visualizar la información básica del satélite.'):('The objective of the project is the design of a web application in which the different characteristics of the satellites orbiting the earth can be visualized in an intuitive, didactic and simple way. The idea is to establish a theoretical guide and brief explanations on how they work, as well as the display of maps from which the basic information of the satellite can be visualized.')}</p>

        <p>{(lng == 'ESP')?('La principal fuente de información son los conocidos TLEs (Two-Lines-Element), un formato de datos con una lista de elementos para un objeto en un tiempo dado, que, junto al propagador (SGP4) proporciona todos los datos necesarios para la caracterización de las órbitas. La información de estos TLEs es oficialmente proporcionada de forma pública por la compañía Celestrak (coworker de Space-Track, proyecto inicialmente desarrollado por US Air Force). Además, la totalidad de componentes y librerías usadas en este proyecto son de uso público.'):('The main source of information are the well-known TLEs (Two-Lines-Element), a data format with a list of elements for an object at a given time, which, together with the propagator (SGP4) provides all the necessary data for the characterization of the orbits. The information of these TLEs is officially provided publicly by the company Celestrak (co-worker of Space-Track, a project initially developed by the US Air Force). In addition, all the components and libraries used in this project are publicly available.')}</p>

        <p>{(lng == 'ESP')?('Existen multitud de funcionalidades que se han tratado de implementar en la medida de lo posible en la Web App: diferentes visualizados, filtrado de información, historia, comparaciones y cálculos, entre otras. Pero es el apartado de ‘familias’ de satélites el que se ha desarrollado in extenso, puesto que es el que tiene un especial interés de cara al uso de la página web en un futuro. Con la implementación de este apartado especial para las familias, se tratan campos como la cobertura, descripción de las órbitas o la ocupación del espacio usado.'):("There are many functionalities that we have tried to implement as much as possible in the Web App: different visualizations, information filtering, history, comparisons and calculations, among others. But it is the 'families' of satellites section that has been developed in extenso, since it is the one that has a special interest for the use of the website in the future. With the implementation of this special section for families, fields such as coverage, description of the orbits or the occupation of the space used are dealt with.")}</p>

        <p>{(lng == 'ESP')?("Este proyecto no pretende más que aclarar el espacio exterior al usuario medio y ‘acercar’ la industria aeroespacial a aquellos que se interesen en el tema. Es por ello que se cataloga como un proyecto divulgativo, ya que, si bien es científico y trata cuestiones complejas, es para todos los públicos y no se requiere de profundo conocimiento previo para hacer uso del mismo. Para estudios más sofisticados y de elevada complejidad, existen herramientas más adecuadas que el proyecto que se plantea realizar."):("This project aims to clarify the outer space to the average user and 'approach' the aerospace industry to those who are interested in the subject. That is why it is cataloged as an informative project, because, although it is scientific and deals with complex issues, it is for all audiences and does not require deep prior knowledge to make use of it. For more sophisticated and highly complex studies, there are more appropriate tools than the project to be carried out.")}</p>

                <h3>{(lng == 'ESP')?('Objetivos'):('Objectives')}</h3>
        <p>{(lng == 'ESP')?("Puesto que un proyecto carece de sentido sin objetivos iniciales, en este apartado están recogidas las metas que se tratan de alcanzar en la puesta apunto de esta aplicación web. Si bien todas ellas son importantes, no dejan deser, como se ha mencionado, metas. En todo proyecto existen objetivos iniciales que pueden estar sujetos a cambios, mejoras o incluso cancelaciones, por lo que esto consiste realmente en una recopilación de las características buscadas inicialmente en la aplicación."):("Since a project is meaningless without initial objectives, this section contains the goals to be achieved in the development of this web application. Although all of them are important, they do not cease to be, as mentioned, goals. In any project there are initial objectives that may be subject to changes, improvements or even cancellations, so this is really a compilation of the features initially sought in the application.")}</p>
        
        <h3>{(lng == 'ESP')?('Herramientas'):('Tools')}</h3>

        <p>{(lng == 'ESP')?('Tal y como el título del proyecto reza, la página deberá estar dotada de herramientas de visionado, objetivo primordial y primario de este proyecto. La intención es hacer un visor estético, intuitivo y agradable al usuario, así como potente y rápido a la hora del renderizado de información seleccionada. Dichas herramientas de visionado serán de dos clases: mapa 2D y mapa 3D. Ambas tendrán las mismas funcionalidades y serán directamente accesibles desde la pestaña de inicio de la página web, resaltando así su importancia y haciendo ver al usuario que es el motivo por el que la web es creada.'):('As the title of the project says, the site must be equipped with viewing tools, which is the primary objective of this project. The intention is to make an aesthetic, intuitive and user-friendly viewer, as well as a powerful and fast powerful and fast when rendering selected information. These viewing tools will be of two kinds: 2D map and 3D map. Both will have the same functionalities and will be directly accessible from the home page tab of the directly accessible from the home tab of the web page, highlighting its importance and making the user making the user see that it is the reason why the web is created.')}</p>

        <p>{(lng == 'ESP')?('En cuanto a las funcionalidades esenciales que se plantean incluir, están la de visionado del satélite en un tiempo dado (generalmente en el momento en el que se haga la petición), la caracterización de la posición (latitud, longitud, altitud), de la órbita (semieje mayor, excentricidad, inclinación, ascensión recta del nodo ascendente, argumento del perigeo, anomalía verdadera) y una breve indicación sobre el satélite o la familia de satélites en cuestión, ya sea la identificación NORAD o el nombre estandarizado.'):('As for the essential functionalities to be included, there are the following ones: satellite visualization at a given time (generally at the time the request is made), position characterization (latitude, longitude, altitude, etc.), position the request is made), the characterization of the position (latitude, longitude, altitude), of the orbit (semi-major axis, eccentricity, inclination, right ascension of the ascending node, argument of the ascending node, argument of perigee, true anomaly) and a brief indication of the the satellite or satellite family in question, either the NORAD identification or the standard NORAD identification or the standardized name.')}</p>
        
        <p>{(lng == 'ESP')?('Además del apartado gráfico, existen dos cuestiones que se consideran como objetivos esenciales en este trabajo: el filtrado y exposición de los cuerpos que orbitan la tierra (apartado Satélites) y la documentación  apartado de Documentación).'):('In addition to the graphic side, there are two issues that are considered as essential objectives in this work: the filtering and exposure of the bodies orbiting the earth (Satellite section) and the documentation (Documentation section).')}</p>

        <p>{(lng == 'ESP')?('En cuanto al apartado satélites, se pretende mostrar al usuario de forma clara y breve algunas de las familias más importantes que existen en la actualidad, los la clasificación de los mismos en función de los tipos de órbita, propósito o fecha, y algunos ejemplos visuales de estos mostrados mediante las herramientas de visualizado 2D y 3D.'):('As for the satellite section, it is intended to show the user in a clear and brief way some of the most important families that currently exist, their classification according to the type of orbit, purpose or date, and some visual examples of these shown by means of 2D and 3D visualization tools.')}</p>

        <p>{(lng == 'ESP')?('Por último, la documentación recogerá las publicaciones más relevantes en cuanto a la teoría satelital esencial se refiere, así como teoría complementaria sobre mecánica orbital, historia aeroespacial e incluso esta misma memoria, que pueda servir como ilustración de cómo la plataforma ha sido creada, las funciones que tiene, cómo se han de emplear y qué objetivos y limitaciones recoge.'):('Finally, the documentation will include the most relevant publications on essential satellite theory as well as complementary theory. essential satellite theory, as well as complementary theory on orbital mechanics, aerospace history and even this on orbital mechanics, aerospace history and even this memory itself, which can serve as an illustration of how the platform has been illustrate how the platform has been created, the functions it has, how it should be functions it has, how they are to be used, and what objectives and limitations it it collects.')} </p>

       {/*  <p>{(lng == 'ESP')?('Público'):('Audience')}</p>
        
        <p>La plataforma será creada en local por el desarrollador y mostrada al tribunal de
        evaluación del Trabajo de Fin de Grado y su publicación recaerá únicamente en
        la decisión del desarrollador, siendo su criterio el decisivo a la hora de la salida
        al público de esta. Es importante destacar que el proyecto se desarrolla en un
        marco legal donde toda la información es pública, las librerías son de uso público
        y todo aquello que conforma el proyecto es de carácter público, por lo que en
        cualquier momento está preparada para ver la luz, no siendo la legalidad un
        problema para esta.</p>

        <p>Una vez lanzada, si es que esto ocurre, la intención es meramente didáctica y
        divulgativa. Este proyecto desea acercar la industria aeroespacial a aquellos que
        así lo desean y mediante un software sencillo de usar. Por lo que los objetivos
        relacionados con el público se centran en la satisfacción de las inquietudes que
        el consumidor tenga relacionadas con este campo.</p> */}

       {/*  <p>FUNCIONALIDADES EXTRA</p>

        <p>En el resumen se mostraban algunas de las razones por las que este trabajo se
        ha puesto en marcha, por lo que existe justificación más que de sobra como para
        crear el proyecto. No obstante, existen una serie de funcionalidades que no son
        fácilmente accesibles en otros softwares y que se tratará de implementar en la
        medida de lo posible para hacer destacar aún más su valor de cara al público.</p>

        <p>En primer lugar, no es trivial hacer la comparativa de ejes inerciales y no
        inerciales en la representación de las órbitas, puesto que estas requieren de altas
        capacidades de visión espacial y un fuerte conocimiento físico. Desde el lado del
        desarrollador y como experiencia personal, se desea implementar una
        funcionalidad de comparativa entre una representación y otra, que deje
        totalmente clara la diferencia entre ambas y que ayude a la comprensión.
        La cobertura es un parámetro que interesa globalmente a personas relacionadas
        con el campo aeroespacial y personas no relacionadas con el mismo, por lo que
        es una rama que tiene interesantes salidas en este proyecto y que podría acabar
        desarrollando toda una nueva plataforma de cara al futuro de este proyecto, por
        lo que se tratará de implementar en la medida de lo posible.</p>

        <p>Por último, y, también relacionado con la cobertura, se pretende hacer alusión a
        los satélites que conforman el sistema ADSB1
        (constelación GNSS) e
        implantar apartados en los que se pueda interactuar con los mismos, de tal forma
        que se integre la industria aeronáutica y aeroespacial en la misma plataforma.</p> */}
        
       {/*  <h3> Limitaciones</h3>
        <p>No es hasta que quedan esclarecidos los objetivos fundamentales que
        comienzan a ser más evidentes las limitaciones que conforman este trabajo. Y
        es que, las intenciones se proyectan de forma ambiciosa y genuina, y es en el
        futuro (tras la aparición de contratiempos y adversidades) cuando la realidad se
        ve totalmente plasmada y es posible la visión global de la plataforma, así como
        sus limitaciones. No obstante, hay parámetros controlables y limitaciones bien
        acotadas que se pueden apuntar desde el más primitivo de los comienzos.</p> */}

        {/* <p>DE USO</p>

        <p>Pese a que la aplicación se construya en las mejores condiciones posibles y
        dentro de los conocimientos más avanzados que el desarrollador conoce, no es
        sencillo estimar la magnitud del público al que irá dirigido en un futuro. Esto
        supone una limitación de uso que viene marcada por la vida útil y actualización
        de las librerías, la consistencia de la página a numerosas entradas simultáneas,
        las adaptaciones futuras y el apoyo que reciba.</p>
        <p>La falta de experiencia por parte del desarrollador puede comprometer
        sustancialmente el producto final de este proyecto, siendo crucial la constante
        consciencia de la meta que se desea obtener y los caminos que se han de
        recorrer. Sin embargo, existen multitud de complicaciones que pueden ocurrir en
        este largo recorrido: falta de conocimientos de programación, errónea elección
        de librerías, implementación de cálculos inexactos, lentos procesados, etcétera.
        Todas estas situaciones tienen solución, pero pueden suponer un fatídico
        resultado si no se tienen continuamente en cuenta.</p>
        <p>Pese a que se cree con la intención de que llegue al mayor número posible de
        personas, se parte de la base de que ya existen softwares extremadamente
        potentes y estandarizados en el panorama. Eso supone que, aunque se haya diseñado para suplir
        carencias de otras alternativas, se es consciente de la superioridad estructural y
        la abundancia de funcionalidades con las que cuentan. En cuanto a herramientas
        se refiere será una plataforma útil y rápida, pero habrá gran cantidad de usos
        que no estarán cubiertos, lo que supone una limitación clara.</p>
        <p>INFRAESTRUCTURA</p>
        <p>Aunque se haga continuamente referencia a alternativas de este proyecto, no se
        puede obviar el hecho de que estos productos vienen de la mano de grandes
        corporaciones y de compañías que cuentan, entre otras cosas, de numerosos
        empleados, dispositivos, hardware y apoyo de otras entidades. Como se ha
        repetido en algunas ocasiones, no se desea competir con ellas, pero no tendría
        sentido no mencionar el hecho de que este proyecto se está desarrollando por
        sólo una persona (el desarrollador de este proyecto).</p>

        <p>Además de las limitaciones de personal, y lo que supone la reducción de la
        creación de toda esta infraestructura a una sola persona, existen limitaciones
        desde la propia máquina que sea responsable de procesar todo este software,
        hasta la falta de conocimiento en campos de estética, captación del usuario,
        informática avanzada, base de datos robusta, cliente siempre en línea, entre
        otras.</p>

        <p>La propia aplicación web es desarrollada en local para su total composición y
        sólo en el caso de que el desarrollador así lo estime o le sea requerido, será
        lanzada a dominio público en internet. En el momento en el que esto ocurre, nace
        la necesidad de comprar/alquilar un dominio web, pagar la base de datos y
        servidor, mantener las librerías que dependen de las visitas (librerías ‘gratuitas’
        como las de Google Maps no suponen coste alguno para pequeños
        desarrolladores, pero empiezan a ser de pago exponencial a medida que se
        aumenta el uso de la misma) y hacerse cargo de la seguridad e integridad de la
        página, que queda expuesta a posibles ataques cibernéticos. Todo esto
        establece una limitación muy comprometedora cuando es sólo una persona
        trabajando en esta infraestructura, razón principal por la que se crea desde el
        primer momento en local.</p>
         */}
        </>}</>):('')}
        <h2><icon onClick={() =>setCoordenadas((p)=>!p)}><FontAwesomeIcon icon={(coordenadas)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(' Sistemas de referencia'):(' Reference systems')}</icon></h2>
              {coordenadas?(<>{<>

        <p>{(lng == 'ESP')?("En este proyecto, y, en toda la teoría orbital, se tratará normalmente con dos tipos de coordenadas: el sistema inercial o ECI (de sus siglas en inglés “Earth-Centered Inertial”, Inercial Centrado en la Tierra) y el sistema no-inercial o ECEF (de sus siglas en inglés “Earth-Centered, Earth-Fixed”, Centrado en la Tierra y Fijado a la Tierra). Ambos comparten la misma coordenada Z, o Eje de Rotación, pero difieren en que el primero de ellos ‘permite’ el giro de la tierra y no gira con ella, siendo la dirección del eje X perpendicular a la coordenada Z y orientada hacia el equinoccio vernal (Primer Punto de Aries, representado como ‘ɤ’). En el caso del sistema ECEF, la dirección del eje X es también perpendicular al eje Z, pero siempre estará fijada con el Meridiano de Greenwich, lo que supone que los ejes ‘giren con ella’, de ahí su nombre de centrado a la tierra y fijado a la tierra. Los ejes Y de ambas representaciones se construyen con un ángulo de 90º con respecto al eje X y sobre el plano ecuatorial, pero no coinciden generalmente por la misma razón que los ejes X no coinciden."):("In this project and in all orbital theory, we will normally deal with two types of coordinates: the Earth-Centered Inertial (ECI) system and the Earth-Centered, Earth-Fixed, Earth-Fixed (ECEF) system. Both share the same Z-coordinate, or Axis of Rotation, but differ in that the former 'allows' the Earth to rotate and does not rotate with it, the direction of the X-axis being perpendicular to the Z-coordinate and oriented towards the vernal equinox (First Point of Aries, represented as 'ɤ'). In the case of the ECEF system, the X-axis direction is also perpendicular to the Z-axis, but will always be fixed with the Greenwich Meridian, which implies that the axes 'rotate with it', hence its name earth-centered and earth-fixed. The Y axes of both representations are constructed at a 90° angle to the X axis and on the equatorial plane, but they do not generally coincide for the same reason that the X axes do not coincide.")}</p>

        <img href = "https://es.mathworks.com/help/aerotbx/ug/coordinate-systems-for-navigation.html" src ={'https://es.mathworks.com/help/aerotbx/ug/eci_ecef1.gif'}/>
        <p style={{textAlign:'center'}}>{(lng == 'ESP')?('Figura obtenida de MathWorks, enlace en '):('Figure obtained in ')}<a style={{color:'#B9EEFF',textDecoration: 'underline'}} target="_blank" rel="noreferrer" href = "https://es.mathworks.com/help/aerotbx/ug/coordinate-systems-for-navigation.html">{(lng == 'ESP')?('este link'):('this link')}</a></p>

        <p>{(lng == 'ESP')?('Aunque aún no sea trivial plasmarlo, en las representaciones 3D de las órbitas que se harán en la aplicación existirá una diferencia radical en la vista de ambos ejes de referencia, siendo la indicación de estos crucial para la correcta lectura de la información. Por otra parte, en la representación 2D sólo se pretenderá visualizar la traza del satélite, por lo que el mapa estará estático para la vista del usuario, siendo semejante a la representación ECEF.'):("Although it is not yet trivial to capture it, in the 3D representations of the orbits that will be made in the application there will be a radical difference in the view of the two orbits. the application there will be a radical difference in the view of both reference axes, being the indication of these crucial for the correct the indication of these axes of reference will be crucial for the correct reading of the information. of the information. On the other hand, in the 2D representation we will only intend to the satellite trace, so that the map will be static for the user's view, being similar to the similar to the ECEF representation.")}</p>

        <p>{(lng == 'ESP')?("Mientras que el sistema de referencia ECI puede parecer menos intuitivo, complicado y con menor número de usos, resulta que el propagador SGP4 (siguiente punto de discusión) usa coordenadas en este sistema de referencia para operar y manejar los parámetros satelitales, por lo que tiene un especial interés conocer este tipo de representación."):("While the ECI reference system may seem less intuitive, complicated and with fewer uses, it turns out that the SGP4 propagator (next discussion point) uses coordinates in this reference system. propagator (next point of discussion) uses coordinates in this reference frame to operate and manage the satellite parameters. to operate and manage the satellite parameters, so it is of special interest to know this type of representation. is of special interest to know this type of representation.")}</p>

        <p>{(lng == 'ESP')?("Cabe aclarar también que, pese a que las representaciones ECEF y ECI consten de los ejes X, Y y Z, son las coordenadas geodésicas longitud (φ) y latitud (λ) (y, en casos concretos, radio (‘ρ’) o altura (‘h’)) las que se usan finalmente en la determinación espacial de los puntos (no así para los cálculos, únicamente como producto final para la comprensión), pero este cambio de variables es trivial, consiste en un cambio de variables cartesianas-esféricas (o cartesianas-polares si no se habla de la traza y se tiene en cuenta la altitud). En las ecuaciones 1, 2 y 3 se muestran los cálculos para la conversión ECEF-cartesianas, partiendo ambas del centro de la tierra como punto de referencia."):("It should also be clarified that, despite the fact that the ECEF and ECI representations consist of the X, Y and Z axes, it is the geodetic coordinates longitude (φ) and latitude (λ) (and, in specific cases, radius ('ρ') or height ('h')) that are finally used in the spatial determination of the points (not so for calculations, only as an end product for understanding), but for understanding), but this change of variables is trivial, it consists of a change of Cartesian-spherical variables (or Cartesian-polar if we do not speak of the if the trace is not mentioned and the altitude is taken into account). In equations 1, 2 and 3 show the calculations for the ECEF-Cartesian conversion, both starting from the center of the earth as reference point.")}</p>
        <p style={{textAlign:'center'}}>𝑥 = 𝑅 · cos λ · cos φ                 (1)</p>
        <p style={{textAlign:'center'}}>𝑦 = 𝑅 · cos λ · sin φ                 (2)</p>
        <p style={{textAlign:'center'}}>𝑧 = 𝑅 · sin λ                         (3)</p>

        </>}</>):('')}


        <h2><icon onClick={() =>setPropagador((p)=>!p)}><FontAwesomeIcon icon={(propagador)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(" Propagador SGP4"):(" SGP4 Propagator")}</icon></h2>
              {propagador?(<>{<>

        <p>{(lng == 'ESP')?("Una vez definidos brevemente los sistemas de referencia usados en el campo orbital, se ha de definir el funcionamiento del cálculo de las coordenadas que se lleva a cabo en la realidad. Lo cierto es que los resultados son fruto de un estudio mucho más complejo de lo presentado anteriormente, todo ello causado por modelos simplificados de perturbaciones, o bien simplemente propagadores. La familia de modelos se limita a cinco de ellos: SGP, SGP4, SDP4, SGP8 y SDP8. Todos y cada uno de ellos son utilizados para calcular vectores de estados de órbitas de satélites y basura espacial relativa a la tierra, y haciendo uso del sistema de referencia ECI (explicado en el punto anterior). Aunque existan todos los modelos mencionados, se suele hacer referencia a ellos simplemente con 'SGP4’, puesto que es el más utilizado por la especial utilidad para los conocidos TLE."):("Once the reference systems used in the orbital field have been briefly defined, it is necessary to define how to calculate the coordinates to be orbital field, it is necessary to define how the calculation of the coordinates is actually carried out. in the real world. The fact is that the results are the fruit of a much more complex study than that much more complex than presented above, all caused by simplified models of perturbations simplified perturbation models, or simply propagators. The family of models is limited to five of them: SGP, SGP4, SDP4, SGP8 and SDP8. SDP8. Each and all of them are used to compute state vectors of satellite orbits. and space debris relative to the earth, and making use of the ECI reference system (ECI). the ECI reference system (explained in the previous point). Although all of the above models exist, they are often referred to simply as 'SGP4', or 'SGP4'. simply as 'SGP4', since it is the most widely used because of its special usefulness for the well-known TLEs. for the well-known TLEs.")}</p>

        <p>{(lng == 'ESP')?('Estos propagadores predicen el efecto de las perturbaciones causadas por la forma de la tierra (que, erróneamente, es tratada como una esfera perfecta), el rozamiento, la radiación y los efectos gravitacionales causados por otros cuerpos, tales como la luna o el sol (véase '):("These propagators predict the effect of perturbations caused by the shape of the earth (which, erroneously, is treated as a perfect sphere), friction, radiation and gravitational effects caused by other bodies, such as the moon or the sun (see ")}<a style={{color:'#B9EEFF',textDecoration: 'underline'}} href='https://hmong.es/wiki/SGP4' target="_blank" rel="noreferrer">{(lng == 'ESP')?('este link '):('this link ')}</a>{(lng == 'ESP')?("para más información). Se estima que el propagador tiene un error de menos de 1km, pero crece diariamente entre 1 y 3 km, la razón principal por la que los datos son continuamente actualizados (referencia en "):("for more information). The propagator is estimated to have an error of less than 1km, but it grows daily between 1 and 3 km, the main reason why the data is continuously updated (reference in ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} href='https://en.wikipedia.org/wiki/Two-line_element_set'>{(lng == 'ESP')?('este link'):('this link')}</a>{")."}</p>
        
        <p>{(lng == 'ESP')?("Dichos propagadores conllevan una carga matemática y física que se escapa de los límites de este proyecto, por lo que no se entrará en detalle en los cálculos que éste efectúa. Sin embargo, era de vital importancia remarcar algunos datos importantes del mismo, para poder entender a la perfección algunas singularidades de los datos orbitales. Entre ellas, la razón por la que los TLEs son actualizados diariamente (como se ha mencionado, el propagador conlleva errores que crecen con el tiempo, y se han de corregir). Para más información, la página de "):("Such propagators carry a mathematical and physical burden that is beyond the scope of this project. the limits of this project, so we will not go into detail on the calculations that this calculations will not be discussed in detail. However, it was of vital importance to highlight some important data in order to be able to important data, in order to fully understand some singularities of the orbital data. orbital data. Among them, the reason why the TLEs are updated on a daily basis (as we have seen). are updated daily (as mentioned, the propagator carries errors that grow with time, as errors that grow with time, and have to be corrected). For more information, the page of ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} href='https://celestrak.org/'>Celestrak</a> {(lng == 'ESP')?(", referenciada en multitud de ocasiones, tiene documentación extensa sobre propagadores, códigos originales de la compañía NORAD (desarrolladora del producto, "):(", referenced on many occasions, has extensive documentation on propagators, original codes of the company NORAD (developer of the product, ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} href='https://www.norad.mil/'>NORAD</a>{(lng == 'ESP')?(") y librerías actualizadas sobre el propagador "):(") and updated libraries about the propagator ")} <a style={{color:'#B9EEFF',textDecoration: 'underline'}} target="_blank" rel="noreferrer" href='https://github.com/shashwatak/satellite-js'>satellite.js</a>{(lng == 'ESP')?(", entre las que se encuentra la que se usará para este proyecto, mencionada en el apartado de Cálculos."):(", where the one used in this project is located, mentioned in the Calculations section.")}</p>

        </>}</>):('')}

        <h2><icon onClick={() =>setTeoMecOrb((p)=>!p)}><FontAwesomeIcon icon={(teoriaMecOrb)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(" Teoría de Mecánica Orbital"):(" Orbital Mechanics Theory")}</icon></h2>
              {teoriaMecOrb?(<>{<>

                <h3>{(lng == 'ESP')?("Definición"):("Definition")}</h3>
        <p>{(lng == 'ESP')?("La astrodinámica o mecánica orbital es la aplicación de la balística y la mecánica celeste a los problemas prácticos relativos al movimiento de cohetes y otras naves espaciales ("):("Astrodynamics or orbital mechanics is the application of ballistics and celestial mechanics to practical problems of rocket and other mechanics to practical problems relating to the motion of rockets and other spacecraft (")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://es.wikipedia.org/wiki/Astrodin%C3%A1mica'>link</a>{(lng == 'ESP')?(". Está basada en las leyes de Newton y en la ley de la gravitación universal. Esta pretende hacer un estudio exhaustivo sobre las trayectorias de las naves espaciales, además de la multitud de maniobras, y es la herramienta principal de los planificadores de misiones espaciales."):(". It is based on Newton's laws and the law of universal gravitation. universal gravitation. It is intended to make an exhaustive study of spacecraft trajectories, in addition to the multitude of maneuvers, and is trajectories of spacecraft, in addition to the multitude of maneuvers, and is the main tool of spacecraft mission planners. the main tool of space mission planners.")}</p>

        <p>{(lng == 'ESP')?("PARÁMETROS DE LA ÓRBITA"):("PARAMETERS OF THE ORBIT")}</p>
        <p>{(lng == 'ESP')?("Hasta este punto, se ha mencionado toda la teoría que recoge la información necesaria para la visualización de objetos, las herramientas utilizadas y toda clase de documentación, por lo que es conveniente y necesario llevar al quid de la cuestión: cómo representar un satélite y cuáles son los parámetros que lo conforman."):("Up to this point, we have mentioned all the theory that gathers the necessary information for the visualization of objects, the tools used necessary for the visualization of objects, the tools used and all kinds of documentation. documentation, so it is convenient and necessary to take to the crux of the matter: how to represent a satellite and which are the the crux of the matter: how to represent a satellite and what are the parameters that make it up. parameters that make it up.")}</p>

        <p>{(lng == 'ESP')?("Los elementos orbitales son aquellos parámetros necesarios y suficientes para determinar una órbita (éste usa un modelo de dos masas siguiendo las leyes de movimiento de Newton). Con esta denominación se suele hacer referencia a seis parámetros básicos, también denominados como elementos keplerianos (como tributo a Kepler "):("Orbital elements are those parameters necessary and sufficient to determine an orbit (this uses a two-mass model following Newton's laws of motion). This name usually refers to six basic parameters, also known as Keplerian elements (as a tribute to Kepler")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} href='https://es.wikipedia.org/wiki/Elementos_orbitales#:~:text=Los%20elementos%20orbitales%20son%20los,utilizando%20una%20%C3%B3rbita%20de%20Kepler'>link</a>{(lng == 'ESP')?(", que a continuación se definen para el caso de "):(", which are defined as follows for the case of ")} (<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://en.wikipedia.org/wiki/Geocentric_orbit'>{(lng == 'ESP')?("órbitas geocéntricas"):("geocentric orbits")}</a>):</p>

        <p>{(lng == 'ESP')?("a. Longitud del nodo ascendente (☊ o Ω)"):("a. Longitude of the ascending node (☊ or Ω)")}</p> 
        <p>{(lng == 'ESP')?("Ángulo formado entre el primer punto de Aries (ɤ) o eje X, también conocido como origen de la longitud y la dirección del nodo. Suele hacerse referencia a este parámetro (en casos geocéntricos como este) como Ascensión recta del nodo ascendente. Este ángulo es medido siempre hacia el este (tal y como es visto desde el norte, en sentido antihorario). Color verde en la figura."):("Angle formed between the first Aries point (ɤ) or X-axis, also known as the origin of longitude, and the direction of the the direction of the node. This parameter is often referred to (in geocentric geocentric cases such as this one) as Right Ascension of the ascending node. ascending node. This angle is always measured eastward (as seen from the north, in the anti-clockwise direction). seen from the north, counterclockwise). Green color in the figure.")}</p>

        <img src ={'https://1.bp.blogspot.com/-EgJYq-dpM7E/XKP9yq4HK-I/AAAAAAAADnE/Hb1534VDUL4YrqWjmH6mEY3rWjyUl4e6ACLcBGAs/s1600/Periapsis.PNG'}/>
        <p style={{textAlign:'center'}}>{(lng == 'ESP')?("Elementos keplerianos"):("Keplerian elements")}</p>

        <p>{(lng == 'ESP')?("b. Argumento del periastro (ω)"):("b. Argument of periapsis (ω)")}</p> 
        <p>{(lng == 'ESP')?("Su función es orientar la elipse sobre el plano orbital, puesto que mide el ángulo desde el nodo ascendente hasta el perigeo, medido en la dirección del movimiento del cuerpo que orbita. Nótese que, de no tener en cuenta la dirección del movimiento del cuerpo, se podría producir una ambigüedad. Color rojo en la figura"):("Its function is to orient the ellipse on the orbital plane, since it measures the angle from the ascending node to the perigee, measured in the direction of motion of the orbiting body. Note that not taking into account the direction of the body's motion could lead to ambiguity. Red color in the figure.")}</p> 

        <p>{(lng == 'ESP')?("c. Inclinación (i)"):("c. Inclination (i)")}</p> 
        <p>{(lng == 'ESP')?("Ángulo formado por el plano orbital y el plano Ecuatorial. Verde oscuro en la figura"):("Angle formed by the orbital plane and the equatorial plane. equatorial plane. Dark green in the figure.")}</p>

        <p>{(lng == 'ESP')?("d. Semieje mayor (a)"):("d. Semi-major axis (a)")}</p> 
        <p>{(lng == 'ESP')?("Medida del semieje mayor de la elipse que realiza el objeto orbital. En ocasiones se determina también el semieje menor, pero es el mayor el que se determina siempre y quien forma parte de los elementos keplerianos. Su cálculo es sencillo: se trata del valor medio de las distancias mínima y máxima de la elipse al foco, tal y como aparece en la ecuación (4)."):("Measurement of the semi-major axis of the ellipse made by the orbital object. orbital object. Sometimes the minor semi-axis is also determined, but it is always the but it is the semi-major axis that is always determined and which is part of the Keplerian elements. Its calculation is simple: it is the mean value of the minimum and maximum distances of the orbital object. the minimum and maximum distances of the ellipse to the focus, as shown in equation (4).")}</p>
        <p style={{textAlign:'center'}}>𝑎 = (𝑟max + 𝑟min)/2                     (4)</p>

        <p>{(lng == 'ESP')?("e. Excentricidad (e o ε)"):("e. Eccentricity (e or ε)")}</p> 
        <p>{(lng == 'ESP')?("Parámetro que determina la desviación de la elipse con respecto a una circunferencia (cuanto más cercano a 0, menor excentricidad y trayectoria más parecida a la circunferencia). Para el caso de las elipses, dicho parámetro debe valer igual o más que 0 y siempre menos que 1 (una excentricidad de valor 1 se corresponde con una parábola). Tomando el semieje mayor y el semieje menor, respectivamente, como ‘a’ y ‘b’, su cálculo queda expuesto en la ecuación 5."):("Parameter that determines the deviation of the ellipse with respect to a circle (the closer to 0, the less eccentricity and the more similar trajectory to the circle). In the case of ellipses, this parameter must be equal to or greater than 0 and always less than 1 (an eccentricity of value 1 corresponds to a parabola). Taking the semi-major axis and semi-minor axis, respectively, as 'a' and 'b', their calculation is shown in equation 5.")}</p>
        <p style={{textAlign:'center'}}>𝑒 = √(1 −𝑏^2/𝑎^2)                    (5)</p>

        <p>{(lng == 'ESP')?("f. Anomalía media de la época (M0)"):("f. Mean anomaly of the epoch (M0)")}</p> 
        <p>{(lng == 'ESP')?("Parte del período orbital que ya ha transcurrido, expresado como un ángulo, tras el paso por el periapsis. Ecuación 6."):("Part of the orbital period that has already elapsed, expressed as an angle, after passing through periapsis. Equation 6.")}</p>
        <p style={{textAlign:'center'}}>𝑀 = 𝑛 · ( 𝑡 − 𝑡0 )                 (6)</p>
        <p>{(lng == 'ESP')?("Donde ‘𝑛’ es el movimiento medio (normalmente medido en °/día, o rad/día), ‘𝑡’ es el instante en el que se desea obtener el valor, y ‘𝑡0’ es el instante de paso del planeta por el perihelio (o perigeo, anteriormente mencionado)."):("Where '𝑛' is the mean motion (usually measured in °/day, or rad/day), '𝑡' is the instant at which the value is desired, and '𝑡0' is the instant of the planet's passage through perihelion (or perigee, previously mentioned).")}</p>

        <p>{(lng == 'ESP')?("Además de estos valores, en ocasiones se utilizan otros datos como la anomalía verdadera (ѵ), semieje menor (b), excentricidad linear (ϵ), anomalía excéntrica (E), longitud media (L), longitud verdadera (լ) y período orbital (Т). Sin embargo, no se pondrán en uso en este proyecto, ya que no forman parte de los elementos que conforman los TLEs."):("In addition to these values, other data are sometimes used, such as true anomaly (ѵ), minor semi-axis (b), linear (ѵ), semi-minor axis (b), linear eccentricity (ϵ), eccentric anomaly (E), mean longitude (L), true longitude (լ) and orbital period (Т). (E), mean length (L), true length (լ) and orbital period (Т). However, will not be put to use in this project, since they are not part of the elements that make up the TLEs. that make up the TLEs.")}</p>
        </>}</>):('')}

        <h2><icon onClick={() =>setInfoTLE((p)=>!p)}><FontAwesomeIcon icon={(infoTLE)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/> TLEs</icon></h2>
              {infoTLE?(<>{<>

        <p>{(lng == 'ESP')?("El formato de datos NORAD Two-Line-Element set o simplemente TLE, supone la codificación de una lista de elementos orbitales de un objeto orbital terrestre (y únicamente terrestre) para un instante en el tiempo, también conocido como la época (llamada así en astronomía a una fecha en concreto, en ocasiones medida en milisegundos a partir del 1 de enero del 2000 a las 00:00 según UTC ("):("The NORAD Two-Line-Element set data format, or simply TLE, involves the encoding of a list of orbital elements of a terrestrial (and only terrestrial) orbital object for an instant in time, also known as the epoch (so called in astronomy for a particular date, sometimes measured in milliseconds as of January 1, 2000 at 00:00 UTC (")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} href='https://en.wikipedia.org/wiki/Epoch_(astronomy)'>link</a>{(lng == 'ESP')?("). Gracias a este dato, es posible la correcta representación de un satélite dado en el instante deseado. A partir de ese instante, el error puede crecer progresivamente con el tiempo, por lo que dichos TLEs son actualizados constantemente, y no son válidos para todos los tiempos posteriores si se requiere de rigurosidad y exactitud en los cálculos."):("). Thanks to this data, the correct representation of a given satellite at the desired time is possible. satellite at the desired instant. From that instant on, the error can grow progressively over time, so that these TLEs are constantly updated, and are not valid for all subsequent constantly updated, and are not valid for all subsequent times if rigor and accuracy in the and accuracy in the calculations is required.")}</p>

        <p>{(lng == 'ESP')?("Este formato está íntimamente relacionado con los propagadores anteriormente mencionados, puesto que nacen tras la creación de los mismos, y se basan en todas sus perturbaciones para la obtención de los resultados."):("This format is closely related to the aforementioned propagators, since it is born after their creation and is based on propagators, since they are born after their creation, and are based on all their perturbations to obtain the results. all their perturbations to obtain the results.")}</p>

        <p>{(lng == 'ESP')?("Inicialmente se pretendió materializar mediante tarjetas perforadas, un recurso altamente utilizado en los primeros tiempos de la programación y la informática. Por esta razón, el formato nació como dos tarjetas de 80 columnas (lo que contendría 80 caracteres en total), pero finalmente se decidió reemplazar dicho formato por archivos de texto con dos líneas de 69 columnas en formato ASCII, precedidas de una línea destinada al título."):("Initially it was intended to be materialized by means of punched cards, a resource highly used in the early days of programming and computing. For this reason, the format was born as two 80-column cards (which would contain 80 characters in total), but it was finally decided to replace this format by text files with two lines of 69 columns in ASCII format, preceded by a line for the title.")}</p>

        <p style={{fontSize:'20px',fontFamily:['Courier New', 'Courier', 'monospace']}}>{(lng == 'ESP')?("EJEMPLO DE TLE"):("EXAMPLE OF TLE")}</p>
        <p style={{fontSize:'15px',fontFamily:[ 'Courier New', 'Courier', 'monospace']}}>{(lng == 'ESP')?("-Desliza el ratón sobre los elementos para identificarlos-"):("-Slide the mouse over the elements to identify them-")}</p>

        <h2 className={styles.hTLE} style={{width:'600px'}}><p><a className={styles.numberLineTLE} data-tip data-for={'numberLine'}>{tle.split('\n')[0].substring(0,1)} </a><a className={styles.nameTLE} data-tip data-for={'name'}>{tle.split('\n')[0].substring(2)}</a></p>
        <p><a className={styles.numberLineTLE} data-tip data-for={'numberLine'}>{tle.split('\n')[1].substring(0,1)} </a>
        <a className={styles.idTLE} data-tip data-for={'id'}>{tle.split('\n')[1].substring(2,7)}</a>
        <a className={styles.classTLE} data-tip data-for={'class'}>{tle.split('\n')[1].substring(7,8)} </a>
        <a className={styles.last2digYearTLE} data-tip data-for={'last2launch'}>{tle.split('\n')[1].substring(9,11)}</a>
        <a className={styles.numLaunchTLE} data-tip data-for={'numLaunch'}>{tle.split('\n')[1].substring(11,14)}</a>
        <a className={styles.pieceLaunchTLE} data-tip data-for={'piece'}>{tle.split('\n')[1].substring(14,17)}</a>
        <a className={styles.idTLE} data-tip data-for={'last2epoch'}>{tle.split('\n')[1].substring(18,20)}</a>
        <a className={styles.classTLE} data-tip data-for={'day'}>{tle.split('\n')[1].substring(20,32)} </a>
        <a className={styles.last2digYearTLE} data-tip data-for={'1m0'}>{tle.split('\n')[1].substring(33,43)}</a>
        <a className={styles.numLaunchTLE} data-tip data-for={'2m0'}>{tle.split('\n')[1].substring(44,52)}</a>
        <a className={styles.pieceLaunchTLE} data-tip data-for={'bstar'}>{tle.split('\n')[1].substring(53,61)} </a>
        <a className={styles.idTLE} data-tip data-for={'efem'}>{tle.split('\n')[1].substring(62,63)} </a>
        <a className={styles.classTLE} data-tip data-for={'numElem'}>{tle.split('\n')[1].substring(65,68)}</a>
        <a className={styles.last2digYearTLE} data-tip data-for={'checksum'}>{tle.split('\n')[1].substring(68)}</a></p>

        <p><a className={styles.numberLineTLE} data-tip data-for={'numberLine'}>{tle.split('\n')[2].substring(0,1)} </a>
        <a className={styles.idTLE} data-tip data-for={'id'}>{tle.split('\n')[2].substring(2,7)} </a>
        <a className={styles.classTLE} data-tip data-for={'inclinacion'}> {tle.split('\n')[2].substring(9,16)} </a>
        <a className={styles.last2digYearTLE} data-tip data-for={'ascRect'}>{tle.split('\n')[2].substring(17,25)} </a>
        <a className={styles.numLaunchTLE} data-tip data-for={'excentr'}> {tle.split('\n')[2].substring(26,33)} </a>
        <a className={styles.pieceLaunchTLE} data-tip data-for={'argumento'}>{tle.split('\n')[2].substring(34,42)} </a>
        <a className={styles.idTLE} data-tip data-for={'anomMedia'}>{tle.split('\n')[2].substring(43,51)} </a>
        <a className={styles.classTLE} data-tip data-for={'movMedio'}>{tle.split('\n')[2].substring(52,63)}</a>
        <a className={styles.last2digYearTLE} data-tip data-for={'numRev'}>{tle.split('\n')[2].substring(63,68)}</a>
        <a className={styles.numLaunchTLE} data-tip data-for={'checksum'}>{tle.split('\n')[2].substring(68)}</a></p>

         <ReactTooltip className={styles.tooltip} id={"numberLine"} type='dark' html={true}>{lng=='ESP'?("NÚMERO DE LÍNEA"):("NUMBER OF LINE")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"name"} type='dark' html={true}>{lng=='ESP'?("NOMBRE DEL SATÉLITE"):("NAME OF THE SATELLITE")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"id"} type='dark' html={true}>NORAD ID</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"class"} type='dark' html={true}>{lng=='ESP'?("CLASIFICACIÓN* (más info en Documentación)"):("CLASSIFICATION* (more info in Documentation)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"last2launch"} type='dark' html={true}>{lng=='ESP'?("Dos últimos dígitos del año de lanzamiento"):("Two last digits of launch year")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"numLaunch"} type='dark' html={true}>{lng=='ESP'?("Número de lanzamiento del año"):("Number of launch of the year")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"piece"} type='dark' html={true}>{lng=='ESP'?("Parte del lanzamiento"):("Part of the launch")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"last2epoch"} type='dark' html={true}>{lng=='ESP'?("Dos últimos dígitos del año (antigüedad TLE)"):("Two last digits of the year (TLE Epoch)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"day"} type='dark' html={true}>{lng=='ESP'?(`Día del año + fracción del día (antigüedad TLE) -> ${dia(tle.split('\n')[1].substring(20,32), tle.split('\n')[1].substring(18,20))}`)
        :(`Day of the year + fraction of the day (TLE Epoch) -> ${dia(tle.split('\n')[1].substring(20,32), tle.split('\n')[1].substring(18,20))}`)}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"1m0"} type='dark' html={true}>{lng=='ESP'?("Primera derivada de la Anomalía Media"):("First derivative of Mean Motion")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"2m0"} type='dark' html={true}>{lng=='ESP'?("Segunda derivada de la Anomalía Media (decimal)** (más info en Documentación)"):("Second derivative of Mean Motion (decimal)** (more info in Documentation)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"bstar"} type='dark' html={true}>{lng=='ESP'?("BSTAR* (decimal) (más info en Documentación)"):("BSTAR* (decimal) (more info in Documentation)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"efem"} type='dark' html={true}>{lng=='ESP'?("Efemérides* (más info en Documentación)"):("Ephemeris* (more info in Documentation)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"numElem"} type='dark' html={true}>{lng=='ESP'?("Número de set (número de TLEs generados para este satélite)"):("Element set number (number of TLEs generated for this object)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"checksum"} type='dark' html={true}>{(lng=='ESP')?("Checksum* (más info en Documentación)"):("Checksum* (more info in Documentation)")}</ReactTooltip>

        <ReactTooltip className={styles.tooltip} id={"inclinacion"} type='dark' html={true}>{(lng=='ESP')?("Inclinación (grados)"):("Inclination (degrees)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"ascRect"} type='dark' html={true}>{(lng=='ESP')?("Ascensión recta del nodo ascendente (grados)"):("Right ascension of the ascending node (degrees)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"excentr"} type='dark' html={true}>{(lng=='ESP')?("Excentricidad (decimal)"):("Eccentricity (decimal)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"argumento"} type='dark' html={true}>{(lng=='ESP')?("Argumento del perigeo (grados)"):("Argument of Perigee (degrees)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"anomMedia"} type='dark' html={true}>{(lng=='ESP')?("Anomalía Media (grados)"):("Mean Anomaly (degrees)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"movMedio"} type='dark' html={true}>{(lng=='ESP')?("Movimiento medio (rev/día)"):("Mean Motion (rev/day)")}</ReactTooltip>
        <ReactTooltip className={styles.tooltip} id={"numRev"} type='dark' html={true}>{(lng=='ESP')?("Número de revolución"):("Number of revolution")}</ReactTooltip> </h2>

        <p></p>
        <p style={{textAlign:'left'}}>{(lng == 'ESP')?("* Clasificación: ‘U’ - ‘Unclassified’, ‘C’ - ‘Classified’, ‘S’ - ‘Secret’"):("* Classification: ‘U’ - ‘Unclassified’, ‘C’ - ‘Classified’, ‘S’ - ‘Secret’")}</p> 
        <p>{(lng == 'ESP')?("* BSTAR: representa una modificación del coeficiente de balística (coeficiente que relaciona rozamiento, masa y área) representado en unidades de 1/RadioTerrestre;"):("* BSTAR: it represents a modification of the ballistic coefficient (coefficient relating friction, mass and area) represented in units of 1/EarthRadius;")}</p>
        <p>{(lng == 'ESP')?("* Efemérides: generalmente ‘0’, ver enlaces externos;"):("* Ephemeris: generally ‘0’, see external links below;")}</p> 
        <p>{(lng == 'ESP')?("* Checksum: resultado de sumar los valores contenidos en la línea, se trata de una comprobación (‘Check-sum’: comprobación de la suma), ver enlaces externos;"):("* Checksum: result of summing the values contained in the line, this is a check ('Check-sum'), see external links below;")}</p>
        <p>{(lng == 'ESP')?("** Tanto para la Línea 1 como la 2, los valores asumidos como decimales están expresados de tal forma que los dos primeros símbolos representan: 0,(dígitos-2)*10^-(últimos dos dígitos);"):("** For both Lines 1 and 2, the values assumed as decimals are expressed in such a way that the first two symbols represent: 0,(digits-2)*10^-(last two digits);")}</p>
        </>}</>):('')}

        <h2><icon onClick={() =>setCalculos((p)=>!p)}><FontAwesomeIcon icon={(calculos)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(" Cálculos"):(" Calculations")}</icon></h2>
              {calculos?(<>{<>

        <p>{(lng == 'ESP')?("Como es de esperar, las operaciones que se requieren para obtener datos satelitales a partir de la información proporcionada de Celestrak no son para nada sencillas, siendo, en numerables ocasiones, fuera del alcance de este proyecto y de los conocimientos matemáticos y físicos obtenidos en la titulación. Por suerte, existen dos librerías en JavaScript que se encargan de realizar estos cálculos y proporcionar los resultados convenientes, aunque en ciertas situaciones tengan que tratarse con cautela y aplicar correcciones."):("As expected, the operations required to obtain satellite data from Celestrak are not at all straightforward. In many cases are not  simple, and, on numerous occasions, beyond the scope of this project and the mathematical and physical knowledge obtained in the degree program. Fortunately, there are two JavaScript libraries that are responsible for performing these calculations and providing the appropriate results, although in certain situations they have to be situations they have to be treated with caution and corrections have to be applied.")}</p>
        <p>{(lng == 'ESP')?("La librería usada es "):("The library used is ")}
        <a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} href='https://github.com/shashwatak/satellite-js'> Satellite.js</a>{(lng == 'ESP')?(", encargada de la gestión del propagador SGP4/SDP4 y de los cálculos pertinentes. Dicha librería es prácticamente idéntica a la librería de Brandon Rhode SGP4 para Python, y no es más que una encapsulación de la misma en el entorno de JavaScript. Entre las atribuciones de esta librería se encuentran personalidades como Nikos Sagias (profesor de la Universidad de Peloponeso), David Vallado (autor de ‘Fundamentals of Astrodynamics and Applications’, 2000) o T.S. Kelso (creador de Celestrak) y cuenta con un total de hasta 16 contribuidores reconocidos, conactualizaciones y ajustes casi semanales."):(", in charge of managing the SGP4/SDP4 propagator and the relevant computations. This library is practically identical to Brandon Rhode's SGP4 library for Python, and is nothing more than an encapsulation of it in the JavaScript environment. Among the attributions of this library are personalities such as Nikos Sagias (professor at the University of Peloponnese), David Vallado (author of 'Fundamentals of Astrodynamics and Applications', 2000) or T.S. Kelso (creator of Celestrak) and has a total of up to 16 recognized contributors, with almost weekly updates and adjustments.")}</p>

        <p>{(lng == 'ESP')?("Gracias a esta librería, es posible la obtención casi inmediata de parámetros como la posición, velocidad, altitud, datos de observación y un largo etcétera. Lo que supone una herramienta crucial en la aplicación que se desea desarrollar. Todos estos parámetros, por supuesto, deben ser debidamente introducidos y comprobados, ya que el resultado depende de una cantidad de datos de entrada muy elevada, y deben ser minuciosamente generados."):("Thanks to this library, it is possible to obtain almost immediately parameters such as position, velocity, altitude, observation data and many others. such as position, speed, altitude, observation data and many others. The This is a crucial tool in the application to be developed. All these parameters, of course, must be duly entered and checked, since the result depends checked, since the result depends on a very large amount of input data, and they must be and must be thoroughly generated.")}</p>

        <p>{(lng == 'ESP')?("Esta librería comentada, a su vez, tiene unos tiempos de procesado en ocasiones elevados para obtener resultados que se quieren de forma casi inmediata. Por esta razón, y para obtener los parámetros de forma más clara y rápida, se hace uso de una segunda librería llamada "):("This library, in turn, has sometimes long processing times to obtain the desired results almost immediately. For this reason, and to obtain the parameters in a clearer and faster way, we use a second library called ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://github.com/davidcalhoun/tle.js/'>tle.js</a>{(lng == 'ESP')?(", la cual depende directamente de la primera, pero está desglosada en funciones concretas que facilitan aún más el uso. Además, esta librería está desarrollada enteramente por David Calhoun, uno desarrolladores principales de la mencionada inicialmente, lo que le da la fiabilidad y sentido al proyecto."):(", which depends directly directly on the first one, but is broken down into specific functions that further functions that make it even easier to use. In addition, this library is entirely developed by David Calhoun, one of the main developers of the aforementioned initially, which gives reliability and sense to the project.")}</p>
        <p>{(lng == 'ESP')?("La segunda librería será la utilizada en la mayor parte del proyecto, puesto que los parámetros básicos que se quieren obtener (latitud, longitud, elevación) son fácilmente accesibles con las funciones concretas de este paquete. La ventaja es la exactitud y veracidad de los resultados combinado con un producto más liviano, sencillo y de menor complejidad. Sin embargo, habrá cálculos que deberán hacerse  usando la librería de Satellite.js."):("The second library will be the one used in most of the project, since the basic parameters to be obtained (latitude, longitude, elevation) are the basic parameters that you want to obtain (latitude, longitude, elevation) are easily accessible with the easily accessible with the specific functions of this package. The advantage The advantage is the accuracy and veracity of the results combined with a lighter product, simpler and less complex product. However, there will be calculations that must be done using the Satellite.js library.")}</p>
        <p>{(lng == 'ESP')?("Los detalles de esta librería se encuentran en el Anexo II. Los detalles de la obtención de los resultados y la metodología aplicada vienen desarrollados en el capítulo 9 de descripción de tareas, puesto que en este subapartado se pretende mostrar las librerías escogidas y la razón por la que se ha hecho."):("The details of this library can be found in Annex II. The details of how the results were obtained and the methodology applied are described in Chapter 9 of the task description, since this subsection is intended to show the libraries chosen and the reason why this has been done.")}</p>
                </>}</>):('')}
                
                <h2><icon onClick={() =>setSatelites((p)=>!p)}><FontAwesomeIcon icon={(satelites)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(" Fuente de información satelital"):(" Source of satellite info")}</icon></h2>
                      {satelites?(<>{<>

                        <p>{(lng == 'ESP')?("Las formas de acceder a estos TLEs son oficialmente dos: "):("There are two ways of obtaining these TLEs: ")}<Link target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='http://www.celestrak.org/'>Celestrak</Link>{(lng == 'ESP')?(" y "):(" and ")}<Link target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://www.space-track.org/'>SpaceTrack</Link>{(lng == 'ESP')?(". Ambas corporaciones están dotadas de la información pública (existe información clasificada y elementos militares de acceso restringido) sobre los satélites que orbitan la tierra. La fuente de información es la Fuerza Espacial de los Estados Unidos, la cual lleva supervisando, controlando y almacenando datos de los objetos orbitales desde el principio de los tiempos de la carrera espacial. Si bien el canal de comunicación oficial de este organismo es SpaceTrack, ambas alternativas son igualmente válidas y veraces, teniendo en cuenta la peculiaridad de Celestrak."):(". Both corporations are endowed with public information (there is classified information and restricted access to classified information and military elements) on satellites orbiting the earth. The source of information is the U.S. Space Force, which has been monitoring, controlling and storing data since the beginning of the space race. Although the official communication channel of this agency is SpaceTrack, both alternatives are equally valid and truthful, taking into account the peculiarity of Celestrak.")}</p>
        <p>{(lng == 'ESP')?("Para este proyecto se usarán indistintamente ambas fuentes, y, en ocasiones, puede hacerse alusión sólo a alguna de ellas, pero en cualquier caso ambas son igualmente válidas y correctas, limitándose meramente a una decisión del desarrollador y de los requisitos de la plataforma."):("For this project both sources will be used interchangeably, and sometimes only one of them may be referred to, but in any case both are equally valid and correct, being merely a decision of the developer and the requirements of the platform.")}</p>
        <p>{(lng == 'ESP')?("Como información complementaria, existen reportes sobre análisis de datos, estadísticas interesantes y diferentes análisis hechos en ambas fuentes, por lo que partir de ambas puede ser en cualquier caso beneficioso y no contraproducente. Además, en ambas se puede elegir previamente el formato en el que se desea recibir los datos, ya sean directamente TLEs en archivo de texto o bien en formato JSON para ser fácilmente adaptables a un entorno de programación."):("As complementary information, there are reports on data analysis, interesting statistics and different analyses done in both sources, so that drawing on both can be beneficial rather than counterproductive. In addition, in both you can choose in advance the format in which you wish to receive the data, either directly in TLEs as a text file or in JSON format, which can be easily adaptable to a programming environment.")}</p>

        </>}</>):('')}

        <h2><icon onClick={() =>setEnlaces((p)=>!p)}><FontAwesomeIcon icon={(enlaces)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(" Enlaces variados y suplemento de documentación"):(" External links and extra documentation")}</icon></h2>
              {enlaces?(<>{<>

        <p>{(lng == 'ESP')?("Documento original formación TLEs "):("Original document of the TLE creation")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://celestrak.org/NORAD/documentation/ADCOM%20DO%20Form%2012.pdf'>(link)</a> </p>   
                <p>{(lng == 'ESP')?("Controversia Parámetro CHECKSUM "):("Controversial Checksum parameter ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://celestrak.org/NORAD/documentation/checksum.php'>(link)</a> </p>    
        <p>{(lng == 'ESP')?("Propagador"):("Propagator")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://celestrak.org/NORAD/documentation/spacetrk.pdf'>(link)</a> </p> 
        <p>{(lng == 'ESP')?("Mecánica Orbital I "):("Orbital Mechanics part I ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://es.wikipedia.org/wiki/Astrodin%C3%A1mica'>(link)</a> </p>
        <p>{(lng == 'ESP')?("Mecánica Orbital II "):("Orbital Mechanics part II ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://riunet.upv.es/bitstream/handle/10251/158425/Mora%C3%B1o%20-%20%C3%93rbitas%20en%20tres%20dimensiones%3A%20Elementos%20orbitales.pdf?sequence=1&isAllowed=y#:~:text=Para%20definir%20una%20%C3%B3rbita%20en,semieje%20mayor1%20(a).'>(link)</a> </p>
        <p>{(lng == 'ESP')?("Sistemas de coordenadas "):("Coordinates systems ")}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://es.mathworks.com/help/aerotbx/ug/coordinate-systems-for-navigation.html'>(link)</a> </p>
        {/* <p>Memoria del proyecto <Link target="_blank" rel="noreferrer" type="application/pdf" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='../TFGprueba4.pdf'>(link)</Link> </p> */}

        </>}</>):('')}

        <h2><icon onClick={() =>setTutorial((p)=>!p)}><FontAwesomeIcon icon={(tutorial)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng == 'ESP')?(" Demostración"):(" Demonstration")}</icon></h2>
              {tutorial?(<>{<>

                <Example></Example>

        </>}</>):('')}
        {espaciado}
        <a href="/about" /* className={styles.card} */ style={{position:'fixed',bottom:'5%',right:'5%',width:'6%',height:'6%',padding:'0.8%',margin:'0px'}}>
            <h2 style={{'fontSize':'20px'}}>{/* <icon><FontAwesomeIcon icon={faSatellite} width={'100px'} cursor={'pointer'}/> */}{(lng == 'ESP')?(" Acerca de"):(" About")}{/* </icon> */} {/* &darr; */}</h2>
        </a>
      </main>
      </div>
      </>
  )
}
