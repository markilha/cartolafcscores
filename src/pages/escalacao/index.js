import React, { useState , useEffect} from "react";
import {
  Table,
  Paper,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";

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
  escudo: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  h3: {
    textAlign: "center",
    marginLeft: "30px",
  },
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

export default function Escalcao() {
  const classes = useStyles();
  const[rodada,setRodada] = useState(1);
  const[escalacoes, setEscalacoes] = useState([]);

  useEffect(() => {
    async function loadEscalacoes() {
      const response = await axios.get("http://localhost:5000/escalacaos")
      .then((response)=>{
        setEscalacoes(response.data); 
      })
    }
    loadEscalacoes();
  }, []);

  function handleRodada(e)
{
    setRodada(e.target.value);
    alert(e.target.value);
}
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={12} sm={12} lg={12} xs={12}>
        <FormControl className={classes.margin}>
            <InputLabel id="demo-simple-select-label">Rodada</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rodada}
              onChange={handleRodada}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>

        </Grid>
        <Grid item md={12} sm={12} lg={12} xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Rodada</StyledTableCell>
                  <StyledTableCell align="center">Canal</StyledTableCell>
                  <StyledTableCell align="center">GOL</StyledTableCell>
                  <StyledTableCell align="center">LAT</StyledTableCell>
                  <StyledTableCell align="center">LAT</StyledTableCell>
                  <StyledTableCell align="center">ZAG</StyledTableCell>
                  <StyledTableCell align="center">ZAG</StyledTableCell>
                  <StyledTableCell align="center">MEIA</StyledTableCell>
                  <StyledTableCell align="center">MEIA</StyledTableCell>
                  <StyledTableCell align="center">MEIA</StyledTableCell>
                  <StyledTableCell align="center">ATA</StyledTableCell>
                  <StyledTableCell align="center">ATA</StyledTableCell>
                  <StyledTableCell align="center">ATA</StyledTableCell>
                  <StyledTableCell align="center">TEC</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
            {escalacoes.map((row) => {
             
              return (
                <StyledTableRow key={row.id}>                
                  <StyledTableCell align="center"> {row.rod} </StyledTableCell>
                  <StyledTableCell align="center"> {row.canal} </StyledTableCell>
                  <StyledTableCell align="center"> {row.gol} </StyledTableCell>
                  <StyledTableCell align="center"> {row.lat1} </StyledTableCell>
                  <StyledTableCell align="center"> {row.lat2} </StyledTableCell>
                  <StyledTableCell align="center"> {row.zag1} </StyledTableCell>
                  <StyledTableCell align="center"> {row.zag2} </StyledTableCell>
                  <StyledTableCell align="center"> {row.meia1} </StyledTableCell>
                  <StyledTableCell align="center"> {row.meia2} </StyledTableCell>
                  <StyledTableCell align="center"> {row.meia3} </StyledTableCell>
                  <StyledTableCell align="center"> {row.ata1} </StyledTableCell>
                  <StyledTableCell align="center"> {row.ata2} </StyledTableCell>
                  <StyledTableCell align="center"> {row.ata3} </StyledTableCell>
                  <StyledTableCell align="center"> {row.tec} </StyledTableCell>
               
                </StyledTableRow>
              );
            })}
          </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
