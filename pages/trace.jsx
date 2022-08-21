import { getLatLngObj } from "tle.js";


export default function Pos(tle,totalPoints,interval) {
  
  var latLonObj = [];
  var isPossible=true;
  var i;
  
  for (let i = -Math.ceil(totalPoints/2); i < Math.ceil(totalPoints/2); i++) {
    if ( getLatLngObj(tle,Date.now()+i*interval) != 'x') {
    if((!getLatLngObj(tle,Date.now()+i*interval).hasOwnProperty('lng'))||(getLatLngObj(tle,Date.now()+i*interval)=='x')||(!getLatLngObj(tle,Date.now()+i*interval).hasOwnProperty('lat'))||(getLatLngObj(tle,Date.now()+i*interval).lat=='x')||(getLatLngObj(tle,Date.now()+i*interval).lng=='x')||(Number.isNaN(getLatLngObj(tle,Date.now()+i*interval).lat))||(Number.isNaN(getLatLngObj(tle,Date.now()+i*interval).lng)))
    (
      isPossible = false
    )
    else{
    latLonObj.push(getLatLngObj(tle,Date.now()+i*interval))
    }
  }else{isPossible=false}}
  if (isPossible){
  return(
    latLonObj
  )
  } else{
    return('')
  }
}

