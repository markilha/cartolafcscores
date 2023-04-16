import { useState, createContext } from 'react';
export const DadosContext = createContext();
export const DadosProvider = ({ children }) => {
  const [atual, setAtual] = useState(false);

  return (
    <DadosContext.Provider
      value={{
       atual,
       setAtual,
      }}
    >
      {children}
    </DadosContext.Provider>
  );
};
