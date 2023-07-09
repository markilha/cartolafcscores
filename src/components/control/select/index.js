import React, { useCallback } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SelectPerson = React.memo(({ label, options, value, setValue, onAction, ...rest }) => {
  const handleChange = useCallback(
    (event) => {
      const selectedValue = event.target.value;
      setValue(selectedValue);
      if (onAction) {
        onAction(selectedValue);
      }
    },
    [setValue, onAction]
  );

  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <div style={{ borderRadius: "16px" }}>
        <Select
          label={label}
          value={value}
          onChange={handleChange}
          labelWidth={70}
          inputProps={{
            name: label,
            id: label,
          }}
          style={{ height: "38px" }}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
});

export default SelectPerson;

