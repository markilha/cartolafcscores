import React,{useEffect,useState}from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Card,
  CardContent,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";

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
  const [jogadores,setJogadores] = useState([])

  useEffect(()=>{

    async function getJogadores(){

       const result = await api.get(`atletas/mercado`);
       console.log(result);


    }
    getJogadores()
  })
  return (
    <Grid container spacing={3} style={{ margin: 5 }}>
      <Grid
        container
        xs={6}
        style={{ width: "100%", height: 700, justifyContent: "center" }}
      >
        <Paper className={classes.paper}>
          <Box className={classes.pesquisar}>
            <TextField
              size="small"
              label="Buscar"
              variant="outlined"
              style={{ width: 400, marginBottom: 5 }}
            />

            <Button variant="outlined" className={classes.button}>
              ORDENAR
            </Button>
          </Box>
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
        <Box style={{ background: "blue", height: 550, width: 547 }}>
          <div
            style={{ overflowY: "scroll", maxHeight: "500px", width: "100%" }}
          >
            <Card className={classes.root} variant="outlined">
              <CardContent>
                ola
              </CardContent>
            </Card>
            
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
