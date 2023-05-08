import React, { ReactNode, createContext, useState } from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setColors: React.Dispatch<React.SetStateAction<ImageColors>>;
  setPrevColors: React.Dispatch<React.SetStateAction<ImageColors>>;
}

export const GradientContext = createContext({} as ContextProps);

const INITIAL_STATE: ImageColors = {
  primary: 'transparent',
  secondary: 'transparent',
};

export const GradientProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState<ImageColors>(INITIAL_STATE);

  const [prevColors, setPrevColors] = useState<ImageColors>(INITIAL_STATE);

  return (
    <GradientContext.Provider
      value={{ colors, prevColors, setColors, setPrevColors }}>
      {children}
    </GradientContext.Provider>
  );
};
