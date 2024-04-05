import React, { createContext, useContext, useMemo, useState } from 'react';
import { AppContextProps, AppContextValue, AppState } from './AppContext.types';

// AppContext context creation
const AppContext = createContext<AppContextValue | null>(null);

// Initial state value
const INITIAL_STATE: AppState = {
  allProducts: [],
  loading: false,
};

// AppContext provider component
export const AppContextProvider: React.FC<AppContextProps> = (props) => {
  // props
  const { children } = props;

  // state
  const [state, setState] = useState(INITIAL_STATE);

  // method to update the state with incoming payload
  const updateState = (payload: any) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };

  const stateValue = useMemo(
    () => ({
      appState: state,
      updateAppState: updateState,
    }),
    [state],
  );

  return (
    <AppContext.Provider value={stateValue}>{children}</AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
