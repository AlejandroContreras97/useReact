import React, { useState, useEffect } from "react";
import useEnvios from "../hooks/useEnvios";
import "./OrderForm.css";

const OrderForm = () => {
  const [productos, setProductos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [cliente, setCliente] = useState("");
  const { agregarEnvio } = useEnvios(); // Usar el hook personalizado

  useEffect(() => {
    // Cargar datos simulados de productos
    import("../data/productos.json")
      .then((data) => setProductos(data.default))
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  const handleAgregarProducto = (producto) => {
    setPedido((prevPedido) => {
      const productoExistente = prevPedido.find((p) => p.id === producto.id);

      if (productoExistente) {
        // Incrementar la cantidad si el producto ya está en el pedido
        return prevPedido.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        // Agregar un nuevo producto al pedido
        return [...prevPedido, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleIncrementarCantidad = (id) => {
    setPedido((prevPedido) =>
      prevPedido.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const handleDecrementarCantidad = (id) => {
    setPedido((prevPedido) =>
      prevPedido
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0) // Eliminar productos con cantidad 0
    );
  };

  const handleEliminarProducto = (id) => {
    setPedido((prevPedido) => prevPedido.filter((p) => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pedido.length === 0) {
      alert("No puedes enviar un pedido vacío.");
      return;
    }

    const nuevoEnvio = {
      id: Date.now(), // ID único basado en la fecha actual
      cliente,
      productos: pedido,
      estado: "En tránsito", // Estado inicial
    };

    agregarEnvio(nuevoEnvio); // Agregar el pedido a envíos
    alert("Pedido enviado con éxito.");
    setCliente("");
    setPedido([]);
  };

  return (
    <div className="order-form">
      <h2 className="order-form__title">Crear Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="order-form__label" htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="order-form__input"
            placeholder="Nombre del cliente"
            required
          />
        </div>
        <div>
          <h3 className="order-form__subtitle">Productos Disponibles</h3>
          <ul className="order-form__products">
            {productos.map((producto) => (
              <li key={producto.id} className="order-form__product-item">
                {producto.nombre} - ${producto.precio}
                <button
                  type="button"
                  onClick={() => handleAgregarProducto(producto)}
                  className="order-form__button"
                >
                  <img
                    src="/icons/add.svg"
                    alt="Agregar"
                    className="order-form__icon"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="order-form__subtitle">Productos en el Pedido</h3>
          <ul className="order-form__products">
            {pedido.map((producto) => (
              <li
                key={producto.id}
                className="order-form__product-item order-form__product-item--highlight"
              >
                {producto.nombre} - ${producto.precio} x {producto.cantidad}
                <div className="order-form__actions">
                  <div className="order-form__quantity-buttons">
                    <button
                      type="button"
                      onClick={() => handleIncrementarCantidad(producto.id)}
                      className="order-form__button--quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecrementarCantidad(producto.id)}
                      className="order-form__button--quantity"
                    >
                      -
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEliminarProducto(producto.id)}
                    className="order-form__remove-button"
                  >
                    <img
                      src="/icons/delete.svg"
                      alt="Eliminar"
                      className="order-form__icon"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="order-form__submit-button">
          Enviar Pedido
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
