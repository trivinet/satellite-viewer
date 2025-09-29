import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/satelites3.module.css'
import assignTLE from '../components/assignTLE'
import Sidebar from '../components/sidebar'
import Language from '../components/language'
import Layout from '../components/layout'
import { getLatLngObj } from "tle.js";
import InfoBoxPrint from '../components/infoBoxPrint'
import { useState,useCallback, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesUp,faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import active from '../components/active.json'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { PieChart, Pie, Sector } from "recharts"
import MUIDataTable from "mui-datatables"
import active2 from '../components/active2.json'
import { lightGlobal, lngGlobal } from '../pages/_app'
import dynamic from 'next/dynamic'


const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then(m => m.DataGrid),
  { ssr: false }
);
// optional toolbar
const GridToolbar = dynamic(
  () => import('@mui/x-data-grid').then(m => m.GridToolbar),
  { ssr: false }
);


export default function Satelites(){
  const [light,setLight] = useState(lightGlobal);
  const [lng,setLng] = useState(lngGlobal);
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [historico,setHistorico] = useState (false);
  const [usos,setUsos] = useState (false);
  const [orbits,setOrbits] = useState (false);
  const [paises,setPaises] = useState (false);
  const [families,setFamilies] = useState (false);
  const [buscador,setBuscador] = useState (false);

  useEffect(() => {
    lightGlobal = light;}, [light]);
  
  useEffect(() => {
    lngGlobal = lng;}, [lng]);

  const options = {
    filterType: 'checkbox',
    
  };

  var columns = [
    {
      name:'OBJECT_NAME',
      label: (lng=='ESP')?('Nombre'):('Name'),
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'CREATION_DATE',
      label: (lng=='ESP')?('Fecha'):('Date'),
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'NORAD_CAT_ID',
      label: 'ID',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'MEAN_MOTION',
      label: (lng=='ESP')?('Mov. Medio'):('Mean Motion'),
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'ECCENTRICITY',
      label: 'e',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'INCLINATION',
      label: 'i',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'RA_OF_ASC_NODE',
      label: ' Ω',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'CLASSIFICATION_TYPE',
      label: (lng=='ESP')?('Clasif.'):('Class.'),
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'REV_AT_EPOCH',
      label: 'Revs.',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'SEMIMAJOR_AXIS',
      label: 'a',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'PERIOD',
      label: 'T',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'APOAPSIS',
      label: 'Apoapsis',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'PERIAPSIS',
      label: 'Periapsis',
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'OBJECT_TYPE',
      label: (lng=='ESP')?('Tipo'):('Type'),
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'COUNTRY_CODE',
      label: (lng=='ESP')?('País'):('Country'),
      options: {
        filter: true,
        sort: true,
        
      }
    },
    {
      name:'LAUNCH_DATE',
      label: (lng=='ESP')?('Lanz.'):('Launch'),
      options: {
        filter: true,
        sort: true,
        
      }
    }
  ];
  
  // map your JSON to rows once
  const gridRows = useMemo(() => {
    // DataGrid needs an "id" field
    return active2.map((r, i) => ({
      id: r.NORAD_CAT_ID ?? i,
      ...r,
    }));
  }, []);

  // columns; change labels based on lng
const gridCols = useMemo(() => [
  { field: 'OBJECT_NAME', headerName: (lng==='ESP'?'Nombre':'Name'), flex: 1, minWidth: 180 },
  { field: 'CREATION_DATE', headerName: (lng==='ESP'?'Fecha':'Date'), width: 140 },
  { field: 'NORAD_CAT_ID', headerName: 'ID', width: 110 },
  { field: 'MEAN_MOTION', headerName: (lng==='ESP'?'Mov. Medio':'Mean Motion'), width: 140 },
  { field: 'ECCENTRICITY', headerName: 'e', width: 110 },
  { field: 'INCLINATION', headerName: 'i', width: 110 },
  { field: 'RA_OF_ASC_NODE', headerName: 'Ω', width: 110 },
  { field: 'CLASSIFICATION_TYPE', headerName: (lng==='ESP'?'Clasif.':'Class.'), width: 120 },
  { field: 'REV_AT_EPOCH', headerName: 'Revs.', width: 110 },
  { field: 'SEMIMAJOR_AXIS', headerName: 'a', width: 130 },
  { field: 'PERIOD', headerName: 'T', width: 110 },
  { field: 'APOAPSIS', headerName: 'Apoapsis', width: 130 },
  { field: 'PERIAPSIS', headerName: 'Periapsis', width: 130 },
  { field: 'OBJECT_TYPE', headerName: (lng==='ESP'?'Tipo':'Type'), width: 120 },
  { field: 'COUNTRY_CODE', headerName: (lng==='ESP'?'País':'Country'), width: 120 },
  { field: 'LAUNCH_DATE', headerName: (lng==='ESP'?'Lanz.':'Launch'), width: 130 },
], [lng]);
  
  
  
  const dataRawHist = [
    {
      "total": 0,
      "decayed": 0,
      "inorbit": 0,
      "numberday": 1957
    },
    {
      "total": 0,
      "decayed": 0,
      "inorbit": 0,
      "numberday": 1957
    },
    {
      "total": 0,
      "decayed": 0,
      "inorbit": 0,
      "numberday": 1957
    },
    {
      "total": 2,
      "decayed": 0,
      "inorbit": 2,
      "numberday": 1958
    },
    {
      "total": 4,
      "decayed": 2,
      "inorbit": 2,
      "numberday": 1958
    },
    {
      "total": 8,
      "decayed": 3,
      "inorbit": 5,
      "numberday": 1958
    },
    {
      "total": 9,
      "decayed": 4,
      "inorbit": 5,
      "numberday": 1958
    },
    {
      "total": 9,
      "decayed": 5,
      "inorbit": 4,
      "numberday": 1959
    },
    {
      "total": 13,
      "decayed": 9,
      "inorbit": 4,
      "numberday": 1959
    },
    {
      "total": 14,
      "decayed": 10,
      "inorbit": 4,
      "numberday": 1959
    },
    {
      "total": 20,
      "decayed": 12,
      "inorbit": 8,
      "numberday": 1959
    },
    {
      "total": 26,
      "decayed": 15,
      "inorbit": 11,
      "numberday": 1960
    },
    {
      "total": 33,
      "decayed": 17,
      "inorbit": 16,
      "numberday": 1960
    },
    {
      "total": 47,
      "decayed": 21,
      "inorbit": 26,
      "numberday": 1960
    },
    {
      "total": 59,
      "decayed": 30,
      "inorbit": 29,
      "numberday": 1961
    },
    {
      "total": 75,
      "decayed": 36,
      "inorbit": 39,
      "numberday": 1961
    },
    {
      "total": 107,
      "decayed": 56,
      "inorbit": 51,
      "numberday": 1961
    },
    {
      "total": 180,
      "decayed": 68,
      "inorbit": 112,
      "numberday": 1961
    },
    {
      "total": 212,
      "decayed": 89,
      "inorbit": 123,
      "numberday": 1962
    },
    {
      "total": 268,
      "decayed": 105,
      "inorbit": 163,
      "numberday": 1962
    },
    {
      "total": 315,
      "decayed": 132,
      "inorbit": 183,
      "numberday": 1962
    },
    {
      "total": 432,
      "decayed": 182,
      "inorbit": 250,
      "numberday": 1962
    },
    {
      "total": 526,
      "decayed": 238,
      "inorbit": 288,
      "numberday": 1963
    },
    {
      "total": 568,
      "decayed": 248,
      "inorbit": 320,
      "numberday": 1963
    },
    {
      "total": 625,
      "decayed": 279,
      "inorbit": 346,
      "numberday": 1963
    },
    {
      "total": 686,
      "decayed": 311,
      "inorbit": 375,
      "numberday": 1964
    },
    {
      "total": 751,
      "decayed": 331,
      "inorbit": 420,
      "numberday": 1964
    },
    {
      "total": 799,
      "decayed": 371,
      "inorbit": 428,
      "numberday": 1964
    },
    {
      "total": 878,
      "decayed": 403,
      "inorbit": 475,
      "numberday": 1964
    },
    {
      "total": 950,
      "decayed": 547,
      "inorbit": 403,
      "numberday": 1965
    },
    {
      "total": 1293,
      "decayed": 723,
      "inorbit": 570,
      "numberday": 1965
    },
    {
      "total": 1429,
      "decayed": 809,
      "inorbit": 620,
      "numberday": 1965
    },
    {
      "total": 1618,
      "decayed": 866,
      "inorbit": 752,
      "numberday": 1965
    },
    {
      "total": 1938,
      "decayed": 965,
      "inorbit": 973,
      "numberday": 1966
    },
    {
      "total": 2150,
      "decayed": 1079,
      "inorbit": 1071,
      "numberday": 1966
    },
    {
      "total": 2388,
      "decayed": 1243,
      "inorbit": 1145,
      "numberday": 1966
    },
    {
      "total": 2564,
      "decayed": 1379,
      "inorbit": 1185,
      "numberday": 1967
    },
    {
      "total": 2685,
      "decayed": 1505,
      "inorbit": 1180,
      "numberday": 1967
    },
    {
      "total": 2824,
      "decayed": 1611,
      "inorbit": 1213,
      "numberday": 1967
    },
    {
      "total": 2934,
      "decayed": 1684,
      "inorbit": 1250,
      "numberday": 1967
    },
    {
      "total": 3070,
      "decayed": 1789,
      "inorbit": 1281,
      "numberday": 1968
    },
    {
      "total": 3167,
      "decayed": 1878,
      "inorbit": 1289,
      "numberday": 1968
    },
    {
      "total": 3306,
      "decayed": 1979,
      "inorbit": 1327,
      "numberday": 1968
    },
    {
      "total": 3483,
      "decayed": 2049,
      "inorbit": 1434,
      "numberday": 1968
    },
    {
      "total": 3662,
      "decayed": 2129,
      "inorbit": 1533,
      "numberday": 1969
    },
    {
      "total": 3913,
      "decayed": 2226,
      "inorbit": 1687,
      "numberday": 1969
    },
    {
      "total": 4061,
      "decayed": 2309,
      "inorbit": 1752,
      "numberday": 1969
    },
    {
      "total": 4231,
      "decayed": 2408,
      "inorbit": 1823,
      "numberday": 1970
    },
    {
      "total": 4337,
      "decayed": 2496,
      "inorbit": 1841,
      "numberday": 1970
    },
    {
      "total": 4408,
      "decayed": 2568,
      "inorbit": 1840,
      "numberday": 1970
    },
    {
      "total": 4526,
      "decayed": 2634,
      "inorbit": 1892,
      "numberday": 1970
    },
    {
      "total": 4828,
      "decayed": 2725,
      "inorbit": 2103,
      "numberday": 1971
    },
    {
      "total": 5103,
      "decayed": 2795,
      "inorbit": 2308,
      "numberday": 1971
    },
    {
      "total": 5316,
      "decayed": 2896,
      "inorbit": 2420,
      "numberday": 1971
    },
    {
      "total": 5559,
      "decayed": 2988,
      "inorbit": 2571,
      "numberday": 1971
    },
    {
      "total": 5803,
      "decayed": 3080,
      "inorbit": 2723,
      "numberday": 1972
    },
    {
      "total": 6015,
      "decayed": 3209,
      "inorbit": 2806,
      "numberday": 1972
    },
    {
      "total": 6141,
      "decayed": 3322,
      "inorbit": 2819,
      "numberday": 1972
    },
    {
      "total": 6284,
      "decayed": 3405,
      "inorbit": 2879,
      "numberday": 1972
    },
    {
      "total": 6372,
      "decayed": 3475,
      "inorbit": 2897,
      "numberday": 1973
    },
    {
      "total": 6674,
      "decayed": 3733,
      "inorbit": 2941,
      "numberday": 1973
    },
    {
      "total": 6831,
      "decayed": 3850,
      "inorbit": 2981,
      "numberday": 1973
    },
    {
      "total": 6999,
      "decayed": 3964,
      "inorbit": 3035,
      "numberday": 1974
    },
    {
      "total": 7233,
      "decayed": 4060,
      "inorbit": 3173,
      "numberday": 1974
    },
    {
      "total": 7366,
      "decayed": 4162,
      "inorbit": 3204,
      "numberday": 1974
    },
    {
      "total": 7477,
      "decayed": 4243,
      "inorbit": 3234,
      "numberday": 1974
    },
    {
      "total": 7622,
      "decayed": 4357,
      "inorbit": 3265,
      "numberday": 1975
    },
    {
      "total": 7800,
      "decayed": 4469,
      "inorbit": 3331,
      "numberday": 1975
    },
    {
      "total": 8107,
      "decayed": 4581,
      "inorbit": 3526,
      "numberday": 1975
    },
    {
      "total": 8449,
      "decayed": 4780,
      "inorbit": 3669,
      "numberday": 1975
    },
    {
      "total": 8736,
      "decayed": 4874,
      "inorbit": 3862,
      "numberday": 1976
    },
    {
      "total": 8888,
      "decayed": 4983,
      "inorbit": 3905,
      "numberday": 1976
    },
    {
      "total": 9432,
      "decayed": 5331,
      "inorbit": 4101,
      "numberday": 1976
    },
    {
      "total": 9634,
      "decayed": 5480,
      "inorbit": 4154,
      "numberday": 1977
    },
    {
      "total": 9907,
      "decayed": 5660,
      "inorbit": 4247,
      "numberday": 1977
    },
    {
      "total": 10145,
      "decayed": 5781,
      "inorbit": 4364,
      "numberday": 1977
    },
    {
      "total": 10429,
      "decayed": 5936,
      "inorbit": 4493,
      "numberday": 1977
    },
    {
      "total": 10663,
      "decayed": 6063,
      "inorbit": 4600,
      "numberday": 1978
    },
    {
      "total": 10859,
      "decayed": 6233,
      "inorbit": 4626,
      "numberday": 1978
    },
    {
      "total": 11006,
      "decayed": 6382,
      "inorbit": 4624,
      "numberday": 1978
    },
    {
      "total": 11120,
      "decayed": 6495,
      "inorbit": 4625,
      "numberday": 1978
    },
    {
      "total": 11291,
      "decayed": 6662,
      "inorbit": 4629,
      "numberday": 1979
    },
    {
      "total": 11412,
      "decayed": 6813,
      "inorbit": 4599,
      "numberday": 1979
    },
    {
      "total": 11535,
      "decayed": 7002,
      "inorbit": 4533,
      "numberday": 1979
    },
    {
      "total": 11651,
      "decayed": 7192,
      "inorbit": 4459,
      "numberday": 1980
    },
    {
      "total": 11757,
      "decayed": 7329,
      "inorbit": 4428,
      "numberday": 1980
    },
    {
      "total": 11904,
      "decayed": 7472,
      "inorbit": 4432,
      "numberday": 1980
    },
    {
      "total": 12038,
      "decayed": 7648,
      "inorbit": 4390,
      "numberday": 1980
    },
    {
      "total": 12161,
      "decayed": 7815,
      "inorbit": 4346,
      "numberday": 1981
    },
    {
      "total": 12460,
      "decayed": 8008,
      "inorbit": 4452,
      "numberday": 1981
    },
    {
      "total": 12782,
      "decayed": 8183,
      "inorbit": 4599,
      "numberday": 1981
    },
    {
      "total": 12986,
      "decayed": 8370,
      "inorbit": 4616,
      "numberday": 1981
    },
    {
      "total": 13091,
      "decayed": 8481,
      "inorbit": 4610,
      "numberday": 1982
    },
    {
      "total": 13291,
      "decayed": 8634,
      "inorbit": 4657,
      "numberday": 1982
    },
    {
      "total": 13594,
      "decayed": 8797,
      "inorbit": 4797,
      "numberday": 1982
    },
    {
      "total": 13756,
      "decayed": 8979,
      "inorbit": 4777,
      "numberday": 1983
    },
    {
      "total": 14001,
      "decayed": 9113,
      "inorbit": 4888,
      "numberday": 1983
    },
    {
      "total": 14209,
      "decayed": 9248,
      "inorbit": 4961,
      "numberday": 1983
    },
    {
      "total": 14482,
      "decayed": 9407,
      "inorbit": 5075,
      "numberday": 1983
    },
    {
      "total": 14721,
      "decayed": 9537,
      "inorbit": 5184,
      "numberday": 1984
    },
    {
      "total": 14981,
      "decayed": 9705,
      "inorbit": 5276,
      "numberday": 1984
    },
    {
      "total": 15225,
      "decayed": 9862,
      "inorbit": 5363,
      "numberday": 1984
    },
    {
      "total": 15426,
      "decayed": 10023,
      "inorbit": 5403,
      "numberday": 1984
    },
    {
      "total": 15616,
      "decayed": 10123,
      "inorbit": 5493,
      "numberday": 1985
    },
    {
      "total": 15859,
      "decayed": 10236,
      "inorbit": 5623,
      "numberday": 1985
    },
    {
      "total": 16106,
      "decayed": 10397,
      "inorbit": 5709,
      "numberday": 1985
    },
    {
      "total": 16480,
      "decayed": 10535,
      "inorbit": 5945,
      "numberday": 1985
    },
    {
      "total": 16686,
      "decayed": 10690,
      "inorbit": 5996,
      "numberday": 1986
    },
    {
      "total": 16882,
      "decayed": 10825,
      "inorbit": 6057,
      "numberday": 1986
    },
    {
      "total": 17065,
      "decayed": 10979,
      "inorbit": 6086,
      "numberday": 1986
    },
    {
      "total": 17522,
      "decayed": 11107,
      "inorbit": 6415,
      "numberday": 1987
    },
    {
      "total": 18010,
      "decayed": 11263,
      "inorbit": 6747,
      "numberday": 1987
    },
    {
      "total": 18325,
      "decayed": 11422,
      "inorbit": 6903,
      "numberday": 1987
    },
    {
      "total": 18664,
      "decayed": 11658,
      "inorbit": 7006,
      "numberday": 1987
    },
    {
      "total": 18984,
      "decayed": 11854,
      "inorbit": 7130,
      "numberday": 1988
    },
    {
      "total": 19273,
      "decayed": 12088,
      "inorbit": 7185,
      "numberday": 1988
    },
    {
      "total": 19572,
      "decayed": 12343,
      "inorbit": 7229,
      "numberday": 1988
    },
    {
      "total": 19757,
      "decayed": 12697,
      "inorbit": 7060,
      "numberday": 1988
    },
    {
      "total": 19940,
      "decayed": 13099,
      "inorbit": 6841,
      "numberday": 1989
    },
    {
      "total": 20128,
      "decayed": 13342,
      "inorbit": 6786,
      "numberday": 1989
    },
    {
      "total": 20319,
      "decayed": 13593,
      "inorbit": 6726,
      "numberday": 1989
    },
    {
      "total": 20468,
      "decayed": 13816,
      "inorbit": 6652,
      "numberday": 1990
    },
    {
      "total": 20468,
      "decayed": 13987,
      "inorbit": 6481,
      "numberday": 1990
    },
    {
      "total": 20793,
      "decayed": 14119,
      "inorbit": 6674,
      "numberday": 1990
    },
    {
      "total": 21015,
      "decayed": 14260,
      "inorbit": 6755,
      "numberday": 1990
    },
    {
      "total": 21202,
      "decayed": 14416,
      "inorbit": 6786,
      "numberday": 1991
    },
    {
      "total": 21551,
      "decayed": 14536,
      "inorbit": 7015,
      "numberday": 1991
    },
    {
      "total": 21745,
      "decayed": 14720,
      "inorbit": 7025,
      "numberday": 1991
    },
    {
      "total": 21843,
      "decayed": 14845,
      "inorbit": 6998,
      "numberday": 1991
    },
    {
      "total": 21950,
      "decayed": 14954,
      "inorbit": 6996,
      "numberday": 1992
    },
    {
      "total": 22067,
      "decayed": 15025,
      "inorbit": 7042,
      "numberday": 1992
    },
    {
      "total": 22216,
      "decayed": 15147,
      "inorbit": 7069,
      "numberday": 1992
    },
    {
      "total": 22556,
      "decayed": 15234,
      "inorbit": 7322,
      "numberday": 1993
    },
    {
      "total": 22674,
      "decayed": 15302,
      "inorbit": 7372,
      "numberday": 1993
    },
    {
      "total": 22794,
      "decayed": 15361,
      "inorbit": 7433,
      "numberday": 1993
    },
    {
      "total": 22948,
      "decayed": 15423,
      "inorbit": 7525,
      "numberday": 1993
    },
    {
      "total": 23041,
      "decayed": 15467,
      "inorbit": 7574,
      "numberday": 1994
    },
    {
      "total": 23172,
      "decayed": 15508,
      "inorbit": 7664,
      "numberday": 1994
    },
    {
      "total": 23322,
      "decayed": 15579,
      "inorbit": 7743,
      "numberday": 1994
    },
    {
      "total": 23462,
      "decayed": 15621,
      "inorbit": 7841,
      "numberday": 1994
    },
    {
      "total": 23566,
      "decayed": 15676,
      "inorbit": 7890,
      "numberday": 1995
    },
    {
      "total": 23648,
      "decayed": 15724,
      "inorbit": 7924,
      "numberday": 1995
    },
    {
      "total": 23722,
      "decayed": 15772,
      "inorbit": 7950,
      "numberday": 1995
    },
    {
      "total": 23813,
      "decayed": 15811,
      "inorbit": 8002,
      "numberday": 1996
    },
    {
      "total": 23914,
      "decayed": 15851,
      "inorbit": 8063,
      "numberday": 1996
    },
    {
      "total": 24323,
      "decayed": 15896,
      "inorbit": 8427,
      "numberday": 1996
    },
    {
      "total": 24700,
      "decayed": 16021,
      "inorbit": 8679,
      "numberday": 1996
    },
    {
      "total": 24752,
      "decayed": 16124,
      "inorbit": 8628,
      "numberday": 1997
    },
    {
      "total": 24875,
      "decayed": 16223,
      "inorbit": 8652,
      "numberday": 1997
    },
    {
      "total": 25012,
      "decayed": 16331,
      "inorbit": 8681,
      "numberday": 1997
    },
    {
      "total": 25145,
      "decayed": 16459,
      "inorbit": 8686,
      "numberday": 1997
    },
    {
      "total": 25326,
      "decayed": 16564,
      "inorbit": 8762,
      "numberday": 1998
    },
    {
      "total": 25430,
      "decayed": 16669,
      "inorbit": 8761,
      "numberday": 1998
    },
    {
      "total": 25548,
      "decayed": 16784,
      "inorbit": 8764,
      "numberday": 1998
    },
    {
      "total": 25645,
      "decayed": 16910,
      "inorbit": 8735,
      "numberday": 1999
    },
    {
      "total": 25776,
      "decayed": 17020,
      "inorbit": 8756,
      "numberday": 1999
    },
    {
      "total": 25906,
      "decayed": 17146,
      "inorbit": 8760,
      "numberday": 1999
    },
    {
      "total": 26051,
      "decayed": 17273,
      "inorbit": 8778,
      "numberday": 1999
    },
    {
      "total": 26242,
      "decayed": 17358,
      "inorbit": 8884,
      "numberday": 2000
    },
    {
      "total": 26403,
      "decayed": 17464,
      "inorbit": 8939,
      "numberday": 2000
    },
    {
      "total": 26589,
      "decayed": 17580,
      "inorbit": 9009,
      "numberday": 2000
    },
    {
      "total": 26693,
      "decayed": 17715,
      "inorbit": 8978,
      "numberday": 2000
    },
    {
      "total": 26765,
      "decayed": 17826,
      "inorbit": 8939,
      "numberday": 2001
    },
    {
      "total": 26889,
      "decayed": 17893,
      "inorbit": 8996,
      "numberday": 2001
    },
    {
      "total": 26984,
      "decayed": 18031,
      "inorbit": 8953,
      "numberday": 2001
    },
    {
      "total": 27388,
      "decayed": 18223,
      "inorbit": 9165,
      "numberday": 2001
    },
    {
      "total": 27444,
      "decayed": 18395,
      "inorbit": 9049,
      "numberday": 2002
    },
    {
      "total": 27530,
      "decayed": 18487,
      "inorbit": 9043,
      "numberday": 2002
    },
    {
      "total": 27639,
      "decayed": 18600,
      "inorbit": 9039,
      "numberday": 2002
    },
    {
      "total": 27717,
      "decayed": 18664,
      "inorbit": 9053,
      "numberday": 2003
    },
    {
      "total": 27853,
      "decayed": 18715,
      "inorbit": 9138,
      "numberday": 2003
    },
    {
      "total": 28059,
      "decayed": 18790,
      "inorbit": 9269,
      "numberday": 2003
    },
    {
      "total": 28153,
      "decayed": 18923,
      "inorbit": 9230,
      "numberday": 2003
    },
    {
      "total": 28251,
      "decayed": 18996,
      "inorbit": 9255,
      "numberday": 2004
    },
    {
      "total": 28383,
      "decayed": 19030,
      "inorbit": 9353,
      "numberday": 2004
    },
    {
      "total": 28471,
      "decayed": 19089,
      "inorbit": 9382,
      "numberday": 2004
    },
    {
      "total": 28627,
      "decayed": 19134,
      "inorbit": 9493,
      "numberday": 2004
    },
    {
      "total": 28701,
      "decayed": 19174,
      "inorbit": 9527,
      "numberday": 2005
    },
    {
      "total": 28876,
      "decayed": 19261,
      "inorbit": 9615,
      "numberday": 2005
    },
    {
      "total": 28927,
      "decayed": 19320,
      "inorbit": 9607,
      "numberday": 2005
    },
    {
      "total": 29046,
      "decayed": 19347,
      "inorbit": 9699,
      "numberday": 2006
    },
    {
      "total": 29253,
      "decayed": 19411,
      "inorbit": 9842,
      "numberday": 2006
    },
    {
      "total": 29521,
      "decayed": 19478,
      "inorbit": 10043,
      "numberday": 2006
    },
    {
      "total": 30579,
      "decayed": 19628,
      "inorbit": 10951,
      "numberday": 2006
    },
    {
      "total": 31489,
      "decayed": 19672,
      "inorbit": 11817,
      "numberday": 2007
    },
    {
      "total": 32049,
      "decayed": 19736,
      "inorbit": 12313,
      "numberday": 2007
    },
    {
      "total": 32372,
      "decayed": 19779,
      "inorbit": 12593,
      "numberday": 2007
    },
    {
      "total": 32710,
      "decayed": 19896,
      "inorbit": 12814,
      "numberday": 2007
    },
    {
      "total": 33107,
      "decayed": 20127,
      "inorbit": 12980,
      "numberday": 2008
    },
    {
      "total": 33395,
      "decayed": 20364,
      "inorbit": 13031,
      "numberday": 2008
    },
    {
      "total": 33489,
      "decayed": 20554,
      "inorbit": 12935,
      "numberday": 2008
    },
    {
      "total": 34806,
      "decayed": 20649,
      "inorbit": 14157,
      "numberday": 2009
    },
    {
      "total": 35680,
      "decayed": 20736,
      "inorbit": 14944,
      "numberday": 2009
    },
    {
      "total": 36085,
      "decayed": 20806,
      "inorbit": 15279,
      "numberday": 2009
    },
    {
      "total": 36399,
      "decayed": 20880,
      "inorbit": 15519,
      "numberday": 2009
    },
    {
      "total": 36584,
      "decayed": 20972,
      "inorbit": 15612,
      "numberday": 2010
    },
    {
      "total": 37136,
      "decayed": 21088,
      "inorbit": 16048,
      "numberday": 2010
    },
    {
      "total": 37253,
      "decayed": 21211,
      "inorbit": 16042,
      "numberday": 2010
    },
    {
      "total": 37381,
      "decayed": 21307,
      "inorbit": 16074,
      "numberday": 2010
    },
    {
      "total": 37727,
      "decayed": 21427,
      "inorbit": 16300,
      "numberday": 2011
    },
    {
      "total": 37835,
      "decayed": 21530,
      "inorbit": 16305,
      "numberday": 2011
    },
    {
      "total": 38069,
      "decayed": 21754,
      "inorbit": 16315,
      "numberday": 2011
    },
    {
      "total": 38244,
      "decayed": 21885,
      "inorbit": 16359,
      "numberday": 2012
    },
    {
      "total": 38737,
      "decayed": 22008,
      "inorbit": 16729,
      "numberday": 2012
    },
    {
      "total": 38990,
      "decayed": 22138,
      "inorbit": 16852,
      "numberday": 2012
    },
    {
      "total": 39085,
      "decayed": 22256,
      "inorbit": 16829,
      "numberday": 2012
    },
    {
      "total": 39169,
      "decayed": 22382,
      "inorbit": 16787,
      "numberday": 2013
    },
    {
      "total": 39245,
      "decayed": 22502,
      "inorbit": 16743,
      "numberday": 2013
    },
    {
      "total": 39478,
      "decayed": 22640,
      "inorbit": 16838,
      "numberday": 2013
    },
    {
      "total": 39621,
      "decayed": 22791,
      "inorbit": 16830,
      "numberday": 2013
    },
    {
      "total": 40058,
      "decayed": 23027,
      "inorbit": 17031,
      "numberday": 2014
    },
    {
      "total": 40268,
      "decayed": 23152,
      "inorbit": 17116,
      "numberday": 2014
    },
    {
      "total": 40373,
      "decayed": 23375,
      "inorbit": 16998,
      "numberday": 2014
    },
    {
      "total": 40618,
      "decayed": 23555,
      "inorbit": 17063,
      "numberday": 2014
    },
    {
      "total": 40872,
      "decayed": 23684,
      "inorbit": 17188,
      "numberday": 2015
    },
    {
      "total": 41031,
      "decayed": 23773,
      "inorbit": 17258,
      "numberday": 2015
    },
    {
      "total": 41379,
      "decayed": 23863,
      "inorbit": 17516,
      "numberday": 2015
    },
    {
      "total": 41578,
      "decayed": 23942,
      "inorbit": 17636,
      "numberday": 2016
    },
    {
      "total": 41758,
      "decayed": 24003,
      "inorbit": 17755,
      "numberday": 2016
    },
    {
      "total": 41892,
      "decayed": 24080,
      "inorbit": 17812,
      "numberday": 2016
    },
    {
      "total": 42431,
      "decayed": 24134,
      "inorbit": 18297,
      "numberday": 2016
    },
    {
      "total": 42824,
      "decayed": 24197,
      "inorbit": 18627,
      "numberday": 2017
    },
    {
      "total": 42948,
      "decayed": 24244,
      "inorbit": 18704,
      "numberday": 2017
    },
    {
      "total": 43168,
      "decayed": 24299,
      "inorbit": 18869,
      "numberday": 2017
    },
    {
      "total": 43449,
      "decayed": 24379,
      "inorbit": 19070,
      "numberday": 2017
    },
    {
      "total": 43591,
      "decayed": 24437,
      "inorbit": 19154,
      "numberday": 2018
    },
    {
      "total": 43705,
      "decayed": 24512,
      "inorbit": 19193,
      "numberday": 2018
    },
    {
      "total": 44056,
      "decayed": 24578,
      "inorbit": 19478,
      "numberday": 2018
    },
    {
      "total": 44321,
      "decayed": 24708,
      "inorbit": 19613,
      "numberday": 2019
    },
    {
      "total": 44533,
      "decayed": 24788,
      "inorbit": 19745,
      "numberday": 2019
    },
    {
      "total": 44902,
      "decayed": 24871,
      "inorbit": 20031,
      "numberday": 2019
    },
    {
      "total": 45475,
      "decayed": 24950,
      "inorbit": 20525,
      "numberday": 2019
    },
    {
      "total": 45872,
      "decayed": 25018,
      "inorbit": 20854,
      "numberday": 2020
    },
    {
      "total": 46669,
      "decayed": 25151,
      "inorbit": 21518,
      "numberday": 2020
    },
    {
      "total": 47531,
      "decayed": 25317,
      "inorbit": 22214,
      "numberday": 2020
    },
    {
      "total": 48422,
      "decayed": 25456,
      "inorbit": 22966,
      "numberday": 2020
    },
    {
      "total": 49063,
      "decayed": 25564,
      "inorbit": 23499,
      "numberday": 2021
    },
    {
      "total": 49489,
      "decayed": 25694,
      "inorbit": 23795,
      "numberday": 2021
    },
    {
      "total": 51810,
      "decayed": 26226,
      "inorbit": 25584,
      "numberday": 2021
    },
    {
      "total": 52783,
      "decayed": 27138,
      "inorbit": 25645,
      "numberday": 2022
    },
    {
      "total": 53541,
      "decayed": 27577,
      "inorbit": 25964,
      "numberday": 2022
    }
  ];
  
  
  const dataHist = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  var dataUsage = [
    
    { name: (lng=='ESP')?("Communicaciones"):('Communications'), value: 2867 },
    { name: (lng=='ESP')?('Desconocido/Secreto'):('Unknown/Secret'), value: 1425},
    { name: (lng=='ESP')?("Observación Terrestre"):('Earth Observation'), value: 1006 },
    { name: (lng=='ESP')?("Desarrollo Tecnológico"):('Technologic Development'), value: 355 },
    { name: (lng=='ESP')?("Navegación"):('Navigation'), value: 164 },
    { name: (lng=='ESP')?('Desarrollo Espacial'):('Space Development'), value: 104 },
    { name: (lng=='ESP')?("Investigación"):('Research'), value: 35 },
    { name: (lng=='ESP')?("Ciencia"):('Science'), value: 20 },
    { name: (lng=='ESP')?("Observación Espacial"):('Space Observation'), value: 10 },
  ];
  
  var dataUsage3 = [
    { name: (lng=='ESP')?("Comercial"):('Commercial'), value: 4237 },
    { name: (lng=='ESP')?("Militar"):('Military Use'), value: 585 },
    { name: (lng=='ESP')?("Gubernamental"):('Government'), value: 217 },
    { name: "Civil", value: 210 }
  ];
  
  var dataOrbit = [
    { name: "LEO", value: 4700, description: (lng=='ESP')?('Low-Eart-Orbit: órbitas con un periodo igual o menor a 128 minutos (11.25 revoluciones diarias) y una excentricidad menor a 0.25. Región: altitudes menores a 2,000km'):
    ('Low-Eart-Orbit: orbits with a period equal to or lower than 128 minutes (11.25 daily revolutions) and an eccentricity up to 0.25. Region: altitudes below 2,000km.') },
    { name: "GEO", value: 565, description: (lng=='ESP')?('Geostacionary Orbit: órbitas cuyo período es el período de rotación de la tierra (t = 23h 56min 4s, o Movimiento medio [0,99,1.01]). Región: altitud de 35,786km'):('Geostacionary Orbit: orbits whose period is the rotation period of the earth (t = 23h 56min 4s, or Mean Motion [0.99,1.01]). Region: altitude of 35,786km') },
    { name: "MEO", value: 140, description: (lng =='ESP')?('Medium-Eart-Orbit: órbitas con un periodo comprendido entre 600 y 800 minutos y una excentricidad menor a 0.25. Región: altitudes entre 2,000 y 35,786km'):('Medium-Earth-Orbit: orbits with a period between 600 and 800 minutes and an eccentricity up to 0.25. Region: altitudes between 2,000 and 35,786km.') },
    { name: "HEO", value: 60, description: (lng == 'ESP')?('High-Elliptical-Orbit: órbitas cuya excentricidad es mayor de 0.25.'):('High-Elliptical-Orbit: orbits whose eccentricity is greater than 0.25.') }
  ];
  var dataOrbitLEO = [
    { name: (lng == 'ESP')?("Inclinada no-polar"):('Inclined nonpolar'), value: 2580 , description: (lng == 'ESP')?('Inclinación de hasta 75º o mayores a 105º, para el caso de órbita retrógrada'):('Inclination up to 75º or greater than 105º, in the case of retrograde orbit.')},
    { name: (lng == 'ESP')?("Heliosíncrona"):('Sun-synchronous orbit (SSO) / heliosynchronous'), value: 1410, description: (lng == 'ESP')?('Órbita polar cuyos puntos de paso por los polos coinciden siempre con la misma posición relativa del sol, o, de igual forma, que pasan por la misma ubicación a la misma hora local.'):
    ('Polar orbit whose points of passage through the poles always coincide with the same relative position of the sun, or, similarly, which pass through the same location at the same local time.') },
    { name: "Polar", value: 673 , description: (lng == 'ESP')?('Inclinación igual o mayor a 75º'):('Inclination equal or greater than 75º') },
    { name: (lng == 'ESP')?("Ecuatorial"):('Equatorial'), value: 18 , description: (lng == 'ESP')?('Inclinación entre 20º y -20º'):('Inclination between 20º and -20º')},
    { name: (lng =='ESP')?("No definida"):('Not defined'), value: 11, description: '' },
    { name: (lng == 'ESP')?("Elíptica"):('Elliptic'), value: 8 , description: (lng == 'ESP')?('Excentricidad mayor de 0.05 y hasta 0.25'):('Eccentricity greater than 0.05 and up to 0.25')}];
  
  var dataOrbitGEO=[{ name: "GEO", value: 565, description:  (lng=='ESP')?('Geostacionary Orbit: órbitas cuyo período es el período de rotación de la tierra (t = 23h 56min 4s, o Movimiento medio [0,99,1.01]). Región: altitud de 35,786km'):('Geostacionary Orbit: orbits whose period is the rotation period of the earth (t = 23h 56min 4s, or Mean Motion [0.99,1.01]). Region: altitude of 35,786km') }];
  
  var dataOrbitMEO=[{ name: (lng == 'ESP')?("Inclinada no-polar"):('Inclined nonpolar'), value: 95 , description: (lng == 'ESP')?('Inclinación de hasta 75º o mayores a 105º, para el caso de órbita retrógrada'):('Inclination up to 75º or greater than 105º, in the case of retrograde orbit.') },
  { name: (lng =='ESP')?("No definida"):('Not defined'), value: 25, description: '' },
  { name: (lng == 'ESP')?("Ecuatorial"):('Equatorial'), value: 20, description: (lng == 'ESP')?('Inclinación entre 20º y -20º'):('Inclination between 20º and -20º') },];
    
  var dataOrbitHEO=[{ name: "Molniya", value: 23 , description: 'Alta excentricidad (perigeo con altitudes en torno a 500km y apogeo con altitudes en torno a 38900) e inclinación (~60º)'},
  { name: (lng =='ESP')?("No definida"):('Not defined'), value: 21 },
  { name: (lng =='ESP')?("Alta excentricidad profunda"):('High Deep Eccentricity'), value: 9, descrption: (lng == 'ESP')?('Excentricidad > 0.7'):('Eccentricity > 0.7') },
  { name: (lng == 'ESP')?("Heliosíncrona"):('Sun-synchronous orbit (SSO)/heliosynchronous'), value: 4, description: (lng == 'ESP')?('Órbita polar cuyos puntos de paso por los polos coinciden siempre con la misma posición relativa del sol, o, de igual forma, que pasan por la misma ubicación a la misma hora local.'):('Polar orbit whose points of passage through the poles always coincide with the same relative position of the sun, or, similarly, which pass through the same location at the same local time.') },
  { name: (lng == 'ESP')?("Inclinada no-polar"):('Inclined nonpolar'), value: 2, description: (lng == 'ESP')?('Inclinación de hasta 75º o mayores a 105º, para el caso de órbita retrógrada. IBEX, VELA'):
  ('Inclination up to 75º or greater than 105º, in the case of retrograde orbit. IBEX, VELA') },
  { name: (lng == 'ESP')?('Más allá de la tierra'):("High Earth Orbit"), value: 1 , description: 'TESS' }];
  
  
  var dataFamilies=[{ name: (lng == 'ESP')?("Resto de satélites"):('Rest of the satellites'), value: 2845 },
  {  name: "Space-X", value: 2219 },
  { name: "OneWeb", value: 427 },
  { name: "Plante Labs, Inc.", value: 215 },
  { name: "Swarm Technologies", value: 151 },
  { name: (lng == 'ESP')?('Ministerio de Defensa Chino'):("Chinese Ministry of National Defense"), value: 135 },
  { name: "Spire Global Inc.", value: 124 },
  { name: (lng == 'ESP')?('Ministerio de Defensa Estados Unidos'):("Ministry of Defense US"), value: 111 },
  { name: "Iridium Communications, Inc.", value: 75 }];
  
  var dataPaises=[{ name: (lng =='ESP')?("EEUU"):('US'), value: 3415, description: '' },
  { name: "China", value: 535, description: '' },
  { name: (lng == 'ESP')?("Reino Unido"):('UK'), value: 486, description: '' },
  { name: (lng == 'ESP')?("Rusia"):('Russia'), value: 170 , description: '' },
  { name: (lng == 'ESP')?("Japón"):('Japan'), value: 88 , description: '' },
  { name: "ESA", value: 62 , description: '' },
  { name: (lng == 'ESP')?("Internacional"):('International'), value: 60 , description: ''},
  { name: "India", value: 59 , description: '' }];

  const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
          cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
          fill, payload, percent, value
        } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontFamily='Righteous' fill={(!light)?('#F9F7F6'):('black')}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={'#FA7268'}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={'#FA7268'}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="FA7268" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} fontFamily='Righteous' textAnchor={textAnchor} fill={(!light)?('#F9F7F6'):('black')}>{(lng == 'ESP')?(`${value} satélites`):(`${value} satellites`)}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} fontFamily='Righteous' dy={18} textAnchor={textAnchor} fill={(!light)?('#F9F7F6'):('black')}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const renderActiveShape2 = (props) => {
  const RADIAN = Math.PI / 180;
  const {
          cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
          fill, payload, percent, value
        } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontFamily='Righteous' fill={(!light)?('#F9F7F6'):('black')}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"#C62368"}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={"#C62368"}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="FA7268" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} fontFamily='Righteous' textAnchor={textAnchor} fill={(!light)?('#F9F7F6'):('black')}>{(lng == 'ESP')?(`${value} satélites`):(`${value} satellites`)}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} fontFamily='Righteous' dy={18} textAnchor={textAnchor} fill={(!light)?('#F9F7F6'):('black')}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const renderActiveShape3 = (props) => {
  const RADIAN = Math.PI / 180;
  const {
          cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
          fill, payload, percent, value
        } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontFamily='Righteous' fill={(!light)?('#F9F7F6'):('black')}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={'#FA7268'}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={'#FA7268'}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="FA7268" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} fontFamily='Righteous' textAnchor={textAnchor} fill={(!light)?('#F9F7F6'):('black')}>{(lng == 'ESP')?(`${value} satélites`):(`${value} satellites`)}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} fontFamily='Righteous' dy={18} textAnchor={textAnchor} fill={(!light)?('#F9F7F6'):('black')}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};



const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const [activeIndex2, setActiveIndex2] = useState(0);
  const onPieEnter2 = useCallback(
    (_, index) => {
      setActiveIndex2(index);
    },
    [setActiveIndex2]
  );

  const [activeIndex3, setActiveIndex3] = useState(0);
  const onPieEnter3 = useCallback(
    (_, index) => {
      setActiveIndex3(index);
    },
    [setActiveIndex3]
  );

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip} style={{backgroundColor:'rgba(250, 62, 144, 0.3)',padding:'10px',borderRadius:'15px',width:'240px'}} >
          <p style={{fontSize:'25px', fontWeight: 'bold'}}>{`${label} :`}</p>
          <p style={{fontSize:'15px', fontWeight: 'bold'}}>{(lng=='ESP')?(`${payload[0].value} satélites en catálogo`):(`${payload[0].value} satellites in catalogue`)}</p>
          <p style={{fontSize:'15px', fontWeight: 'bold' }}>{(lng=='ESP')?(`${payload[1].value} satélites deteriorados`):(`${payload[1].value} 
          deteriorated satellites`)}</p>
          <p style={{fontSize:'15px', fontWeight: 'bold'}}>{(lng=='ESP')?(`${payload[2].value} satélites en órbita`):(`${payload[2].value} satellites in orbit`)}</p>
        </div>
      );
    }
  
    return null;
  };
  
  const CustomTooltipBar = ({ active, payload, label }) => {
    
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip} style={{backgroundColor:'rgba(250, 62, 144, 0.3)',padding:'10px',borderRadius:'15px',width:'240px'}} >
          <p style={{fontSize:'25px'}}>{`${payload[0].payload.name} :`}</p>
          <p style={{fontSize:'15px'}}>{(lng == 'ESP')?(`${payload[0].value} satélites en catálogo`):(`${payload[0].value} satellites in the catalogue`)}</p>
          <p style={{fontSize:'15px'}}>{`${payload[0].payload.description}`}</p>
        </div>
      );
    }
  
    return null;
  };


  const [activeIndexBar, setActiveIndexBar] = useState(0);
  const activeItemBar = dataOrbit[activeIndexBar];

  const handleClick = useCallback(
    (_, index) => {
      setActiveIndexBar(index);
    },
    [setActiveIndexBar]
  );

  function seleccionaGraph(activeIndexBar){
  switch (activeIndexBar) {
    case 0:
      return(<BarChart width={1100} height={400} data={dataOrbitLEO}>
        <Bar dataKey="value" fill="#FA9968" />
        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltipBar />} />
      </BarChart>)
    break;
    case 1:
      return(<BarChart width={1100} height={400} data={dataOrbitGEO}>
        <Bar dataKey="value" fill="#FA9968" />
        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltipBar />} />
      </BarChart>)
    break;
    case 2:
      return(<BarChart width={1100} height={400} data={dataOrbitMEO}>
        <Bar dataKey="value" fill="#FA9968" />
        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltipBar />} />
      </BarChart>)
    break;
    case 3:
      return(<BarChart width={1100} height={400} data={dataOrbitHEO}>
        <Bar dataKey="value" fill="#FA9968" />
        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltipBar />} />
      </BarChart>)
    break;
    default:
      return(<BarChart width={1100} height={400} data={dataOrbitHEO}>
        <Bar dataKey="value" fill="#FA9968" />
        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltipBar />} />
      </BarChart>)
    }
  }


  return(
    <> 
  <Sidebar setLight={setLight} setSidebarOpen={setSidebarOpen}/>
  <Language setLng={setLng}></Language>
  <div className={(light)?(styles.containerLight):(styles.container)}>
     <Head>
        <title>Satellites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <main className={assignTheme(light,sidebarOpen)}>
        <h1 className={(light)?(styles.titleLight):(styles.title)} style={{'font-size':'66px'}}>
          <a href="/docu" className={styles.logo}>{(lng=='ESP')?("Satélites"):("Satellites")}<a className={styles.imageGifTitle}>
            <img href = "/docu" src ={'https://static.wixstatic.com/media/2185e4_20d09071e3f04c5b9dc41ed7f6a4556f~mv2.gif'}/>
        </a></a>
        </h1>

        <h2 onClick={() =>setHistorico((p)=>!p)}><icon><FontAwesomeIcon icon={(historico)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(" Histórico"):(" Historic")}</icon></h2>
              {historico?(<>{<>

                <LineChart
                  width={1100}
                  height={600}
                  data={dataRawHist}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="numberday" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend/>
                  <Line
                    type="monotone"
                    dataKey="total"
                    fontFamily='Righteous'
                    stroke="#C62368"
                    dot={false}
                    /* activeDot={{ r: 0 }} */
                  />
                  <Line type="monotone" dot={false} dataKey="decayed" stroke="#FA7268" />
                  <Line type="monotone" dot={false} dataKey="inorbit" stroke="#FA9968" />
                </LineChart>
              
                <div><p style={{position: 'absolute', bottom:'-40px' ,right: '10px', fontSize:'18px'}}>{(lng == 'ESP')?('Fuente: '):('Source: ')}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
        href='https://celestrak.org/satcat/boxscore.php'>Celestrak.com/</a></p></div>

          </>}</>):('')}

        <h2><icon onClick={() =>setUsos((p)=>!p)}><FontAwesomeIcon icon={(usos)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(" Funcionalidad"):(" Functionality")}</icon></h2>
              {usos?(<>{<>
            
                <PieChart width={1100} height={500} margin={0}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={dataUsage}
                    cx={300}
                    cy={250}
                    innerRadius={80}
                    outerRadius={150}
                    stroke="#C62368"
                    fill="#C62368"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    alignmentBaseline='middle'
                    paddingAngle={2}
                  />
                  <Pie
                    activeIndex={activeIndex2}
                    activeShape={renderActiveShape2}
                    data={dataUsage3}
                    cx={800}
                    cy={250}
                    innerRadius={80}
                    outerRadius={150}
                    stroke='#FA7268'
                    fill='#FA7268'
                    dataKey="value"
                    onMouseEnter={onPieEnter2}
                    alignmentBaseline='middle'
                    paddingAngle={2}
                  />
                </PieChart>

                <p style={{position: 'relative', bottom:'30px' ,right: '0px', fontSize:'18px'}}>{(lng == 'ESP')?('*Sólo satélites activos son tenidos en cuenta. Fuente:'):('*Only active satellites are being counted. Source:')}<a rel="noreferrer" target="_blank" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
                  href='https://www.ucsusa.org/resources/satellite-database'>ucsusa.com/</a></p>

          </>}</>):('')}


        <h2><icon onClick={() =>setOrbits((p)=>!p)}><FontAwesomeIcon icon={(orbits)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(" Tipos de órbita"):(" Types of orbit")}</icon></h2>
              {orbits?(<>{<>
                <div>
                <p style={{/* textAlign:'center', */ fontSize: '18px'}}>{(lng == 'ESP')?("Haz click en la barra deseada para ver los subtipos"):("Click on the desired type to see the subtypes")}</p>
                <BarChart width={1150} height={400} data={dataOrbit}>
                        <Bar dataKey="value" onClick={handleClick}>
                          {dataOrbit.map((_, index) => (
                            <Cell
                              cursor="pointer"
                              fill={(index === activeIndexBar) ? ("#C62368") : ("#FA7268")}
                              key={''}
                            />
                          ))}
                        </Bar>
                        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltipBar/>} />
                </BarChart>
                <p style={{fontFamily:'Righteous'}}>{(lng == 'ESP')?(`Satélites de órbita tipo "${activeItemBar.name}": ${activeItemBar.value}`):
                (`Satellites of Orbit type "${activeItemBar.name}": ${activeItemBar.value}`)}</p>

                </div>

                {seleccionaGraph(activeIndexBar)}
                <p style={{position: 'relative', bottom:'-20px' ,right: '0px', fontSize:'18px'}}>{(lng == 'ESP')?('*Sólo satélites activos son tenidos en cuenta. Fuente:'):('*Only active satellites are being counted. Source:')}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
                  href='https://www.ucsusa.org/resources/satellite-database'>ucsusa.com/</a></p>
        
        </>}</>):('')}

        <h2><icon onClick={() =>setFamilies((p)=>!p)}><FontAwesomeIcon icon={(families)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(" Familias más importantes"):(" Most important families")}</icon></h2>
              {families?(<>{<>

                <PieChart width={1100} height={500} margin={0}>
                  <Pie
                    activeIndex={activeIndex3}
                    activeShape={renderActiveShape3}
                    data={dataFamilies}
                    cx={550}
                    cy={250}
                    innerRadius={100}
                    outerRadius={200}
                    stroke="#C62368"
                    fill="#C62368"
                    dataKey="value"
                    onMouseEnter={onPieEnter3}
                    alignmentBaseline='middle'
                    paddingAngle={2}
                  />
                </PieChart>

                <p style={{position: 'relative', bottom:'-20px' ,right: '0px', fontSize:'18px'}}>{(lng == 'ESP')?('*Sólo satélites activos son tenidos en cuenta. Fuente:'):('*Only active satellites are being counted. Source:')}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
                  href='https://www.ucsusa.org/resources/satellite-database'>ucsusa.com/</a></p>

        </>}</>):('')}

        <h2><icon onClick={() =>setPaises((p)=>!p)}><FontAwesomeIcon icon={(paises)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(" Distribución por países"):(" Satellites per country")}</icon></h2>
              {paises?(<>{<>
                <BarChart width={1100} height={400} data={dataPaises}>
        <Bar dataKey="value" fill="#FA9968" />
        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltipBar />} />
      </BarChart>

      <p style={{position: 'relative', bottom:'-20px' ,right: '0px', fontSize:'18px'}}>{(lng == 'ESP')?('*Sólo satélites activos son tenidos en cuenta. Fuente:'):('*Only active satellites are being counted. Source:')}<a target="_blank" rel="noreferrer" style={{color:'#B9EEFF',textDecoration: 'underline'}} 
                  href='https://www.ucsusa.org/resources/satellite-database'>ucsusa.com/</a></p>
        
        </>}</>):('')}

        <h2><icon onClick={() =>setBuscador((p)=>!p)}><FontAwesomeIcon icon={(buscador)?(faAnglesUp):(faAnglesDown)} width={'20px'} height={'20px'} cursor={'pointer'}/>{(lng=='ESP')?(" Base de datos"):(" Database")}</icon></h2>
              {buscador ? (
                <div style={{ maxWidth: 1200 }}>
                  <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                      rows={gridRows}
                      columns={gridCols}
                      pagination
                      autoPageSize   // picks a sensible page size
                      disableRowSelectionOnClick
                      checkboxSelection={false}
                      density="compact"
                      sortingOrder={['desc', 'asc', null]}
                      slots={{ toolbar: GridToolbar }}  // optional
                    />
                  </div>
                </div>
              ) : null}
        
        
        <Link href="/about">
            <h4 style={{position: 'fixed', top: '95%', right:'5%','fontSize':'20px', padding: '0px', margin: '0px', height:'15px'}}>{(lng=='ESP')?('Acerca de'):('About')}</h4>
        </Link>
      </main>
      </div>
      </>
  )
}