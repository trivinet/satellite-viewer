import Link from 'next/link';
import styles from './sidebar.module.css';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faHouse, faChevronLeft, faMap, faInfo,
  faMoon, faSun, faAtom, faSatellite
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import { lightGlobal } from '../pages/_app';

export default function Sidebar({ setLight, setSidebarOpen, lng }) {
  const [lightSidebar, setLightSidebar] = React.useState(lightGlobal);
  const [sidebarOpenProp, setSidebarOpenProp] = React.useState(false);

  useEffect(() => {
    lightGlobal = lightSidebar;
  }, [lightSidebar]);

  const panelClass = lightSidebar
    ? (sidebarOpenProp ? styles.nav : styles.navClose)
    : (sidebarOpenProp ? styles.navDark : styles.navDarkClose);

  const toggle = () => {
    setSidebarOpen((p) => !p);
    setSidebarOpenProp((p) => !p);
  };

  const t = (es, en) => (lng === 'ESP' ? es : en);

  return (
    <nav className={panelClass}>
      {/* Toggle button (same spot in both states) */}
      <button className={`${styles.item} ${styles.toggle}`} onClick={toggle} data-tip data-for="ttToggle">
        <icon className={styles.iconBox}>
          <FontAwesomeIcon icon={sidebarOpenProp ? faChevronLeft : faBars} width="20px" height="20px" />
        </icon>
        <span className={styles.label}>{t('CERRAR', 'CLOSE')}</span>
      </button>
      <ReactTooltip id="ttToggle" place="top" html>{t('MENÚ', 'MENU')}</ReactTooltip>

      {/* Rows — one DOM for open & closed; label just collapses */}
      <Link href="/" className={styles.item} data-tip data-for="ttHome">
        <icon className={styles.iconBox}><FontAwesomeIcon icon={faHouse} width="20px" height="20px" /></icon>
        <span className={styles.label}>{t('MENÚ', 'MENU')}</span>
      </Link>
      <ReactTooltip id="ttHome" html>{t('MENÚ', 'MENU')}</ReactTooltip>

      <Link href="/map" className={styles.item} data-tip data-for="ttMap2d">
        <icon className={styles.iconBox}><FontAwesomeIcon icon={faMap} width="20px" height="20px" /></icon>
        <span className={styles.label}>{t('MAPA 2D', '2D MAP')}</span>
      </Link>
      <ReactTooltip id="ttMap2d" html>{t('Mapa 2D', '2D Map')}</ReactTooltip>

      <Link href="/map3D" className={styles.item} data-tip data-for="ttMap3d">
        <icon className={styles.iconBox}><FontAwesomeIcon icon={faAtom} width="20px" height="20px" /></icon>
        <span className={styles.label}>{t('MAPA 3D', '3D MAP')}</span>
      </Link>
      <ReactTooltip id="ttMap3d" html>{t('Mapa 3D', '3D Map')}</ReactTooltip>

      <Link href="/satelites" className={styles.item} data-tip data-for="ttSats">
        <icon className={styles.iconBox}><FontAwesomeIcon icon={faSatellite} width="20px" height="20px" /></icon>
        <span className={styles.label}>{t('SATÉLITES', 'SATELLITES')}</span>
      </Link>
      <ReactTooltip id="ttSats" html>{t('Satélites', 'Satellites')}</ReactTooltip>

      <Link href="/docu" className={styles.item} data-tip data-for="ttDoc">
        <icon className={styles.iconBox}><FontAwesomeIcon icon={faInfo} width="20px" height="20px" /></icon>
        <span className={styles.label}>{t('DOCUMENTACIÓN', 'DOCUMENTATION')}</span>
      </Link>
      <ReactTooltip id="ttDoc" html>{t('Documentación', 'Documentation')}</ReactTooltip>

      {/* Theme row pinned to bottom inside the panel */}
      <button
        type="button"
        className={`${styles.item} ${styles.themeRow}`}
        onClick={() => { setLight(p => !p); setLightSidebar(p => !p); }}
        data-tip
        data-for="ttTheme"
        style={{ cursor: 'pointer' }}
      >
        <icon className={styles.iconBox}>
          <FontAwesomeIcon icon={lightSidebar ? faMoon : faSun} width="20px" height="20px" />
        </icon>
        <span className={styles.label}>{t('TEMA', 'THEME')}</span>
      </button>
      <ReactTooltip id="ttTheme" place="top" html>{t('Tema', 'Theme')}</ReactTooltip>
    </nav>
  );
}
