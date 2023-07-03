import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuidv4 } from "uuid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button } from "@material-ui/core";
import BarChartExample from "../grafico/BarChartAtleta";


export default function SimpleAccordion({
  atleta,
  clube,
  status,
  posicao,
  canal,
  rodada,
  dados,  
  setDados,
}) {
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

  async function handleEnviar() {
    const at = {
      id: uuidv4(),
      rodada: rodada,
      canal: canal,
      apelido: atleta.apelido,
      posicao: posicao.abreviacao,
      atleta_id: atleta.atleta_id,
      clube: clube.abreviacao,
      preco: atleta.preco_num,
      valorizacao: atleta.minimo_para_valorizar,
      foto: caminhoFoto,
    };
    setDados([...dados, at]);
  }



  const dadosGrafico = [
    {  
      mandante: atleta.gato_mestre.media_pontos_mandante,
      sg:atleta.gato_mestre.scouts.mandante.SG,  
      gol:atleta.gato_mestre.scouts.mandante.G,      
      visitante: atleta.gato_mestre.media_pontos_visitante,
      sg_v:atleta.gato_mestre.scouts.visitante.SG,  
      g_v:atleta.gato_mestre.scouts.visitante.G,   
     
    },
  ];


  return (
    <div>
      <Accordion>
        <div style={styles.container}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div style={{ display: "flex", width: 80, marginRight: 10 }}>
              <img
                style={styles.img}
                src={caminhoFoto}
                alt={atleta.apelido}
                loading="lazy"
              />
            </div>

            <div style={styles.coluna}>
              <div
                style={{
                  display: "flex",
                  marginRight: 10,
                  alignItems: "center",
                }}
              >
                <span>{retornaStatus()}</span>
                <span>{atleta.apelido}</span>
              </div>

              <span>
                {" "}
                {posicao.abreviacao.toUpperCase()} | {clube.abreviacao}
              </span>
            </div>

            <div style={styles.col_text}>
              <div>
                <span>Valorizar</span>
              </div>
              <div>
                <span>{atleta.minimo_para_valorizar}</span>
              </div>
            </div>

            <div style={styles.col_text}>
              <div>
                <span>Média</span>
              </div>
              <div>
                <span>{atleta.media_num}</span>
              </div>
            </div>

            <div style={styles.col_text}>
              <div>
                <span>Jogos</span>
              </div>
              <div>
                <span>{atleta.jogos_num}</span>
              </div>
            </div>
          </AccordionSummary>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              style={styles.button}
              onClick={() => handleEnviar()}
            >
              C$ {atleta.preco_num} +
            </Button>
          </div>
          
        </div>

        <AccordionDetails>
            <div style={{width:'100%',marginTop:10}}>
            <BarChartExample data={dadosGrafico}/>
            </div>
        
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  coluna: {
    display: "flex",
    flexDirection: "column",
    width: 200,
  },
  col_text: {
    display: "flex",
    flexDirection: "column",
    width: 80,
  },
  button: {
    backgroundColor: "#26CA5E",
    borderradius: 20,
    color: "#FFFFFF",
  },
};
