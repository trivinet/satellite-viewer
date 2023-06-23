import styles from './TLEinfo.module.css'
import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import assignTLE from './assignTLE';

/* const tleDefault = assignTLE(25544);  */


export default function TLEinfo({ID,dark, lng}) {

  /* console.log(ID.ID); */
  const tle = assignTLE(ID);
  /* console.log(tle); */



  function dia (stringEpoch, last2epoch) {
    var mes;
    var dia;
    var hora;
    var minuto;
    const [bisiesto, setBisiesto] = useState(false);
    var resto = '0.'+stringEpoch.substring(4,13);
    var atr = 'th';

    hora = ("0" + Math.floor(resto*24)).slice(-2);
    minuto = ("0" + Math.floor((resto*24-hora)*60)).slice(-2);

    switch (last2epoch%4) {
      case 0:
      setBisiesto(true);
      break;
      default:
        if(last2epoch == '00'){
          setBisiesto(true);
        }
    }
    if (stringEpoch.substring(0,3)< '032') {
      mes = (lng=='ESP')?("Enero"):('January');
      dia = stringEpoch.substring(1,3);
    }
    else if (stringEpoch.substring(0,3)< '060' && bisiesto==false) {
      mes = (lng=='ESP')?("Febrero"):('February');
      dia = Math.abs(stringEpoch.substring(1,3)-31);
    }
    else if (stringEpoch.substring(0,3)< '061' && bisiesto==true) {
      mes = (lng=='ESP')?("Febrero"):('February');
      dia = Math.abs(stringEpoch.substring(0,3)-31);
    }
    else if (stringEpoch.substring(0,3)< '091' && bisiesto==false) {
      mes = (lng=='ESP')?("Marzo"):('March');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28);
    }
    else if (stringEpoch.substring(0,3)< '092' && bisiesto==true) {
      mes = (lng=='ESP')?("Marzo"):('March');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29);
    }
    else if (stringEpoch.substring(0,3)< '121' && bisiesto==false) {
      mes = (lng=='ESP')?("Abril"):('April');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31);
    }
    else if (stringEpoch.substring(0,3)< '122' && bisiesto==true) {
      mes = (lng=='ESP')?("Abril"):('April');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31);
    }
    else if (stringEpoch.substring(0,3)< '152' && bisiesto==false) {
      mes = (lng=='ESP')?("Mayo"):('May');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30);
    }
    else if (stringEpoch.substring(0,3)< '153' && bisiesto==true) {
      mes = (lng=='ESP')?("Mayo"):('May');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30);
    }
    else if (stringEpoch.substring(0,3)< '182' && bisiesto==false) {
      mes = (lng=='ESP')?("Junio"):('June');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31);
    }
    else if (stringEpoch.substring(0,3)< '183' && bisiesto==true) {
      mes = (lng=='ESP')?("Junio"):('June');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31);
    }
    else if (stringEpoch.substring(0,3)< '213' && bisiesto==false) {
      mes = (lng=='ESP')?("Julio"):('July');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30);
    }
    else if (stringEpoch.substring(0,3)< '214' && bisiesto==true) {
      mes = (lng=='ESP')?("Julio"):('July');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30);
    }
    else if (stringEpoch.substring(0,3)< '244' && bisiesto==false) {
      mes = (lng=='ESP')?("Agosto"):('August');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31);
    }
    else if (stringEpoch.substring(0,3)< '245' && bisiesto==true) {
      mes = (lng=='ESP')?("Agosto"):('August');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31);
    }
    else if (stringEpoch.substring(0,3)< '274' && bisiesto==false) {
      mes = (lng=='ESP')?("Septiembre"):('September');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31);
    }
    else if (stringEpoch.substring(0,3)< '275' && bisiesto==true) {
      mes = (lng=='ESP')?("Septiembre"):('September');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31);
    }
    else if (stringEpoch.substring(0,3)< '305' && bisiesto==false) {
      mes = (lng=='ESP')?("Octubre"):('October');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31-30);
    }
    else if (stringEpoch.substring(0,3)< '306' && bisiesto==true) {
      mes = (lng=='ESP')?("Octubre"):('October');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31-30);
    }
    else if (stringEpoch.substring(0,3)< '335' && bisiesto==false) {
      mes = (lng=='ESP')?("Noviembre"):('November');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31-30-31);
    }
    else if (stringEpoch.substring(0,3)< '336' && bisiesto==true) {
      mes = (lng=='ESP')?("Noviembre"):('November');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31-30-31);
    }
    else if (stringEpoch.substring(0,3)< '366' && bisiesto==false) {
      mes = (lng=='ESP')?("Diciembre"):('December');
      dia = Math.abs(stringEpoch.substring(0,3)-31-28-31-30-31-30-31-31-30-31-30);
    }
    else {
      mes = (lng=='ESP')?("Diciembre"):('December');
      dia = Math.abs(stringEpoch.substring(0,3)-31-29-31-30-31-30-31-31-30-31-30);
    }

    if (dia%10 == 1) {atr = 'st'} else if (dia%10 == 2) {atr = 'nd'}

    return((lng=='ESP')?(`${dia} de ${mes}, a las ${hora}:${minuto}`):(`${dia}${atr} of ${mes}, at ${hora}:${minuto}`))

  }

  return (
    
    <>
     
    <nav className={dark?styles.navDark:styles.nav}>
          
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
<ReactTooltip className={styles.tooltip} id={"numRev"} type='dark' html={true}>{(lng=='ESP')?("Número de revolución"):("Number of revolution")}</ReactTooltip>
          
    </nav>
    
    </>
    )
}
