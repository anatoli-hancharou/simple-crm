import React from 'react'
import AuthProvider from './providers/authProvider.js'
import Routes from "./routes/routes"

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
export default App;