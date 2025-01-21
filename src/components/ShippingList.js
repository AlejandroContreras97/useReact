import React from "react";
import useEnvios from "../hooks/useEnvios";
import "./ShippingList.css";

const ShippingList = () => {
  const { envios } = useEnvios(); // Obtener envíos desde el custom hook

  return (
    <div className="shipping-list">
      <h2 className="shipping-list__title">Gestión de Envíos</h2>
      <table className="shipping-list__table">
        <thead>
          <tr>
            <th className="shipping-list__header">ID</th>
            <th className="shipping-list__header">Cliente</th>
            <th className="shipping-list__header">Estado</th>
          </tr>
        </thead>
        <tbody>
          {envios.map((envio) => (
            <tr
              key={envio.id}
              className={`shipping-list__row ${
                envio.estado === "Entregado"
                  ? "shipping-list__row--delivered"
                  : "shipping-list__row--in-transit"
              }`}
            >
              <td className="shipping-list__cell">{envio.id}</td>
              <td className="shipping-list__cell">{envio.cliente}</td>
              <td className="shipping-list__cell">{envio.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingList;
