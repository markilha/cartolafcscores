import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Button, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import InputSearch from "../../components/InputSearch";
import PersonCart from "../../components/cart";
import { useQuery } from "react-query";
import SelectPerson from "../../components/control/select";

import firebase from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import CustomizedTables from "../../components/table";
import { DadosContext } from "../../contexts/contextDados";
import { canais, rodadas } from "../../util/config";
import { BarChartCustom } from "../../components/grafico/BarChart";
import Header from "../../components/Header";

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
      let atletas = [];
      // eslint-disable-next-line array-callback-return
      getEscalcao.docs.map((doc) => {
        const documento = doc.data();
        documento.id = doc.id;
        atletas.push(documento);
      });

      const FiltradosPorRodada = atletas.filter((documento) => {
        return documento.rodada == rodada;
      });

      const jogadoresMais = filtrarJogadoresMaisEscaladosPorPosicao(
        FiltradosPorRodada,
        "ata",
        3
      );
      const Mais_meia = filtrarJogadoresMaisEscaladosPorPosicao(
        FiltradosPorRodada,
        "mei",
        3
      );

      const mais = [...jogadoresMais,...Mais_meia]    

      setSelecao(mais);

      const SomaEscalacaoPoPosicao = somarEscalacoes(FiltradosPorRodada);

      setFilterGrafico(SomaEscalacaoPoPosicao);
    }
    getFirebase();
  }, [rodada]);

  function somarEscalacoes(jogadores) {
    const contagemApelidos = {};
    jogadores.forEach((documento) => {
      const id = documento.atleta_id;
      if (!contagemApelidos[id]) {
        contagemApelidos[id] = 0;
      }
      // Incrementa a contagem do apelido correspondente
      contagemApelidos[id]++;
    });

    // Cria um array de jogadores com um campo "value" contendo o valor das escalacoes (contagem)
    const jogadoresComValor = jogadores.map((documento) => {
      return {
        ...documento,
        escalacoes: contagemApelidos[documento.atleta_id],
      };
    });
    return jogadoresComValor;
  }

  function filtrarJogadoresMaisEscaladosPorPosicao(jogadores, posicao, cont) {
    // Calcular a soma total das escalacoes por jogador
    const escalacoesPorJogador = somarEscalacoes(jogadores);
    // Filtrar os jogadores com a posição especificada
    const jogadoresFiltradosPoPosicao = escalacoesPorJogador.filter(
      (jogador) => jogador.posicao === posicao
    );
    // Cria um conjunto (Set) para armazenar os jogadores únicos
    //Retorna o array de jogadores filtrados sem repetições
    const jogadoresUnicos = new Set();
    const jogadoresFiltradosUnicos = jogadoresFiltradosPoPosicao.filter(
      (jogador) => {
        if (!jogadoresUnicos.has(jogador.apelido)) {
          jogadoresUnicos.add(jogador.apelido);
          return true;
        }
        return false;
      }
    );
    jogadoresFiltradosUnicos.sort((a, b) => b.escalacoes - a.escalacoes);
    return jogadoresFiltradosUnicos.slice(0, cont);
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
    <>
      <Header />
      <div className={classes.container_grid}>
        <div className={classes.container_item}>
          <div className={classes.container_item2}>
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

          <div className={classes.container_item2}>
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
          </div>

          <div
            style={{
              width: "98%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                overflowY: "auto",
                maxHeight: "550px",
                width: "100%",
              }}
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
          </div>
        </div>

        {/*ESCOLHA DOS JOGADORES */}

        <div className={classes.container_item}>
          <div className={classes.container_item2}>
            <div
              style={{
                overflowY: "auto",
                maxHeight: "630px",
                width: "100%",
              }}
            >
              <CustomizedTables rows={firedata} />
            </div>
          </div>
        </div>
      </div>

      <div className={classes.container_grid}>
        <div className={classes.container_item}>
          <Typography variant="h6" gutterBottom>
            SELEÇÃO
          </Typography>
          <div
            style={{
              width: "90%",
              overflowY: "auto",
              justifyContent: "center",
              height: 550,
              margin: 10,
            }}
          >
            <CustomizedTables rows={selecao} />
          </div>
        </div>



        <div className={classes.container_item}>
          <Typography variant="h6" gutterBottom>
            GRÁFICO DOS ESCALADOS
          </Typography>
          <div style={{ width: "100%", height: 700 }}>
            <BarChartCustom data={filterGrafico} />
          </div>
        </div>
      </div>
    </>
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
  container_grid: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  container_item: {
    width: "100%",
    height: 700,
    margin: 5,
  },
  container_item2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));
