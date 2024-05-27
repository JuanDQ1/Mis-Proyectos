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
      "https://back-rho-seven.vercel.app/restaurante/consultarUsuario",
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
    <div className="fondo-form">
    <div className="login-box">
      <h2>Bienvenido al restaurante</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Usuario</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Contraseña</label>
        </div>
        <button type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Entrar
        </button>
      </form>
    </div>
    </div>
  );
}

export default Form;
