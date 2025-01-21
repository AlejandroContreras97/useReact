import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Redirigir al login
  };

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className={`navbar__item ${location.pathname === "/dashboard" ? "navbar__item--active" : ""}`}>
          <Link to="/dashboard" className="navbar__link">Dashboard</Link>
        </li>
        <li className={`navbar__item ${location.pathname === "/productos" ? "navbar__item--active" : ""}`}>
          <Link to="/productos" className="navbar__link">Productos</Link>
        </li>
        <li className={`navbar__item ${location.pathname === "/pedidos" ? "navbar__item--active" : ""}`}>
          <Link to="/pedidos" className="navbar__link">Pedidos</Link>
        </li>
        <li className={`navbar__item ${location.pathname === "/envios" ? "navbar__item--active" : ""}`}>
          <Link to="/envios" className="navbar__link">Envíos</Link>
        </li>
        <li className="navbar__item">
          <button onClick={handleLogout} className="navbar__link navbar__button">Cerrar sesión</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
