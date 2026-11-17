import type React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary px-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-semibold" to="/clients">
          AppClients React
        </NavLink>
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/clients">
              Ver clientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/new-client">
              Añadir clientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
