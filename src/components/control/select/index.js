import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SelectPerson = ({ label, options, value, setValue}) => {
  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(event) => setValue(event.target.value)} 
        labelWidth={70}
        inputProps={{
          name: label,
          id: label,
          borderRadius: "16px",       
        }}
        style={{ borderRadius: "16px", height: "38px" }} 
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectPerson;