import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,Tooltip ,ResponsiveContainer} from "recharts";

const LineJogadoresPorRodada = ({ escalacoesPorRodada }) => {

  // Transforma os dados em um formato adequado para Recharts
  const data = Object.keys(escalacoesPorRodada).map((rodada) => {
    const escalacoes = escalacoesPorRodada[rodada];
    return {
      rodada,
      ...escalacoes,
    };
  });

  console.log(escalacoesPorRodada)

  

  // Obtém a lista de jogadores
  const jogadores = Object.keys(escalacoesPorRodada);


  return (
    <ResponsiveContainer width="100%" height="50%">
    <LineChart width={1400} height={300} data={escalacoesPorRodada}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="apelido" />
      <YAxis />
      <Tooltip />
  
      {/* <Legend /> */}
      {/* {jogadores.map((jogador) => (
        <Line
          key={jogador}
          type="monotone"
          dataKey={jogador}
          name={jogador}
        />
      ))} */}
       <Line type="monotone" dataKey="escalacoes" stroke="#82ca9d" />
    </LineChart>
    </ResponsiveContainer>
  );
};

export default LineJogadoresPorRodada;
