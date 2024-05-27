import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ventasHome.css";

const VentasHome = () => {
  const [ventasPorMesero, setVentasPorMesero] = useState([]);

  useEffect(() => {
    fetchVentas();
    const intervalId = setInterval(fetchVentas, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get("https://back-rho-seven.vercel.app/restaurante/pedidos");
      const ventas = response.data.pedidos;

      // Filtrar solo las ventas que están listas
      const ventasListas = ventas.filter(venta => venta.estado === 'listo');

      // Agrupar ventas listas por mesero
      const ventasAgrupadasPorMesero = {};
      ventasListas.forEach(venta => {
        if (!ventasAgrupadasPorMesero[venta.mesero]) {
          ventasAgrupadasPorMesero[venta.mesero] = [];
        }
        ventasAgrupadasPorMesero[venta.mesero].push(venta);
      });

      // Calcular precio total para cada mesero
      const ventasPorMeseroConPrecioTotal = Object.keys(ventasAgrupadasPorMesero).map(mesero => {
        const productos = ventasAgrupadasPorMesero[mesero].map(venta => venta.producto);
        const precioTotal = ventasAgrupadasPorMesero[mesero].reduce((total, venta) => total + venta.precioTotal, 0);
        return { mesero, productos, precioTotal };
      });

      setVentasPorMesero(ventasPorMeseroConPrecioTotal);
    } catch (error) {
      console.error("Error fetching ventas:", error);
    }
  };
  
  const handleSalir = () => {
    window.location.href = '/';
  
  };

  return (
    <div className="fondo-ventas">
      <div>
        <h1>Ventas</h1>
        <button className="btn-salir" onClick={handleSalir}>Salir</button>
        <table className="ventas-table">
          <thead>
            <tr>
              <th>Mesero</th>
              <th>Producto</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {ventasPorMesero.map((venta, index) => (
              <tr key={index}>
                <td>{venta.mesero}</td>
                <td>{venta.productos.join(", ")}</td>
                <td>{venta.precioTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VentasHome;
