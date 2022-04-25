
import {useState} from 'react';
import axios from "axios";

export default function Clube({id}) {
  const [clube,setClube] = useState('');
  
  async function loadClubes() {
    const response = await axios.get("/atletas/mercado");
    setClube(response.data.clubes[id].nome);  
    
  }
  loadClubes();

  
 return (
  <>{clube}</>
  );
}