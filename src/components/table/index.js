import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Componente de tabela
const MinhaTabela = ({rows,onDelete }) => {
  
  // Função para remover linha da tabela
  const handleDelete = (row) => {
    onDelete(row); // Chama a função onDelete passando a linha como argumento
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        {/* Cabeçalho da tabela */}
        <TableHead>
          <TableRow>
            {/* Células do cabeçalho */}
            <TableCell align="left">Canal</TableCell>
            <TableCell align="left">Foto</TableCell>
            <TableCell align="left">Apelido</TableCell>
            <TableCell align="left">Clube</TableCell>
            <TableCell align="left">Posicao</TableCell>
            <TableCell align="left">Valorizar</TableCell>
            <TableCell align="left">Preço</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        {/* Corpo da tabela */}
        <TableBody>
          {/* Mapeia as linhas do estado para criar as linhas da tabela */}
          {rows?.map((row, index) => (
            <TableRow key={index}>
              {/* Células das linhas */}
              <TableCell align="left">{row.canal.toUpperCase()}</TableCell>
              <TableCell align="left">
                <img src={row.foto} alt="Imagem do jogador" style={{ width: 30, height: 30 }} />
              </TableCell>
              <TableCell align="left">{row.apelido.toUpperCase()}</TableCell>
              <TableCell align="left">{row.clube.toUpperCase()}</TableCell>
              <TableCell align="left">{row.posicao.toUpperCase()}</TableCell>
              <TableCell align="left">{row.valorizacao}</TableCell>
              <TableCell align="left">{row.preco}</TableCell>
              <TableCell align="right">
                <button
                    onClick={() => handleDelete(row)} 
                  style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}
                >
                  <DeleteOutlineIcon style={{ color: "red" }} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MinhaTabela;
