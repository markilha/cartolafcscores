import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function InputSearch({
  filtered,
  setFiltered,
  rows,
  searchFields,
}) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setFiltered(filteredProducao);
  };

  const filteredProducao = rows?.filter((row) => {
    const searchRegex = new RegExp(searchText, 'i');
    if (!searchText.trim()) {
      setFiltered(rows);
      return true;
    }
    return searchFields.some((field) => searchRegex.test(row[field]));
  });

  return (
    <TextField
    fullWidth
      label="Procurar"
      variant="outlined"
      size="small"
      onChange={handleSearch}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
        style: { borderRadius: '16px' }, // opcional, caso queira arredondar as bordas
      }}
    />
  );
}
