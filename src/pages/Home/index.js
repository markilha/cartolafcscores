import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Button, Paper,Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import InputSearch from "../../components/InputSearch";
import PersonCart from "../../components/cart";
import { useQuery } from "react-query";
import SelectPerson from "../../components/control/select";

import firebase  from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import CustomizedTables from "../../components/table";
import { DadosContext } from "../../contexts/contextDados";
import { canais, rodadas } from "../../util/config";
import { BarChartCustom } from "../../components/grafico/BarChart";
import Header from '../../components/Header';

export default function Home() {
  const classes = useStyles();
  const { atual } = useContext(DadosContext);
  const [filted, setFilted] = useState([]);
  const [canal, setCanal] = useState("");
  const [rodada, setRodada] = useState(1);
  const [firedata, setFiredata] = useState([]);
  const [filterGrafico, setFilterGrafico] = useState([]);
  const [selecao, setSelecao] = useState([]);

  const escCollectionRef = collection(firebase, "Escalacao");

  // const escCollectionRef = firebase
  // .firestore()
  // .collection("Escalacao")
  // .orderBy("canal", "desc");
  //buscando banco de dados
  useEffect(() => {
    async function getFirebase() {
      const getEscalcao = await getDocs(escCollectionRef).catch((error) =>
        console.log(error)
      );
      let documentos = [];
      // eslint-disable-next-line array-callback-return
      getEscalcao.docs.map((doc) => {
        const documento = doc.data();
        documento.id = doc.id;
        documentos.push(documento);
      });

      const documentosFiltrados = documentos.filter((documento) => {
        return documento.canal == canal && documento.rodada == rodada;
      });

      documentosFiltrados.sort((a, b) => {
        if (a.canal < b.canal) {
          return -1;
        }
        if (a.canal > b.canal) {
          return 1;
        }
        return 0;
      });
      setFiredata(documentosFiltrados);
    }
    getFirebase();
  }, [rodada, atual, canal]);

  useEffect(() => {
    async function getFirebase() {
      const getEscalcao = await getDocs(escCollectionRef);
      let documentos = [];
      // eslint-disable-next-line array-callback-return
      getEscalcao.docs.map((doc) => {
        const documento = doc.data();
        documento.id = doc.id;
        documentos.push(documento);
      });

      const Filtrados = documentos.filter((documento) => {
        return documento.rodada == rodada;
      });

      const atacantes = MelhoresPosicao(documentos, "ata", 3);
      const meias = MelhoresPosicao(documentos, "mei", 3);
      const laterais = MelhoresPosicao(documentos, "zag", 2);
      const zagueiros = MelhoresPosicao(documentos, "lat", 2);
      const goleiro = MelhoresPosicao(documentos, "gol", 1);

      const selecao = [
        ...atacantes,
        ...meias,
        ...laterais,
        ...zagueiros,
        ...goleiro,
      ];
      setSelecao(selecao);

      const contagemApelidos = {};
      Filtrados.forEach((documento) => {
        const apelido = documento.apelido;
        if (!contagemApelidos[apelido]) {
          contagemApelidos[apelido] = 0;
        }
        // Incrementa a contagem do apelido correspondente
        contagemApelidos[apelido]++;
      });
      // Mostra os apelidos e suas contagens
      const data = [];
      for (const apelido in contagemApelidos) {
        data.push({ name: apelido, value: contagemApelidos[apelido] });
      }
      setFilterGrafico(data);
    }
    getFirebase();
  }, [rodada]);

  function MelhoresPosicao(documentos, pos, cont) {
    const Filtrados = documentos.filter((documento) => {
      return documento.rodada === rodada && documento.posicao === pos;
    });
    // Ordena os documentos filtrados com base no campo "posicao" em ordem decrescente
    Filtrados.sort((a, b) => b.posicao - a.posicao);
    // Pega os três primeiros documentos após a ordenação
    const tresMaiores = Filtrados.slice(0, cont);
    return tresMaiores;
  }

  //Puscando atletas api
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

  return (
    <Grid container spacing={3} style={{ margin: 5 }}>
      <Header/>
      <Grid
        container
        xs={6}
        style={{ width: "100%", height: 700, justifyContent: "center" }}
      >
        <Paper className={classes.paper}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "50%", margin: 5 }}>
              <InputSearch
                filtered={filted}
                setFiltered={setFilted}
                rows={data.atletas}
                searchFields={["apelido", "minimo_para_valorizar"]}
              />
            </div>
            <div style={{ width: "30%", margin: 5 }}>
              <SelectPerson
                options={canais}
                label={"Canais"}
                value={canal}
                setValue={setCanal}
              />
            </div>
            <div style={{ width: "20%", margin: 5 }}>
              <SelectPerson
                options={rodadas}
                label={"rodada"}
                value={rodada}
                setValue={setRodada}
              />
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
              return (
                <PersonCart
                  atleta={item}
                  clube={filterClube}
                  status={status}
                  posicao={posicao}
                  canal={canal}
                  rodada={rodada}
                />
              );
            })}
          </div>
        </Box>
      </Grid>
      <Paper style={{ marginTop: 15, height: 620 }}>
        <div
          style={{
            overflowY: "scroll",
            justifyContent: "center",
            height: 550,
            width: 700,
            margin: 10,
          }}
        >
          <CustomizedTables rows={firedata} />
        </div>
      </Paper>

      <Grid container spacing={3} style={{ margin: 5 }}>
        <Grid
          container
          xs={6}
          style={{ width: "100%", height: 700, justifyContent: "center" }}
        >
          <Paper
            style={{
              margin: 20,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <Typography variant="h6" gutterBottom>
      GRÁFICO DOS ESCALADOS
      </Typography>
            <div style={{ width: "100%", height: 700 }}>
              <BarChartCustom data={filterGrafico} />
            </div>
          </Paper>
        </Grid>

        <Grid
          container
          xs={6}
          style={{ width: "100%", height: 700, justifyContent: "center" }}
        >
          <Paper style={{ marginTop: 15, height: 620 }}>
          <Typography variant="h6" gutterBottom>
      SELEÇÃO DA RODADA
      </Typography>
            <div
              style={{
                overflowY: "scroll",
                justifyContent: "center",
                height: 700,
                width: 700,
                margin: 10,
              }}
            >
              <CustomizedTables rows={selecao} />
            </div>
          </Paper>
        </Grid>
      </Grid>
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
