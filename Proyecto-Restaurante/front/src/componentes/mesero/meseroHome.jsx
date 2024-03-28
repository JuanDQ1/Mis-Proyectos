import React, { useState, useEffect } from 'react';
import '../styles/meseroHome.css';
import axios from "axios";

const MeseroHome = () => {
    const [mesa, setMesa] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]); 

    useEffect(() => {
        fetchProducts();
        fetchPedidos()

        const intervalId = setInterval(() => {
            fetchProducts();
            fetchPedidos(); // Actualiza también la lista de pedidos cada vez que se actualizan los productos
        }, 1000);

        // Limpia el intervalo al desmontar el componente para evitar fugas de memoria
        return () => clearInterval(intervalId);



      }, []);
    
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/restaurante/productosOb");
          setProductos(response.data.productos);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      const fetchPedidos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/restaurante/pedidos");
            setPedidos(response.data.pedidos);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
        }
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!mesa.trim() || !productoSeleccionado.trim() || cantidad <= 0) {
            alert("Por favor, llene todos los campos correctamente");
            return;
        }

        const selectedProduct = productos.find(producto => producto.name === productoSeleccionado);
        if (!selectedProduct) {
            alert("El producto seleccionado no está disponible.");
            return;
        }

        const precioTotal = selectedProduct.price * cantidad;

        const nuevoPedido = { mesa, producto: productoSeleccionado, cantidad, precioTotal, estado: 'pendiente', mesero: localStorage.getItem('usuario') };
        
        try {
          // Enviar el pedido al servidor backend
          const response = await axios.post("http://localhost:3000/restaurante/pedidosGu", nuevoPedido);
          console.log("Pedido guardado:", response.data);
          // Agregar el nuevo pedido a la lista de pedidos en el estado local
          setPedidos([...pedidos, nuevoPedido]);
        } catch (error) {
          console.error("Error al guardar el pedido:", error);
          alert("Error al guardar el pedido. Por favor, inténtelo de nuevo.");
        }
        
        setMesa('');
        setProductoSeleccionado('');
        setCantidad('');
    };

    const handleChange = (event, setter) => {
        setter(event.target.value);
    };
    


    return (
        <div> 
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Meseros</h1>    
                <label>
                    Mesa:
                    <input type="text" value={mesa} onChange={(event) => handleChange(event, setMesa)} />
                </label>
                <label>
                    Producto:
                    <select value={productoSeleccionado} onChange={(event) => handleChange(event, setProductoSeleccionado)}>
                        <option value="">Seleccione un producto</option>
                        {productos.map(product => (
                            <option key={product.id} value={product.name}>{product.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Cantidad:
                    <input type="number" value={cantidad} onChange={(event) => handleChange(event, setCantidad)} />
                </label>
                <button type="submit">Enviar</button>
            </form>
            <div className="pedidos-container">
                <h2>Pedidos:</h2>
                <ul>
                    {pedidos.map((pedido, index) => (
                        pedido.estado === 'pendiente' && (
                        <li key={index} className="pedido-item">
                            <div>Mesero: {pedido.mesero}</div>
                            <div>Mesa: {pedido.mesa}</div>
                            <div>Producto: {pedido.producto}</div>
                            <div>Cantidad: {pedido.cantidad}</div>
                            <div>Precio Total: {pedido.precioTotal}</div>
                            <div className="estado-pendiente">Estado: {pedido.estado}</div>
                            
                        </li>

                        )
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MeseroHome;




