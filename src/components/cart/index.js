import React from "react";
import { Paper } from "@mui/material";

export default function PersonCart({ dados }) {
  let caminhoFoto = dados?.foto?.replace("FORMATO", "220x220");
  return (
    <Paper
      style={{
        height: 90,     
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#fffafa',
        margin:8,
        borderRadius:10,
      }}
    >
      <img
        src={caminhoFoto}
        alt="Minha Imagem"
        height={60}
        width={60}   
        style={{margin:8}}
      />
      {dados.apelido}
      Valorizar: {dados.minimo_para_valorizar}

    </Paper>
  );
}
