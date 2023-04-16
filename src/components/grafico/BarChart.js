import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export function BarChartCustom({ data }) {
  // Função para gerar uma cor aleatória
  const getRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

  // Cria um array de cores aleatórias
  const colors = data.map(() => getRandomColor());

  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart
        width={800}
        height={100}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />      
        <Bar dataKey="value">
          {
            // Usando a função map para renderizar as barras e atribuir as cores aleatórias usando o componente "Cell"
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
