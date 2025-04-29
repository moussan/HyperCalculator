import React, { createContext, useState, PropsWithChildren } from 'react';

interface CalculatorContextProps {
  expression: string;
  setExpression: (e: string) => void;
  variable: string;
  setVariable: (v: string) => void;
}

export const CalculatorContext = createContext<CalculatorContextProps>(null as any);

export const CalculatorProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');

  return (
    <CalculatorContext.Provider value={{ expression, setExpression, variable, setVariable }}>
      {children}
    </CalculatorContext.Provider>
  );
};
