import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Cargar usuarios desde el archivo JSON
      import("../data/usuarios.json")
        .then((data) => setUsuarios(data.default))
        .catch((error) => console.error("Error al cargar los usuarios:", error));
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const usuarioValido = usuarios.find(
        (user) => user.username === username && user.password === password
      );
  
      if (usuarioValido) {
        setIsAuthenticated(true); // Establecer el estado como autenticado
        navigate("/dashboard"); // Redirigir a productos
      } else {
        setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      }
    };
  
    return (
      <div className="login">
        <h2 className="login__title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login__form">
          {error && <p className="login__error">{error}</p>}
          <div className="login__field">
            <label htmlFor="username" className="login__label">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              className="login__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login__button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  };
  
  export default Login;
  