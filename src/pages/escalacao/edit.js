import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import './styles.css'
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  TextField,
  FormControl,
  Toolbar,
  InputLabel,
  Select,
  MenuItem,
  Button, 
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 50,
    width: 800,
    },
  formControl: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(2),  
    minWidth: 200,
  },
  selectEmpty: {
    marginRight: theme.spacing(4),
  },
  button:{
    marginTop: theme.spacing(4),

  }
}));

const ComponetForm = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { rodada } = useParams();
  const initialValue = {
    rod: rodada,
    canal: "",
    gol: "",
    lat1: "",
    lat2: "",
    zag1: "",
    zag2: "",
    meia1: "",
    meia2: "",
    meia3: "",
    ata1: "",
    ata2: "",
    ata3: "",
    tec: "",
  };
  const history = useHistory();
  const [values, setValues] = useState(id ? null : initialValue);
  const [atletas, setAtletas] = useState([]);

  useEffect(() => {
    async function loadAtletas() {
      const response = await axios.get("/atletas/mercado");
      setAtletas(response.data.atletas);
    }
    loadAtletas();
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/escalacaos/${id}`).then((response) => {
        setValues(response.data);
      });
    }
  }, [id]);

  function onSubmit(ev) {
    ev.preventDefault();   
    const method = id ? "put" : "post";
    axios[method](
      `http://localhost:5000/escalacaos/${id ? `/${id}` : ""}`,
      values
    ).then((response) => {
      history.push("/escalacao");
    });
  }

  function filtraAtleta(campo, comparar) {
    let lista = [];
    atletas.map((atleta) => {
      if (atleta[campo] == comparar) {
        lista.push({
          nome: atleta.apelido,
        });
      }
    });

    lista.sort((a, b) => (a.nome < b.nome ? -1 : 1));

    return lista;
  }

  function onChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <div>
      {!values ? (
        <div>Carregando...</div>
      ) : (
        <>
          <Toolbar />
          <form onSubmit={onSubmit}>
          <div className= {classes.root}>           
            <Grid item lg={4} xs={4}>
            <FormControl fullWidth  className={classes.formControl}>
                <TextField                
                  type={"text"}
                  label="Rodada"
                  placeholder="Rodada"
                  name="rod"
                  value={values.rod}
                  onChange={onChange}    
                  className={classes.selectEmpty}             
                />
              </FormControl>
            </Grid>
            <Grid item lg={8} xs={8}>
            <FormControl fullWidth  className={classes.formControl}>
                <TextField                
                  type={"text"}
                  label="Canal"
                  placeholder="Canal"
                  name="canal"
                  value={values.canal}
                  onChange={onChange}   
                  className={classes.selectEmpty}              
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={6}>
            <FormControl fullWidth  className={classes.formControl}>
                <InputLabel id="demo-customized-select-label">
                  Goleiro
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="gol"
                  value={values.gol}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.gol}>{values.gol}</MenuItem>
                  {filtraAtleta("posicao_id", "1").map((row,index) => {
                    return <MenuItem  key={index} value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={6}>
            <FormControl fullWidth  className={classes.formControl}>
                <InputLabel id="demo-customized-select-label">
                  Tecnico
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="tec"
                  value={values.tec}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.tec}>{values.tec}</MenuItem>
                  {filtraAtleta("posicao_id", "6").map((row,index) => {
                    return <MenuItem key={index} value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={3} xs={3}>
            <FormControl fullWidth  className={classes.formControl}>
              <InputLabel id="demo-customized-select-label">Lateral</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="lat1"
                  value={values.lat1}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.lat1}>{values.lat1}</MenuItem>
                  {filtraAtleta("posicao_id", "2").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
          
            <Grid item lg={3} xs={3}>
            <FormControl fullWidth  className={classes.formControl}>
              <InputLabel id="demo-customized-select-label">Zagueiro</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="zag1"
                  value={values.zag1}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.zag1}>{values.zag1}</MenuItem>
                  {filtraAtleta("posicao_id", "3").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>         

            <Grid item lg={3} xs={3}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Zagueiro</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="zag2"
                  value={values.zag2}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.zag2}>{values.zag2}</MenuItem>
                  {filtraAtleta("posicao_id", "3").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={3} xs={3}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Lateral</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="lat2"
                  value={values.lat2}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.lat2}>{values.lat2}</MenuItem>
                  {filtraAtleta("posicao_id", "2").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} xs={4}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Meia</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="meia1"
                  value={values.meia1}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.meia1}>{values.meia1}</MenuItem>
                  {filtraAtleta("posicao_id", "4").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4} xs={4}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Meia</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="meia2"
                  value={values.meia2}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.meia2}>{values.meia2}</MenuItem>
                  {filtraAtleta("posicao_id", "4").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4} xs={4}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Meia</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="meia3"
                  value={values.meia3}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.meia3}>{values.meia3}</MenuItem>
                  {filtraAtleta("posicao_id", "4").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>


            
            <Grid item lg={4} xs={4}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Atacante</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="ata1"
                  value={values.ata1}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.ata1}>{values.ata1}</MenuItem>
                  {filtraAtleta("posicao_id", "5").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4} xs={4}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Atacante</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="ata2"
                  value={values.ata2}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.ata2}>{values.ata2}</MenuItem>
                  {filtraAtleta("posicao_id", "5").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4} xs={4}>
            <FormControl fullWidth  className={classes.formControl}> 
              <InputLabel id="demo-customized-select-label">Atacante</InputLabel>          
                <Select              
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="ata3"
                  value={values.ata3}
                  onChange={onChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={values.ata3}>{values.ata3}</MenuItem>
                  {filtraAtleta("posicao_id", "5").map((row,index) => {
                    return <MenuItem key={index}  value={row.nome}>{row.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
      
            <Grid item lg={4} xs={4}>
            <Button            
            type="submit" 
            size="small"   
            variant="outlined" 
            color="primary"   
            className={classes.button}    
            >
            Salvar
          </Button>

            </Grid>


           
          </div>
         
          </form>

        </>
      )}
    </div>
  );
};

export default ComponetForm;
