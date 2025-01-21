import React, { useState, useEffect } from "react";
import "./ProductsList.css";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    // Cargar datos desde el mock
    import("../data/productos.json")
      .then((data) => {
        setProductos(data.default);
        setProductosFiltrados(data.default); // Inicialmente, mostrar todos los productos
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  // Manejar cambios en la barra de búsqueda
  const handleBusqueda = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    // Filtrar productos según el texto ingresado
    const filtrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(valor) ||
      producto.categoria.toLowerCase().includes(valor) ||
      producto.fabricante.toLowerCase().includes(valor)
    );
    setProductosFiltrados(filtrados);
  };

  return (
    <div className="product-list">
      <h2 className="product-list__title">Lista de Productos</h2>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={handleBusqueda}
        className="product-list__input"
      />
      {/* Lista de productos */}
      <ul className="product-list__items">
        {productosFiltrados.map((producto) => (
          <li
            key={producto.id}
            className={`product-list__item ${
              producto.precio > 1500 ? "product-list__item--highlight" : ""
            }`}
          >
            {producto.nombre} - {producto.categoria} - {producto.fabricante} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
