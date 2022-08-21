import { getSatelliteInfo } from "tle.js";


export default function Altitude(tle,interval,i,lat,long) {
  
  var altitude = [];
  
  
    altitude=getSatelliteInfo(tle,Date.now()+i*interval,lat,long,0).height;
    
  return(
    altitude
  )
}