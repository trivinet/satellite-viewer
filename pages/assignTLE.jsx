import { useState } from "react";

const tle = `ISS (ZARYA)
  1 25544U 98067A   22200.18518544  .00008537  00000+0  15726-3 0  9998
  2 25544  51.6408 178.1024 0004971  26.6345  84.2777 15.50023189 350148`;
  /* const tle = `CALSPHERE 1             
  1 00900U 64063C   22202.77533537  .00000453  00000+0  47325-3 0  9991
  2 00900  90.1734  41.5384 0024926 280.2982 199.7183 13.73846342875373`;  */
  
    export default function assignTLE(id){

      const [TLE,setTLE]=useState(tle);
      const [TLEisLoading,setTLEIsLoading] = useState(true)
      fetch('https://tle.ivanstanojevic.me/api/tle/'+id)
      .then((response) => response.json())
      .then((TLE) => {
        
        const fullTle = `${TLE.name}
        ${TLE.line1}
        ${TLE.line2}`;
        setTLE(fullTle); // ⬅️ Guardar datos

        //setTLEIsLoading(false); // ⬅️ Desactivar modo "cargando"
      });

      return(
        TLE
      );

    }