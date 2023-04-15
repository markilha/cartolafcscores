import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { Button } from "@material-ui/core";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import {firebase} from "../../services/firebase";
import { collection,addDoc, deleteDoc,doc } from "firebase/firestore";
import { toast } from 'react-toastify';

const Cart = ({ atleta, clube, status, posicao, canal,rodada }) => {
  let caminhoFoto = atleta?.foto?.replace("FORMATO", "220x220");

  function retornaStatus() {
    switch (status.id) {
      case 2:
        return <HelpOutlineIcon style={{ color: "yellow" }} />;
      case 7:
        return <CheckCircleOutlineIcon style={{ color: "green" }} />;
      default:
        return <CancelIcon style={{ color: "red" }} />;
    }
  }

  const escCollectionRef = collection(firebase,"Escalacao")

  
  async function handleEnviar() { 
    const at = {
      rodada: rodada,
      canal:canal,    
      apelido: atleta.apelido,
      posicao: posicao.abreviacao,
      clube:clube.abreviacao,
      preco: atleta.preco_num
    }
   await addDoc(escCollectionRef,at) 
   toast.success('Atleta adicionado com sucesso!!!')
  }

  // async function handleEnviar(dado) { 
  //   const getEscalcao = await getDocs(escCollectionRef)
  //   let documentos = []
  //   getEscalcao.docs.map((doc)=>{
  //     documentos.push(doc.data())
  //   })
  //   console.log(documentos)  
  // }

  // async function deleteAtleta(id){
  //   const atletaDoc = doc(firebase,"Escalacao",id);
  //   await deleteDoc(atletaDoc)
  // }

  return (
    <Card style={styles.cartContainer}>
      <CardMedia image={caminhoFoto} style={styles.fotoContainer} />
      <div style={styles.nomeContainer}>
        <CardContent>
          <div
            style={styles.container}
          >
          <div style={styles.container_info}>
              <span style={styles.nome}>
                {retornaStatus()} {atleta.apelido}
              </span>
              <span style={styles.nome2}>                
                {posicao.abreviacao.toUpperCase()} | {clube.abreviacao}
              </span>
            </div>
            <span style={styles.nome}>{`Detalhes >>`}</span>
          </div>

          <div style={styles.container}>

            <div style={styles.container_info}>
              <div>
                <span style={styles.nome2}>Valorizar</span>
              </div>
              <div>
              <span style={styles.nome3}>{atleta.minimo_para_valorizar}</span>
              </div>
            </div>

            <div style={styles.container_info}>
              <div>
                <span style={styles.nome2}>Média</span>
              </div>
              <div>
              <span style={styles.nome3}>{atleta.media_num}</span>
              </div>
            </div>

            <div style={styles.container_info}>
              <div>
                <span style={styles.nome2}>Jogos</span>
              </div>
              <div>
              <span style={styles.nome3}>{atleta.jogos_num}</span>
              </div>
            </div>

            <div style={styles.container_info}>
            <Button variant="outlined" size="small" style={styles.button} onClick={()=>handleEnviar()}>
              C$ {atleta.preco_num} +
            </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const styles = {
  cartContainer: {
    display: "flex",
    alignItems: "center",
    padding: "1px",
    margin: "5px",
  },
  nomeContainer: {
    flex: 1,
    marginRight: "16px",
  },
  nome: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  nome2: {   
    fontSize: "14px",
  },
  nome3: {   
    fontSize: "14px",
    fontWeight: "bold",
  },
  nulo: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "red",
  },
  provavel: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "green",
  },
  duvida: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "yellow",
  },
  fotoContainer: {
    flex: "none",
    width: "70px",
    height: "70px",
    margin: "5px",
  }, 
 
  container:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

  },
  container_info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin:3
  },
  container_nome: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "blue",
  },
  button:{    
    backgroundColor: "#26CA5E",
    borderradius: 20,
    color: "#FFFFFF",

  }
};

export default Cart;
