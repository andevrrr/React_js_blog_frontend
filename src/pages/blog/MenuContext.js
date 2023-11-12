import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuClicked, setMenuClicked] = useState(false);

  const toggleMenuClicked = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <MenuContext.Provider value={{ menuClicked, toggleMenuClicked }}>
      {children}
    </MenuContext.Provider>
  );
};
