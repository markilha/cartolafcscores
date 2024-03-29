import React, { useEffect, useState, useDeferredValue } from "react";

import { Grid, Box,TextField,Button, Typography  } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import InputSearch from "../../components/InputSearch";
import PersonCart from "../../components/cart";
import { useQuery } from "react-query";
import SelectPerson from "../../components/control/select";

import firebase from "../../services/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import CustomizedTables from "../../components/table";
import { DadosContext } from "../../contexts/contextDados";
import { canais, rodadas } from "../../util/config";
import { BarChartCustom } from "../../components/grafico/BarChart";
import LineJogadoresPorRodada from "../../components/grafico/LieChart";
import Header from "../../components/Header";
import "./estilos.css";
import { toast } from "react-toastify";
import SimpleAccordion from "../../components/accordion";

export default function Home() {
  const classes = useStyles();
  const [filted, setFilted] = useState([]);
  const [canal, setCanal] = useState("");
  const [rodada, setRodada] = useState(1);
  const [firedata, setFiredata] = useState([]);
  const [filterGrafico, setFilterGrafico] = useState([]);
  const [selecao, setSelecao] = useState([]);
  const [precoTotal, setPrecoTotal] = useState("");
  const [posicaJog, setPosicaoJog] = useState("");
  const [atual, setAtual] = useState(false);
  const [dataEscolhido, setDataEscolhido] = useState([]);
  const [searchText, setSearchText] = useState('');
  const DeferredValue = useDeferredValue(searchText)

  const escCollectionRef = collection(firebase, "Escalacao");
  const posicoes = [
    { label: "Goleiro", value: "gol" },
    { label: "Zagueiro", value: "zag" },
    { label: "Lateral", value: "lat" },
    { label: "Meia", value: "mei" },
    { label: "Atacante", value: "ata" },
    { label: "Técnico", value: "tec" },
  ];
 

  //Puscando atletas api
  const { data, isLoading, error } = useQuery(
    "myAtletas",
    async () => {
      const result = await api.get(`/atletas/mercado`);
      setFilted(result.data.atletas);
      return result.data;
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    async function getFirebase() {
      const getEscalcao = await getDocs(escCollectionRef);
      let documentos = [];
      getEscalcao.docs.map((doc) => {
        const documento = doc.data();
        documento.id = doc.id;
        documentos.push(documento);
      });
      setFiredata(documentos);
    }
    getFirebase();
  }, []);

  async function handleRodada(value) {
    async function getFirebase() {
      const FiltradosPorRodada = firedata.filter((documento) => {
        return documento.rodada === value;
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
      const Mais_lat = filtrarJogadoresMaisEscaladosPorPosicao(
        FiltradosPorRodada,
        "lat",
        2
      );
      const Mais_zag = filtrarJogadoresMaisEscaladosPorPosicao(
        FiltradosPorRodada,
        "zag",
        2
      );
      const Mais_gol = filtrarJogadoresMaisEscaladosPorPosicao(
        FiltradosPorRodada,
        "gol",
        1
      );
      const Mais_tec = filtrarJogadoresMaisEscaladosPorPosicao(
        FiltradosPorRodada,
        "tec",
        1
      );

      const mais = [
        ...jogadoresMais,
        ...Mais_meia,
        ...Mais_lat,
        ...Mais_zag,
        ...Mais_gol,
        ...Mais_tec,
      ];

      setSelecao(mais);
      const totalTime = somarvalor(mais);
      setPrecoTotal(totalTime.toFixed(2).toString());
      const SomaEscalacaoPoPosicao = somarEscalacoes(FiltradosPorRodada);
      setFilterGrafico(SomaEscalacaoPoPosicao);
    }
    getFirebase();
  }

  function encontrarJogadoresProximoValor(jogadores, valor) {
    const jogadoresOrdenados = jogadores.sort((a, b) => a.preco - b.preco); // Ordenar os jogadores pelo preço
    let somaAtual = 0;
    let indice = 0;

    // Percorrer a lista de jogadores e encontrar a soma mais próxima do valor informado
    for (let i = 0; i < jogadoresOrdenados.length; i++) {
      if (somaAtual + jogadoresOrdenados[i].preco <= valor) {
        somaAtual += jogadoresOrdenados[i].preco;
        indice = i;
      } else {
        break;
      }
    }

    return jogadoresOrdenados.slice(0, indice + 1);
  }

  function somarvalor(array) {
    let soma = 0;
    for (let i = 0; i < array.length; i++) {
      soma += array[i].preco;
    }
    return soma;
  }

  function somarEscalacoes(jogadores) {
    const contagemApelidos = {};
    jogadores.forEach((documento) => {
      const id = documento.atleta_id;
      if (!contagemApelidos[id]) {
        contagemApelidos[id] = 0;
      }
      contagemApelidos[id]++;
    });
    const jogadoresComValor = jogadores.map((documento) => {
      return {
        ...documento,
        escalacoes: contagemApelidos[documento.atleta_id],
      };
    });
    return jogadoresComValor;
  }

  function filtrarJogadoresMaisEscaladosPorPosicao(jogadores, posicao, cont) {
    const escalacoesPorJogador = somarEscalacoes(jogadores);
    const jogadoresFiltradosPoPosicao = escalacoesPorJogador.filter(
      (jogador) => jogador.posicao === posicao
    );
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  async function handleEnviar() {
    try {
      for (const atleta of dataEscolhido) {
        await addDoc(escCollectionRef, atleta);
        // const atletaRef = doc(escCollectionRef, atleta.id);

        // const atletaSnapshot = await getDoc(atletaRef);
        // if (!atletaSnapshot.exists()) {
        //   await addDoc(escCollectionRef, atleta);
        // }
      }
      setAtual(!atual);

      toast.success("Atletas adicionados com sucesso!!!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // async function handleRemover(atletaId) {
  //   try {
  //     const atletaRef = doc(escCollectionRef, atletaId);
  //     await deleteDoc(atletaRef);
  //     toast.success("Atleta removido com sucesso!!!");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }

  const handleDelete = async (row) => {
    // await handleRemover(row.id);
    const newData = [...dataEscolhido];
    const rowIndex = newData.findIndex((r) => r === row);
    if (rowIndex !== -1) {
      newData.splice(rowIndex, 1);
      setDataEscolhido(newData);
    }
  };

  const handleChangePosicao = async (value) => {
    const FiltradosPorRodada = firedata.filter((documento) => {
      return documento.rodada === rodada;
    });
    const escalacoesPorJogador = somarEscalacoes(FiltradosPorRodada);
    const jogadoresFiltradosPoPosicao = escalacoesPorJogador.filter(
      (jogador) => jogador.posicao === value
    );
    const jogadoresUnicosPorApelido = Object.values(
      jogadoresFiltradosPoPosicao.reduce((acc, jogador) => {
        acc[jogador.apelido] = jogador;
        return acc;
      }, {})
    ).sort((jogadorA, jogadorB) => jogadorB.escalacoes - jogadorA.escalacoes);

    setFilterGrafico(jogadoresUnicosPorApelido);
  };

  function handleCanal(value) {
    const FiltradosPorRodada = firedata.filter((documento) => {
      return documento.rodada === rodada;
    });
    const FiltradosPorCanal = FiltradosPorRodada.filter((documento) => {
      return documento.canal === value;
    });
    setDataEscolhido(FiltradosPorCanal);
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    filtrarDados()
  };
  

  const filtrarDados = (value) => {
    const lowerCaseTerm = value.toLowerCase();
    const filteredData = data.atletas.filter(item =>
      item.apelido.toLowerCase().includes(lowerCaseTerm)
    );   
    setFilted(filteredData);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      filtrarDados(event.target.value)
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "98%",
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* BUSCA NA API */}
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.container_item}>
              <div className={classes.search}>
                <div style={{ width: "50%", margin: 5 }}>
                  <TextField
                    fullWidth
                    label="Procurar"
                    variant="outlined"
                    size="small"
                    onChange={(text)=> setSearchText(text)}
                    onKeyDown={handleKeyDown}
                    InputProps={{                      
                      style: { borderRadius: "16px" },
                    }}
                  />
                </div>
                <div style={{ width: "20%", margin: 5 }}>
                  <SelectPerson
                    options={canais}
                    label={"Canais"}
                    value={canal}
                    setValue={setCanal}
                    onAction={(value) => handleCanal(value)}
                  />
                </div>
                <div style={{ width: "20%", margin: 5 }}>
                  <SelectPerson
                    options={rodadas}
                    label={"rodada"}
                    value={rodada}
                    setValue={setRodada}
                    onAction={(value) => handleRodada(value)}
                  />
                </div>
              </div>

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
                      key={item.id}
                      atleta={item}
                      clube={filterClube}
                      status={status}
                      posicao={posicao}
                      canal={canal}
                      rodada={rodada}
                      setDados={setDataEscolhido}
                      dados={dataEscolhido}
                    />
                  );
                })}
              </div>
            </div>
          </Grid>
          {/*TABELA DAS ESCOLHAS */}
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.container_item}>
              <div className={classes.container_item2}>
                <div
                  style={{
                    overflowY: "auto",
                    maxHeight: "630px",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={() => handleEnviar()}
                  >
                    SALVAR
                  </Button>

                  <CustomizedTables
                    rows={dataEscolhido}
                    onDelete={(row) => handleDelete(row)}
                  />
                </div>
              </div>
            </div>
          </Grid>
          {/* SELEÇÃO*/}
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.container_item}>
              <Typography variant="h6" gutterBottom>
                SELEÇÃO - C$ {precoTotal}
              </Typography>
              <div
                style={{
                  width: "90%",

                  justifyContent: "center",
                  height: 550,
                  margin: 10,
                }}
              >
                <div>
                  {/* <img src="img/campinho.png" alt="Exemplo de Imagem" width={600} height={500}/> */}

                  <div className="campo">
                    {selecao[0] && (
                      <div className="ata1">
                        <div>
                          <span className="texto">{selecao[0].apelido}</span>
                        </div>
                        <img
                          className="imagem"
                          src={selecao[0].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[1] && (
                      <div className="ata2">
                        <div>
                          <span>{selecao[1].apelido}</span>
                        </div>

                        <img
                          className="imagem"
                          src={selecao[1].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[2] && (
                      <div className="ata3">
                        <div>
                          <span>{selecao[2].apelido}</span>
                        </div>
                        <img
                          className="imagem"
                          src={selecao[2].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[3] && (
                      <div className="mei1">
                        <span>{selecao[3].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[3].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[4] && (
                      <div className="mei2">
                        <span>{selecao[4].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[4].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[5] && (
                      <div className="mei3">
                        <span>{selecao[5].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[5].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[6] && (
                      <div className="dev1">
                        <span>{selecao[6].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[6].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[8] && (
                      <div className="dev2">
                        <span>{selecao[8].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[8].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[9] && (
                      <div className="dev3">
                        <span>{selecao[9].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[9].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[7] && (
                      <div className="dev4">
                        <span>{selecao[7].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[7].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[10] && (
                      <div className="gol">
                        <span>{selecao[10].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[10].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                    {selecao[11] && (
                      <div className="tec">
                        <span>{selecao[11].apelido}</span>
                        <img
                          className="imagem"
                          src={selecao[11].foto}
                          alt="Exemplo de Imagem"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* <CustomizedTables rows={selecao} /> */}
              </div>
            </div>
          </Grid>
          {/* TABELA SELECAO*/}
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.container_item}>
              <div className={classes.container_item2}>
                <div
                  style={{
                    overflowY: "auto",
                    maxHeight: "630px",
                    width: "100%",
                  }}
                >
                  <CustomizedTables rows={selecao} />
                </div>
              </div>
            </div>
          </Grid>
          {/* GRAFICO BARRA*/}
          <Grid item xs={12}>
            <div className={classes.container_item}>
              <div style={{ width: 300, margin: 10, marginLeft: 50 }}>
                <SelectPerson
                  options={posicoes}
                  label={"Posição"}
                  value={posicaJog}
                  setValue={setPosicaoJog}
                  onAction={(value) => handleChangePosicao(value)}
                />
              </div>
              <BarChartCustom data={filterGrafico} />
              <LineJogadoresPorRodada escalacoesPorRodada={filterGrafico} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container_grid: {
    display: "flex",
    width: "98%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  container_item: {
    border: "1px solid",
    borderRadius: 10,
    width: "98%",
    height: 700,
    margin: 2,
    padding: 10,
  },
  container_item2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    padding: 10,
  },
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
