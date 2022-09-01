import active from './active2.json';

export default function buscaNombre (id){

  console.log(id)
let obj = active.find(o => o.NORAD_CAT_ID === id);
/* console.log(obj) */
return(obj.OBJECT_NAME)
}
