import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Link,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Posicao from "../../components/apoio/posicao";
import Estatus from "../../components/apoio/status";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
  },
  margin: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  table: {
    minWidth: 700,
  },
  imagem: {
    maxWidth: 90,
    margin: "auto",
    marginRight: 20,
  },
  link: {
    decoration: "none",
    cursor: "pointer",
  },
  escudo:{
    display: "flex",
    alignItems:'center',
    alignContent:'center',
    flexDirection: 'column',   
  },
  h3:{
    textAlign:'center',
    marginLeft: '30px'
   }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  
}))(TableRow);

export default function Altetas() {
  const classes = useStyles();
  const [atletas, setAtletas] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [filter, setFilter] = useState([]);
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState(7);
  const [posicao, setPosicao] = useState(1);
  const [order, setOrder] = useState(true);

  useEffect(() => {
    async function loadAtletas() {
      const response = await axios.get("/atletas/mercado");
      setAtletas(response.data.atletas);
      setFilter(response.data.atletas);
      setClubes(response.data.clubes);
    }
    loadAtletas();
  }, []);

  function handleAtleta(e) {
    setNome(e.target.value);
    if (nome === "") {
      setFilter(atletas);
    } else {
      setFilter(
        atletas.filter((atleta) => {
          return (
            atleta.apelido.toLowerCase().includes(nome.toLocaleLowerCase()) &&
            atleta.status_id === status
          );
        })
      );
    }
  }

  function handleStatus(e) {
    setStatus(e.target.value);
    setFilter(
      atletas.filter((element) => {
        return element.status_id === e.target.value;
      })
    );
  }
  function handlePosisicao(e) {
    setPosicao(e.target.value);
    setFilter(
      atletas.filter((element) => {
        if (element.status_id !== "") {
          return (
            element.posicao_id === e.target.value &&
            element.status_id === status
          );
        } else {
          return element.posicao_id === e.target.value;
        }
      })
    );
  }
  function handleSort(coluna) {
    setOrder(!order);
    if (order) {
      setFilter(
        [...filter].sort((a, b) =>
          a[coluna] < b[coluna] ? -1 : 1
        )
      );
    } else {
      setFilter(
        [...filter].sort((a, b) =>
        a[coluna] > b[coluna] ? -1 : 1
        )
      );
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={12} sm={12} lg={4} xs={4}>
          <FormControl fullWidth className={classes.margin}>
            <TextField
              id="standard-multiline-flexible"             
              label="Atleta"
              placeholder="Nome"
              multiline
              maxRows={4}
              onChange={(e) => handleAtleta(e)}
            />
          </FormControl>
        </Grid>

        <Grid item md={12} sm={12} lg={4} xs={4}>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel id="demo-simple-select-label">Posição</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={posicao}
              onChange={handlePosisicao}
            >
              <MenuItem value={1}>Goleiro</MenuItem>
              <MenuItem value={2}>Lateral</MenuItem>
              <MenuItem value={3}>Zagueiro</MenuItem>
              <MenuItem value={4}>Meia</MenuItem>
              <MenuItem value={5}>Atacante</MenuItem>
              <MenuItem value={6}>Técnico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} sm={12} lg={4} xs={4}>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel id="demo-simple-select-label">Estátus</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleStatus}
            >
              <MenuItem value={7}>Provável</MenuItem>
              <MenuItem value={2}>Dúvida</MenuItem>
              <MenuItem value={6}>Nulo</MenuItem>
              <MenuItem value={3}>Suspenso</MenuItem>
              <MenuItem value={5}>Contundido</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Clube</StyledTableCell>
              <StyledTableCell align="center">Foto</StyledTableCell>
              <StyledTableCell align="center">
                <Link className={classes.link} onClick={()=> handleSort('apelido')}>
                  Nome
                </Link>
              </StyledTableCell>
          
              <StyledTableCell align="center">Estatus</StyledTableCell>
              <StyledTableCell align="right">
              <Link className={classes.link} onClick={()=> handleSort('preco_num')}>
                  Preço
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Link className={classes.link} onClick={()=> handleSort('media_num')}>
                  Média
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link className={classes.link} onClick={()=> handleSort('minimo_para_valorizar')}>
                  Valorização
                </Link>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter.map((row) => {
              var str = row.foto;
              var foto = "";

              if (row.foto) {
                foto = str.replace("FORMATO", "140x140");
              }

              return (
                <StyledTableRow key={row.atleta_id}>
                  <StyledTableCell align="center">
                    <div className={classes.escudo}>
                      <img
                        src={clubes[row.clube_id].escudos["45x45"]}
                        alt={clubes[row.clube_id].nome}
                        className={classes.imagem}
                      />
                      <h3 className={classes.h3}>{clubes[row.clube_id].abreviacao}</h3>                    
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={foto}
                      alt={row.apelido}
                      className={classes.imagem}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <div className={classes.escudo}>
                 <h2>{row.apelido}</h2> 
                 <h3> <Posicao id={row.posicao_id} /></h3>
                  </div>                  
                    </StyledTableCell>
               
                  <StyledTableCell align="center">
                    <Estatus id={row.status_id} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.preco_num}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.media_num}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.minimo_para_valorizar}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
