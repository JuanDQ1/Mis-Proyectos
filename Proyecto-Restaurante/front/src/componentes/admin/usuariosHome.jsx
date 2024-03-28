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
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/restaurante/usuariosOb"
      );
      setUsers(response.data.usuarios);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    try {
      const user = await axios.post(
        "http://localhost:3000/restaurante/usuariosAg",
        newUser
      );
      // console.log(user);
      setUsers([user.data.usuarios]);
      setNewUser({ username: "", password: "", role: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (user) => {
    // console.log(user);
    setNewUser({
      ...newUser,
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
    });
  };

  const edit = async () => {
    // console.log(newUser);
    // console.log(users);
    try {
      // newProduct lo envie al backend
      await axios.post(
        `http://localhost:3000/restaurante/usuariosEdit`,
        newUser
      );
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/restaurante/usuariosEli/${id}`);

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
  return (
    <div className="admin-container">
      <h2>User Management</h2>
      <div className="add-product">
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="input-field"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="input-field"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="mesero">Mesero</option>
          <option value="cocina">Cocina</option>
        </select>
        <button onClick={addUser} className="add-button">
          Add User
        </button>
        <button onClick={edit} className="add-button">
          Save
        </button>
      </div>
      <div>
        <h3>Edit users</h3>
        <table className="table-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <p onClick={() => updateUser(user)}>editar</p>
                  <p onClick={() => deleteUser(user.id)}><i class="icon-eliminar fas fa-user-minus"></i></p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosHome;
