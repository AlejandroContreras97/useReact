import React, { useEffect, useState } from "react";
import useEnvios from "../hooks/useEnvios";
import useProveedores from "../hooks/useProveedores";
import "./Dashboard.css";

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const { envios } = useEnvios(); // Usar el hook para los envíos dinámicos
  const { pedidosp: pedidosProveedores, enviosProveedores } = useProveedores();


  useEffect(() => {
    // Cargar datos simulados de productos y pedidos
    import("../data/productos.json")
      .then((data) => setProductos(data.default))
      .catch((error) => console.error("Error al cargar productos:", error));

    import("../data/pedidos.json")
      .then((data) => setPedidos(data.default))
      .catch((error) => console.error("Error al cargar pedidos:", error));
  }, []);

  const totalProductosEnviados = envios.reduce((total, envio) => {
    return total + envio.productos.reduce((subTotal, producto) => subTotal + producto.cantidad, 0);
  }, 0);

  const totalProductosProveedores = enviosProveedores.reduce((total, pedidosp) => {
    console.log("Pedido actual:", pedidosp);
    return total + pedidosp.productos.reduce((subTotal, producto) => subTotal + producto.cantidad, 0);
  }, 0);
  
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
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Total de Productos Enviados</h3>
          <p className="dashboard__card-value">{totalProductosEnviados}</p>
        </div>
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Pedidos a Proveedores</h3>
          <p className="dashboard__card-value">{enviosProveedores.length}</p>
        </div>
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Total de Productos Pedidos a Proveedores</h3>
          <p className="dashboard__card-value">{totalProductosProveedores}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
