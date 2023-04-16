import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

export function PieChartPersol({data}){ 
  // Cores personalizadas para as fatias do gráfico
  const COLORS = ['#FF0000', '#00FF00', '#0000FF'];

  return (
    <div>
      <h2>Gráfico de Pizza</h2>
      <PieChart width={800} height={800}>
        <Pie
          dataKey="value"
          data={data}
          cx={280}
          cy={280}
          outerRadius={280}
          fill="#8884d8"
          label
        >
          {/* Mapeando as cores personalizadas para as fatias */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend align="center" verticalAlign="bottom" layout="horizontal" /> {/* Ajuste as propriedades de Legend para posicionar a legenda */}
        <Tooltip />
      </PieChart>
    </div>
  );
};


