import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../styles/usuariosHome.css";

const UsuariosHome = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://back-rho-seven.vercel.app/restaurante/usuariosOb"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    try {
      const user = await axios.post(
        "https://back-rho-seven.vercel.app/restaurante/usuariosAg",
        newUser
      );
      console.log(user);
      setUsers(user.data);
      setNewUser({ username: "", password: "", role: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (user) => {
    console.log('user');
    console.log(user);
    setNewUser({
      ...newUser,
      _id: user._id,
      username: user.username,
      password: user.password,
      role: user.role,
    });
    
  };

  const edit = async () => {
    console.log('users');
    console.log(newUser);
    try {
      await axios.post(
        `https://back-rho-seven.vercel.app/restaurante/usuariosEdit`,
        newUser
      );
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      await axios.delete(`https://back-rho-seven.vercel.app/restaurante/usuariosEli/${_id}`);

      // Una vez que la eliminación sea exitosa, actualiza la lista de productos
      fetchUsers();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };
  // console.log(users);
  const handleSalir = () => {
    window.location.href = '/';
};

  return (
    <div className="fondo-usuarios">
    <div className="admin-container">
      <h2>Usuarios</h2>
      <div className="add-product">
        <h3>Agregar Usuarios</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="input-field"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="input-field"
        >
          <option value="">Roles</option>
          <option value="admin">Admin</option>
          <option value="mesero">Mesero</option>
          <option value="cocina">Cocina</option>
        </select>
        <button onClick={addUser} className="add-button">
          Guardar Usuario
        </button>
        <button onClick={edit} className="add-button">
          Editar Usuario
        </button>
        <button className="btn-salir" onClick={handleSalir}>Salir</button>
      </div>
      <div>
        <h3>Editar Usuario</h3>
        <table className="table-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuarios</th>
              <th>Contraseña</th>
              <th>Role</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <p onClick={() => updateUser(user)}>editar</p>
                  <p onClick={() => deleteUser(user._id)}><i class="icon-eliminar fas fa-user-minus"></i></p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default UsuariosHome;
