import React, { useState, useEffect } from "react";
import "./EnviosProveedores.css";

const EnviosProveedores = () => {
  const [enviosProveedores, setEnviosProveedores] = useState([]);

  useEffect(() => {
    // Cargar datos de envíos a proveedores desde localStorage o archivo
    const storedEnvios = localStorage.getItem("enviosProveedores");
    if (storedEnvios) {
      setEnviosProveedores(JSON.parse(storedEnvios));
    }
  }, []);

  return (
    <div className="envios-proveedores">
      <h2 className="envios-proveedores__title">Envíos a Proveedores</h2>
      <table className="envios-proveedores__table">
        <thead>
          <tr>
            <th className="envios-proveedores__header">ID</th>
            <th className="envios-proveedores__header">Proveedor</th>
            <th className="envios-proveedores__header">Productos</th>
            <th className="envios-proveedores__header">Estado</th>
          </tr>
        </thead>
        <tbody>
          {enviosProveedores.map((envio) => (
            <tr
              key={envio.id}
              className={`envios-proveedores__row ${
                envio.estado === "Entregado"
                  ? "envios-proveedores__row--delivered"
                  : "envios-proveedores__row--in-transit"
              }`}
            >
              <td className="envios-proveedores__cell">{envio.id}</td>
              <td className="envios-proveedores__cell">{envio.proveedor}</td>
              <td className="envios-proveedores__cell">
                {envio.productos.map((producto, index) => (
                  <div key={index}>
                    {producto.nombre} - {producto.cantidad} unidades
                  </div>
                ))}
              </td>
              <td className="envios-proveedores__cell">{envio.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnviosProveedores;
