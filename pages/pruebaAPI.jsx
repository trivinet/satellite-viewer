
import { useState } from "react";

export default function cogeTLE(){

    const [todosTLE,setTodosTLE]=useState('');
  const [TLEisLoading,setTLEIsLoading] = useState(true)
  fetch('localhost:3000/api/todosTLE')
  .then((response) => {
      console.log("🚀 ~ file: pruebaAPI.jsx ~ line 11 ~ cogeTLE ~ response", response);
      return response.text()
  })
  
  return(todosTLE)
}
