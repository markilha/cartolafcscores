import React, { useState } from "react";
import { useHistory} from "react-router-dom";

import {
  Grid,
  TextField,
  FormControl,
  Toolbar
  
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textField: {
    width: "100%",
  },
}));

const initialValue = {
    "rod":"",
    "canal":"",
    "gol": "",
    "lat1": "",
    "lat2": "",
    "zag1":"",
    "zag2":"",
    "meia1": "",
    "meia2": "",
    "meia3": "",
    "ata1": "",
    "ata2": "",
    "ata3": "",
    "tec": ""
};

const ComponetForm = ({ id }) => {
  const history = useHistory();
  const [values, setValues] = useState(initialValue);
  const classes = useStyles();


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
          <div className={classes.root}>  
            <Grid item md={12} sm={12} lg={12} xs={12}>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  variant="outlined"
                  type={"text"}
                  label="Canal"
                  placeholder="Canal"
                  name="canal"
                  value={values.canal}
                  onChange={onChange}
                />
              </FormControl>
            </Grid> 
          
          </div>
        </>
      )}
    
    </div>
  );
};

export default ComponetForm;
