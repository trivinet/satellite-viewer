import { getLatLngObj } from "tle.js";


export default function Pos(tle,totalPoints,interval) {
  
  var latLonObj = [];
  var isPossible=true;
  
  for (let i = -Math.ceil(totalPoints/2); i < Math.ceil(totalPoints/2); i++) {
    
    if((Number.isNaN(getLatLngObj(tle,Date.now()+i*interval).lat))||(Number.isNaN(getLatLngObj(tle,Date.now()+i*interval).lng)))
    (
      isPossible = false
    )
    else{
    latLonObj.push(getLatLngObj(tle,Date.now()+i*interval))
    }
  }
  if (isPossible){
  return(
    latLonObj
  )
  } else{
    return({
    lat : 0,
    lng : 0
  })
  }
}

