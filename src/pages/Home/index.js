import React, { useState } from "react";
import { Grid, Box, Button, Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import InputSearch from "../../components/InputSearch";
import PersonCart from "../../components/cart";
import { useQuery } from "react-query";
import SelectPerson from "../../components/control/select";

export default function Home() {
  const classes = useStyles();
  const [filted, setFilted] = useState([]);
  const [canal,setCanal]= useState(''); 
  const [rodada,setRodada]= useState('');
  const { data, isLoading, error } = useQuery("myAtletas", async () => {
    const result = await api.get(`/atletas/mercado`);
    setFilted(result.data.atletas);
    return result.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const canais = [
    {label:"Camilo",value:"Camilo"},
    {label:"Cartomante",value:"Cartomante"},
    {label:"Helinho",value:"Helinho"}
  ]
  const rodadas = [
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
    {label: "4", value: "4"},
    {label: "5", value: "5"},
    {label: "6", value: "6"},
    {label: "7", value: "7"},
    {label: "8", value: "8"},
    {label: "9", value: "9"},
    {label: "10", value: "10"},
    {label: "11", value: "11"},
    {label: "12", value: "12"},
    {label: "13", value: "13"},
    {label: "14", value: "14"},
    {label: "15", value: "15"},
    {label: "16", value: "16"},
    {label: "17", value: "17"},
    {label: "18", value: "18"},
    {label: "19", value: "19"},
    {label: "20", value: "20"},
    {label: "21", value: "21"},
    {label: "22", value: "22"},
    {label: "23", value: "23"},
    {label: "24", value: "24"},
    {label: "25", value: "25"},
    {label: "26", value: "26"},
    {label: "27", value: "27"},
    {label: "28", value: "28"},
    {label: "29", value: "29"},
    {label: "30", value: "30"},
    {label: "31", value: "31"},
    {label: "32", value: "32"},
    {label: "33", value: "33"},
    {label: "34", value: "34"},
    {label: "35", value: "35"},
    {label: "36", value: "36"},
    {label: "37", value: "37"},
    {label: "38", value: "38"}
  ];
  
  

  return (
    <Grid container spacing={3} style={{ margin: 5 }}>
      <Grid
        container
        xs={6}
        style={{ width: "100%", height: 700, justifyContent: "center" }}
      >
        <Paper className={classes.paper}>
          <div style={{display:'flex',flexDirection:"row"}}>
            <div style={{ width: "50%", margin: 5 }}>
              <InputSearch
                filtered={filted}
                setFiltered={setFilted}
                rows={data.atletas}
                searchFields={["apelido", "minimo_para_valorizar"]}
              />
            </div>
            <div style={{ width: "30%", margin: 5 }}>
              <SelectPerson options={canais} label={'Canais'} value={canal} setValue={setCanal} />
            </div>
            <div style={{ width: "20%", margin: 5 }}>
              <SelectPerson options={rodadas} label={'rodada'} value={rodada} setValue={setRodada} />
            </div>
          </div>
          <Box>
            <Button variant="outlined" size="small" className={classes.button}>
              POSIÇÃO
            </Button>
            <Button variant="outlined" size="small" className={classes.button}>
              STATUS
            </Button>
            <Button variant="outlined" size="small" className={classes.button}>
              PREÇO
            </Button>
            <Button variant="outlined" size="small" className={classes.button}>
              TIME
            </Button>
          </Box>
        </Paper>
        <Box style={{ height: 550, width: 547 }}>
          <div
            style={{ overflowY: "scroll", maxHeight: "500px", width: "100%" }}
          >
            {filted?.map((item) => {
              const filterClube = Object.values(data.clubes).find(
                (objeto) => objeto.id === item.clube_id
              );
              const status = Object.values(data.status).find(
                (objeto) => objeto.id === item.status_id
              );
              const posicao = Object.values(data.posicoes).find(
                (objeto) => objeto.id === item.posicao_id
              );
              return <PersonCart 
              atleta={item} clube={filterClube} status={status} posicao={posicao} canal={canal} rodada={rodada} />;
            })}
          </div>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        style={{ backgroundColor: "blue", width: "100%", height: 700 }}
      ></Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 99,
    width: 547,
    marginTop: 10,
    borderRadius: 8,
    padding: 5,
  },
  button: {
    width: 120,
    margin: 5,
    height: 35,
  },
  container_button: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  pesquisar: {
    width: 547,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
}));
