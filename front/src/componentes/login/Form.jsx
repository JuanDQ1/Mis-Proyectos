import "../styles/Form.css";
// Form.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form({ callback }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const goTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:3000/restaurante/consultarUsuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const responseData = await response.json();
    localStorage.setItem('usuario', responseData.payload.username)
    // console.log("response");
    // console.log(responseData);
    callback(responseData.payload.role); // Llamar al callback con el rol del usuario
    redirectToHomePage(responseData.payload.role); // Redireccionar al usuario según su rol
  };

  const redirectToHomePage = (role) => {
    // console.log(role);
    switch (role) {
      case "mesero":
        goTo("/meseroHome");
        break;
      case "admin":
        goTo("/Menu");
        break;
      case "cocina":
        goTo("/cocinaHome");
        break;
      default:
        console.log("Rol desconocido");
    }
  };

  return (
    <div className="fondo-login">
      <form onSubmit={handleSubmit}>
        <h1 id="txtBienvenida">Bienvenido a nuestro restaurante</h1>
        <h4 className="txt">Nombre de Usuario</h4>
        <input
          type="text"
          className="entry"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <h4 className="txt">Contraseña</h4>
        <input
          type="password"
          className="entry"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Ingresar" id="btnEnviar" />
      </form>
    </div>
  );
}

export default Form;
