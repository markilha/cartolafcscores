import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import firebase  from "../../services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { DadosContext } from "../../contexts/contextDados";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function CustomizedTables({ rows }) {
  const {atual,setAtual} = React.useContext(DadosContext)

  async function handleDelete(row) {
    const confirmExclusao = window.confirm("Deseja realmente excluir este item?");
      if (confirmExclusao) {
        const atletaDoc = doc(firebase, "Escalacao",row.id);
        await deleteDoc(atletaDoc);
        setAtual(!atual)
        toast.error("Atleta excluído com sucesso!!!");
      }
  
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="left">Canal</StyledTableCell>
            <StyledTableCell align="left">Foto</StyledTableCell>
            <StyledTableCell align="left">Apelido</StyledTableCell>
            <StyledTableCell align="left">Clube</StyledTableCell>
            <StyledTableCell align="left">Posicao</StyledTableCell>
            <StyledTableCell align="left">Valorizar</StyledTableCell>
            <StyledTableCell align="left">Preço</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
                  <StyledTableCell align="left">
                {row.canal.toUpperCase()}
              </StyledTableCell>
              <StyledTableCell align="left">
                <img
                  src={row.foto}
                  alt="Imagem do jogador"
                  style={{ width: 30, height: 30 }}
                />
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.apelido.toUpperCase()}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.clube.toUpperCase()}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.posicao.toUpperCase()}
              </StyledTableCell>
              <StyledTableCell align="left">{row.valorizacao}</StyledTableCell>
              <StyledTableCell align="left">{row.preco}</StyledTableCell>
              <StyledTableCell align="right">
                <button
                  onClick={() => handleDelete(row)}
                  style={{ border: "none", backgroundColor: "transparent", cursor: 'pointer' }}
                >
                  <DeleteOutlineIcon style={{ color: "red" }} />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
