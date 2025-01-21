import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [envios, setEnvios] = useState([]);

  useEffect(() => {
    // Cargar datos simulados
    import("../data/productos.json")
      .then((data) => setProductos(data.default))
      .catch((error) => console.error("Error al cargar productos:", error));

    import("../data/pedidos.json")
      .then((data) => setPedidos(data.default))
      .catch((error) => console.error("Error al cargar pedidos:", error));

    import("../data/envios.json")
      .then((data) => setEnvios(data.default))
      .catch((error) => console.error("Error al cargar envíos:", error));
  }, []);

  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Panel de Control</h2>
      <div className="dashboard__cards">
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Total de Productos</h3>
          <p className="dashboard__card-value">{productos.length}</p>
        </div>
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Total de Pedidos</h3>
          <p className="dashboard__card-value">{pedidos.length}</p>
        </div>
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Total de Envíos</h3>
          <p className="dashboard__card-value">{envios.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
