import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CustomerPage from './containers/CustomerPage/CustomerPage';

const App = () => {
  return (
    <MainLayout>
      <CustomerPage></CustomerPage>
    </MainLayout>
  );
};
export default App;