import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductManagement from './components/ProductManagement';
import SupplierManagement from './components/SupplierManagement';
import ManageSaleOrders from './components/ManageSaleOrders';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <ProductManagement />
            <ManageSaleOrders />
            <SupplierManagement />
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;

// To kill the process running on port 3000, you can use the following command in your terminal:
// lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
