import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductsList"; // Importa el componente ProductList
import OrderForm from "./components/OrderForm";
import ShippingList from "./components/ShippingList";
import Proveedores from "./components/Proveedores";
import EnviosProveedores from "./components/EnviosProveedores";


const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/envios"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ShippingList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Proveedores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/envios-proveedores"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EnviosProveedores />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado global para autenticación

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
};

export default App;
