import "../admin/Menu.css";
import { NavLink } from "react-router-dom";

const handleSalir = () => {
  // Aquí puedes agregar la lógica para salir de la sesión, como limpiar el almacenamiento local o redirigir a la página de inicio de sesión
  // Por ejemplo:
  window.location.href = '/'; // Redirige a la página de inicio de sesión
};

const Menu = () => {
  return (
    <>
    
      <div className="fondo-producto">
        <div className="hoola">
          <div>
            <NavLink to="/adminHome" activeClassName="active">
              Productos
            </NavLink>
          </div>
          <div>
          <NavLink to="/usuariosHome" activeClassName="active">
              usuarios
            </NavLink>
          </div>
          <div>
          <NavLink to="/ventasHome" activeClassName="active">
              ventas
            </NavLink>
          </div>
          <button className="btn-salir" onClick={handleSalir}>Salir</button>
        </div>
      </div>
    </>
  );
};

export default Menu;
