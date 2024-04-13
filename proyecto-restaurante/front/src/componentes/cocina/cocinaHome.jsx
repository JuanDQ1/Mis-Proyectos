import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cocinaHome.css";

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();

    const intervalId = setInterval(fetchPedidos, 1000); // Intervalo de 5 segundos (puedes ajustarlo según tu preferencia)

    // Limpia el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/restaurante/pedidos"
      );
      setPedidos(response.data.pedidos);
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    }
  };

  const marcarPedidoListo = async (id) => {
    try {
      // Envía una solicitud al backend para marcar el pedido como listo
      await axios.post(`http://localhost:3000/restaurante/pedidosAc/${id}`, {
        estado: "listo",
      });

      // Después de que la solicitud se complete con éxito, actualiza la lista de pedidos
      const updatedPedidos = pedidos.filter((pedido) => pedido.id !== id);
      setPedidos(updatedPedidos);
    } catch (error) {
      console.error("Error marking pedido as listo:", error);
    }
  };
  const handleSalir = () => {
    // Aquí puedes agregar la lógica para salir de la sesión, como limpiar el almacenamiento local o redirigir a la página de inicio de sesión
    // Por ejemplo:
    window.location.href = '/'; // Redirige a la página de inicio de sesión
};

  return (
    <div className="fondo-cocina">
    <div>
      <h1>Cocina</h1>
      <table>
        <thead>
          <tr>
            <th>Mesa</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(
            (pedido) =>
              pedido.estado === "pendiente" && (
                <tr key={pedido.id}>
                  <td>{pedido.mesa}</td>
                  <td>{pedido.producto}</td>
                  <td>{pedido.cantidad}</td>
                  <td>{pedido.estado}</td>
                  <td>
                    {pedido.estado === "pendiente" && (
                      <button onClick={() => marcarPedidoListo(pedido.id)}>
                        Marcar como listo
                      </button>
                    )}
                    {/* <button className="btn-salir" onClick={handleSalir}>Salir</button> */}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      <button className="btn-salir" onClick={handleSalir}>Salir</button>
    </div>
    </div>
  );
};

export default Cocina;
