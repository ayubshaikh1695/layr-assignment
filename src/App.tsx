import React from 'react';
import RoutesWrapper from './pages/RoutesWrapper/RoutesWrapper.component';
import { AppContextProvider } from './context/AppContext/AppContext.component';

const App: React.FC = () => (
  <AppContextProvider>
    <RoutesWrapper />
  </AppContextProvider>
);

export default App;
