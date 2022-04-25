import React from 'react';

export default function Posicao({id}) {
    var result = "";  

    switch (id) {
        case 1:
            result = "Goleiro";
          break;
        case 2:
            result = "Lateral";
          break;
        case 3:
            result = "Zagueiro";
          break;
        case 4:
            result = "Meia";
          break;
        case 5:
            result = "Atacante";
          break;
        default:
            result = "Técnico";
      } 

 return (
   <>{result}</>
  );
}