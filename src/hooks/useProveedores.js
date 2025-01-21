import { useState, useEffect } from "react";

const useProveedores = () => {
  // Obtener los pedidos de proveedores desde localStorage
  const [pedidosp, setPedidos] = useState(() => {
    const storedPedidos = localStorage.getItem("proveedores");
    return storedPedidos ? JSON.parse(storedPedidos) : [];
  });

  // Obtener los envíos de proveedores desde localStorage
  const [enviosProveedores, setEnviosProveedores] = useState(() => {
    const storedEnvios = localStorage.getItem("enviosProveedores");
    return storedEnvios ? JSON.parse(storedEnvios) : [];
  });

  // Actualizar `localStorage` cuando `pedidos` cambie
  useEffect(() => {
    console.log("Pedidos en Hook:", pedidosp);
    localStorage.setItem("proveedores", JSON.stringify(pedidosp));
  }, [pedidosp]);

  // Actualizar `localStorage` cuando `enviosProveedores` cambie
  useEffect(() => {
    console.log("Envíos a Proveedores en Hook:", enviosProveedores);
    localStorage.setItem("enviosProveedores", JSON.stringify(enviosProveedores));
  }, [enviosProveedores]);

  // Función para agregar un nuevo pedido de proveedor
  const agregarPedido = (nuevoPedido) => {
    setPedidos((prevPedidos) => [...prevPedidos, nuevoPedido]);
  };

  // Función para agregar un nuevo envío a proveedores
  const agregarEnvioProveedor = (nuevoEnvio) => {
    setEnviosProveedores((prevEnvios) => [...prevEnvios, nuevoEnvio]);
  };

  return {
    pedidosp,
    agregarPedido,
    enviosProveedores,
    agregarEnvioProveedor,
  };
};

export default useProveedores;
