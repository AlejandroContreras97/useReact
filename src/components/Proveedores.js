import React, { useState, useEffect } from "react";
import useProveedores from "../hooks/useProveedores";
import "./Proveedores.css";

const Proveedores = () => {
  const [productos, setProductos] = useState([]); // Productos disponibles
  const [pedido, setPedido] = useState([]); // Productos seleccionados para el pedido
  const [proveedor, setProveedor] = useState(""); // Nombre del proveedor
  const { agregarEnvioProveedor } = useProveedores(); // Hook para gestionar envíos

  useEffect(() => {
    // Cargar datos simulados de productos desde el archivo JSON
    import("../data/productos.json")
      .then((data) => setProductos(data.default))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  // Manejar la adición de un producto al pedido
  const handleAgregarProducto = (producto) => {
    setPedido((prevPedido) => {
      const productoExistente = prevPedido.find((p) => p.id === producto.id);
      if (productoExistente) {
        // Incrementar la cantidad si el producto ya existe
        return prevPedido.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        // Agregar un nuevo producto con cantidad inicial 1
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

  // Manejar la eliminación de un producto del pedido
  const handleEliminarProducto = (id) => {
    setPedido((prevPedido) => prevPedido.filter((p) => p.id !== id));
  };

  // Manejar el envío del pedido al proveedor
  const handleSubmit = (e) => {
    e.preventDefault();

    if (pedido.length === 0 || proveedor === "") {
      alert("Debes seleccionar un proveedor y agregar productos al pedido.");
      return;
    }

    const nuevoEnvio = {
      id: Date.now(), // ID único para el envío
      proveedor,
      productos: pedido,
      estado: "En tránsito", // Estado inicial del envío
    };
    console.log("Función handleSubmit:", nuevoEnvio);
    agregarEnvioProveedor(nuevoEnvio); // Guardar el envío en localStorage
    console.log("Pedido enviado con éxito:", nuevoEnvio);
    alert("Envío registrado con éxito.");
    setProveedor(""); // Resetear el nombre del proveedor
    setPedido([]); // Vaciar el pedido
  };

  return (
    <div className="proveedores">
      <h2 className="proveedores__title">Pedidos a Proveedores</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo para el nombre del proveedor */}
        <div>
          <label className="proveedores__label" htmlFor="proveedor">
            Proveedor:
          </label>
          <input
            type="text"
            id="proveedor"
            value={proveedor}
            onChange={(e) => setProveedor(e.target.value)}
            className="proveedores__input"
            placeholder="Nombre del proveedor"
            required
          />
        </div>

        {/* Lista de productos disponibles */}
        <div>
          <h3 className="proveedores__subtitle">Productos Disponibles</h3>
          <ul className="proveedores__products">
            {productos.map((producto) => (
              <li key={producto.id} className="proveedores__product-item">
                {producto.nombre} - ${producto.precio}
                <button
                  type="button"
                  onClick={() => handleAgregarProducto(producto)}
                  className="proveedores__button"
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

        {/* Lista de productos en el pedido */}
        <div>
          <h3 className="proveedores__subtitle">Productos en el Pedido</h3>
          <ul className="proveedores__products">
            {pedido.map((producto) => (
              <li key={producto.id} className="proveedores__product-item proveedores__product-item--highlight">
                {producto.nombre} - ${producto.precio} x {producto.cantidad}
                <div className="proveedores__actions">
                    <div className="proveedores__quantity-buttons">
                        <button
                            type = "button"
                            onClick={() => handleIncrementarCantidad(producto.id)}
                            className="proveedores__button--quantity">
                            +
                        </button>
                        <button
                            type = "button"
                            onClick={() => handleDecrementarCantidad(producto.id)}
                            className="proveedores__button--quantity">
                            -
                        </button>
                    </div>
                    <button
                    type="button"
                    onClick={() => handleEliminarProducto(producto.id)}
                    className="proveedores__remove-button"
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

        {/* Botón para enviar el pedido */}
        <button type="submit" className="proveedores__submit-button">
          Enviar Pedido
        </button>
      </form>
    </div>
  );
};

export default Proveedores;
