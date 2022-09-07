


export default function TimePoints(totalPoints,interval) {
  
  var timePoints =[];
  const hora = Date.now();
  var tiempoFormato;

  for (let i = -(Math.ceil(totalPoints/2)); i < Math.ceil(totalPoints/2); i++) {
    tiempoFormato = new Date(hora + i*interval)
    timePoints.push(tiempoFormato)
  }
  return(
    timePoints
  )
}