import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LabelList} from 'recharts';



const BarChartExample = ({data}) => {
  return (
    <BarChart width={500} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="" />     
    
      <Legend />
      <Bar dataKey="mandante" fill="#8884d8">
        <LabelList dataKey="mandante" position="top" formatter={(value) => value.toFixed(2)} />
      </Bar>
      <Bar dataKey="gol"  fill="#8884d8">
        <LabelList dataKey="gol" position="top" formatter={(value) => value.toFixed(2)}/>
      </Bar>
      <Bar dataKey="sg"  fill="#8884d8">
        <LabelList dataKey="sg" position="top" formatter={(value) => value.toFixed(2)}/>
      </Bar>
      <Bar dataKey="visitante" fill="#82ca9d">
        <LabelList dataKey="visitante" position="top" formatter={(value) => value.toFixed(2)}/>
      </Bar>
      <Bar dataKey="gol_v" fill="#82ca9d">
        <LabelList dataKey="gol_v" position="top" formatter={(value) => value.toFixed(2)}/>
      </Bar>
      <Bar dataKey="sg_v"  fill="#82ca9d">
        <LabelList dataKey="sg_v" position="top" formatter={(value) => value.toFixed(2)}/>
      </Bar>
    </BarChart>
  );
};

export default BarChartExample;
