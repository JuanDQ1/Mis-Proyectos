import React, { useState, useEffect } from 'react';
import '../styles/meseroHome.css';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const MeseroHome = () => {
    const [mesa, setMesa] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]); 
    const [productosSeleccionados, setProductosSeleccionados] = useState([]); // Nuevo estado para mantener los productos seleccionados

    useEffect(() => {
        fetchProducts();
        fetchPedidos();

        const intervalId = setInterval(() => {
            fetchProducts();
            fetchPedidos();
        }, 1000);

        return () => clearInterval(intervalId);

    }, []);
    
    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://back-rho-seven.vercel.app/restaurante/productosOb");
            setProductos(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchPedidos = async () => {
        try {
            const response = await axios.get("https://back-rho-seven.vercel.app/restaurante/pedidos");
            setPedidos(response.data.pedidos);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!mesa.trim() || productosSeleccionados.length === 0) {
            alert("Por favor, llene todos los campos correctamente");
            return;
        }

    
        const nuevosPedidos = productosSeleccionados.map(producto => {
            const selectedProduct = productos.find(p => p.name === producto.name);
            const precioTotal = selectedProduct.price * producto.cantidad;
            return { 
                id: uuidv4(),
                idPedido: uuidv4(),        
                mesa,
                producto: producto.name,
                cantidad: producto.cantidad,
                precioTotal,
                estado: 'pendiente',
                mesero: localStorage.getItem('usuario')
            };
        });
    
        try {
            // Enviar los pedidos al servidor backend
            await axios.post("https://back-rho-seven.vercel.app/restaurante/pedidosGu", nuevosPedidos);
            console.log("Pedidos guardados:", nuevosPedidos);
            // Actualizar la lista de pedidos en el estado local
            setPedidos([...pedidos, ...nuevosPedidos]);
        } catch (error) {
            console.error("Error al guardar los pedidos:", error);
            alert("Error al guardar los pedidos. Por favor, inténtelo de nuevo.");
        }
        
        setMesa('');
        setProductosSeleccionados([]);
    };

    const handleChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleAgregarProducto = () => {
        if (!productoSeleccionado.trim() || cantidad <= 0) {
            alert("Por favor, seleccione un producto y especifique la cantidad.");
            return;
        }

        const existente = productosSeleccionados.find(p => p.name === productoSeleccionado);
        if (existente) {
            alert("Este producto ya ha sido seleccionado. Puede cambiar la cantidad en la lista de productos seleccionados.");
            return;
        }

        const nuevoProducto = {
            name: productoSeleccionado,
            cantidad: cantidad
        };

        setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);
        setProductoSeleccionado('');
        setCantidad('');
    };

    const handleEliminarProducto = (index) => {
        const nuevosProductos = [...productosSeleccionados];
        nuevosProductos.splice(index, 1);
        setProductosSeleccionados(nuevosProductos);
    };
    const handleSalir = () => {
        // Aquí puedes agregar la lógica para salir de la sesión, como limpiar el almacenamiento local o redirigir a la página de inicio de sesión
        // Por ejemplo:
        localStorage.removeItem('usuario'); // Elimina el usuario almacenado en el localStorage
        window.location.href = '/'; // Redirige a la página de inicio de sesión
    };

    return (
        <div className="fondo-mesero">
        <div>
        <div className="form-box"> 
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
                            <option key={product._id} value={product.name}>{product.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Cantidad:
                    <input type="number" value={cantidad} onChange={(event) => handleChange(event, setCantidad)} />
                </label>
                <button type="button" onClick={handleAgregarProducto}>Agregar Producto</button>
                <button type="submit">Enviar</button>
            </form>
            </div>
            
            
            <div className="productos-seleccionados">
                
                
                <h2>Productos Seleccionados:</h2>
                <ul>
                    
                    {productosSeleccionados.map((producto, index) => (
                        <li key={index} className="producto-seleccionado">
                            <div>Producto: {producto.name}</div>
                            <div>Cantidad: {producto.cantidad}</div>
                             <button type="button" onClick={() => handleEliminarProducto(index)}>Eliminar</button> 
                        </li>
                    ))}
                </ul>
            </div>
            
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
            <button className="btn-salir" onClick={handleSalir}>Salir</button>
        </div>
        </div>
    );
};

export default MeseroHome;





