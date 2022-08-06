import { getSatelliteInfo } from "tle.js";


export default function Altitude(tle,totalPoints,interval,lat,long) {
  
  var altitude = [];
  
  for (let i = -Math.ceil(totalPoints/2); i < Math.ceil(totalPoints/2); i++) {
    altitude=getSatelliteInfo(tle,Date.now()+i*interval,lat[i],long[i],0);
    }
  return(
    altitude.height
  )
}