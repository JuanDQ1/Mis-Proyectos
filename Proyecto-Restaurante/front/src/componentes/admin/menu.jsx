import "../admin/Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div className="fondo-menu">
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
        </div>
      </div>
    </>
  );
};

export default Menu;
