import React, { useState } from "react";
import { Grid, Box, Button, Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import InputSearch from "../../components/InputSearch";
import PersonCart from "../../components/cart";
import { useQuery } from "react-query";
import SelectPerson from "../../components/control/select";

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

export default function Home() {
  const classes = useStyles();
  const [filted, setFilted] = useState([]);
  const [canal,setCanal]= useState('');

  console.log( process.env.REACT_APP_API_KEY)
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

  return (
    <Grid container spacing={3} style={{ margin: 5 }}>
      <Grid
        container
        xs={6}
        style={{ width: "100%", height: 700, justifyContent: "center" }}
      >
        <Paper className={classes.paper}>
          <div style={{display:'flex',flexDirection:"row"}}>
            <div style={{ width: "60%", margin: 5 }}>
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
              return <PersonCart atleta={item} clube={filterClube} status={status} posicao={posicao} canal={canal} />;
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
