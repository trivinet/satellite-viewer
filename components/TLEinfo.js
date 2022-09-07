import styles from './TLEinfo.module.css'
import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import assignTLE from './assignTLE';

/* const tleDefault = assignTLE(25544);  */


export default function TLEinfo(ID) {

  /* console.log(ID.ID); */
  const tle = assignTLE(ID.ID);
  /* console.log(tle); */

  return (
    
    <>
     
    <nav className={styles.navDark}>
          
    <h2 className={styles.hTLE} style={{width:'500px'}}><p><a className={styles.nameTLE} data-tip data-for={'name'}>{tle.split('\n')[0]}</a></p>
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
<a className={styles.last2digYearTLE} data-tip data-for={'checksum'}>{tle.split('\n')[1].substring(68)}</a>
</p>
<p><a className={styles.numberLineTLE} data-tip data-for={'numberLine'}>{tle.split('\n')[2].substring(0,1)} </a>
<a className={styles.idTLE} data-tip data-for={'id'}>{tle.split('\n')[2].substring(2,7)} </a>
<a className={styles.classTLE} data-tip data-for={'inclinacion'}> {tle.split('\n')[2].substring(9,16)} </a>
<a className={styles.last2digYearTLE} data-tip data-for={'ascRect'}>{tle.split('\n')[2].substring(17,25)} </a>
<a className={styles.numLaunchTLE} data-tip data-for={'excentr'}> {tle.split('\n')[2].substring(26,33)} </a>
<a className={styles.pieceLaunchTLE} data-tip data-for={'argumento'}>{tle.split('\n')[2].substring(34,42)} </a>
<a className={styles.idTLE} data-tip data-for={'anomMedia'}>{tle.split('\n')[2].substring(43,51)} </a>
<a className={styles.classTLE} data-tip data-for={'movMedio'}>{tle.split('\n')[2].substring(52,63)}</a>
<a className={styles.last2digYearTLE} data-tip data-for={'numRev'}>{tle.split('\n')[2].substring(63,68)}</a>
<a className={styles.numLaunchTLE} data-tip data-for={'checksum'}>{tle.split('\n')[2].substring(68)}</a>
</p></h2>
<ReactTooltip className={styles.tooltip} id={"numberLine"} type='dark' html={true}>NÚMERO DE LÍNEA</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"name"} type='dark' html={true}>NOMBRE DEL SATÉLITE</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"id"} type='dark' html={true}>NORAD ID</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"class"} type='dark' html={true}>CLASIFICACIÓN*</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"last2launch"} type='dark' html={true}>Dos últimos dígitos del año de lanzamiento</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"numLaunch"} type='dark' html={true}>Número de lanzamiento del año</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"piece"} type='dark' html={true}>Parte del lanzamiento</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"last2epoch"} type='dark' html={true}>Dos últimos dígitos del año (TLE)</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"day"} type='dark' html={true}>Día del año + fracción del día (TLE)</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"1m0"} type='dark' html={true}>Primera derivada de la Anomalía Media</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"2m0"} type='dark' html={true}>Segunda derivada de la Anomalía Media (decimal)**</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"bstar"} type='dark' html={true}>BSTAR* (decimal) </ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"efem"} type='dark' html={true}>Efemérides*</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"numElem"} type='dark' html={true}>Número de set de TLEs</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"checksum"} type='dark' html={true}>Checksum*</ReactTooltip>

<ReactTooltip className={styles.tooltip} id={"inclinacion"} type='dark' html={true}>Inclinación</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"ascRect"} type='dark' html={true}>Ascensión recta del nodo ascendente</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"excentr"} type='dark' html={true}>Excentricidad (decimal)</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"argumento"} type='dark' html={true}>Argumento del perigeo</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"anomMedia"} type='dark' html={true}>Anomalía Media</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"movMedio"} type='dark' html={true}>Movimiento medio</ReactTooltip>
<ReactTooltip className={styles.tooltip} id={"numRev"} type='dark' html={true}>Número de revolución</ReactTooltip>
          
    </nav>
    
    </>
    )
}
