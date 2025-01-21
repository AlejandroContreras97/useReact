import { useState, useEffect } from "react";

const useEnvios = () => {
  // Inicializar los envíos desde localStorage o usar un array vacío
  const [envios, setEnvios] = useState(() => {
    const storedEnvios = localStorage.getItem("envios");
    return storedEnvios ? JSON.parse(storedEnvios) : [];
  });

  const agregarEnvio = (nuevoEnvio) => {
    setEnvios((prevEnvios) => {
      const nuevosEnvios = [...prevEnvios, nuevoEnvio];
      localStorage.setItem("envios", JSON.stringify(nuevosEnvios)); // Guardar en localStorage
      return nuevosEnvios;
    });
  };

  return { envios, agregarEnvio };
};

export default useEnvios;
