// const setFilterStatus = (value: string) => {
//     setFilter((prev) => ({ ...prev, status: value }));
//   };
//   const setFilterName = (value: string) => {
//     setFilter((prev) => ({ ...prev, name: value }));
//   };

import { createContext, useEffect, useState } from "react";

export const CharacterDataContext = createContext<any>({});

export default function CharacterDataContextProvider({ children }: any) {
  const [characterData, setCharacterData] = useState<Array<any>>(() => [""]);

  useEffect(() => {}, [characterData]);

  return (
    <CharacterDataContext.Provider value={{ characterData, setCharacterData }}>
      {children}
    </CharacterDataContext.Provider>
  );
}
