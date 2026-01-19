import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isGrid, setGrid] = useState(true);

  return (
    <GlobalContext
      value={{
        isGrid,
        setGrid,
      }}
    >
      {children}
    </GlobalContext>
  );
};

export default GlobalProvider;
