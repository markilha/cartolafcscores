
import React from 'react';

export default function Status({id}) {
    var result = "";
    switch (id) {
        case 2:
            result = "Dúvida";
          break;
        case 3:
            result = "Suspenso";
          break;
        case 5:
            result = "Contundido";
          break;
        case 6:
            result = "Nulo";
          break;
        case 7:
            result = "Provável";
          break;
        default:
            result = "";
      }
 return (
  <>{result}</>
  );
}