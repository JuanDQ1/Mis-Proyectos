const {
    Console
} = require('console');
const fs = require('fs/promises');
const path = require('path');
const Usuario = require('../../db/usuario');
const Producto = require('../../db/producto');


const consultarUsuario = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Consultar el usuario en la base de datos MongoDB
        const user = await Usuario.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        res.json({ status: 200, payload: user });
    } catch (error) {
        console.error('Error al consultar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------
const obtenerUsuarios = async (req, res) => {
    try {
        // Consultar todos los usuarios desde la base de datos MongoDB
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

const agregarUsuario = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Crear un nuevo usuario en la base de datos MongoDB
        const nuevoUsuario = await Usuario.create({ username, password, role });
        const usuarios = await Usuario.find();

        // Respondemos con el nuevo usuario creado
        res.status(201).json(usuarios);
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { username, password, role, _id } = req.body;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(_id, { username, password, role }, { new: true });

        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado correctamente', usuario: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminarUsuario = async (req, res) => {
    const _id = req.params.id;
    try {
        // Buscar y eliminar el usuario en la base de datos MongoDB
        const usuarioEliminado = await Usuario.findByIdAndDelete(_id);

        // Si el usuario no se encuentra, devolver un error 404
        if (!usuarioEliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Devolver una respuesta exitosa
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const agregarProducto = async (req, res) => {
    try {
        const { name, price } = req.body;
        const nuevoProducto = await Producto.create({ name, price });
        const productos = await Producto.find();
        res.status(201).json(productos);
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
const actualizarProducto = async (req, res) => {
    try {
        const { name, price, _id } = req.body;
        const productoActualizado = await Producto.findByIdAndUpdate(_id, { name, price }, { new: true });
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado correctamente', producto: productoActualizado });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminarProducto = async (req, res) => {
    const _id = req.params.id;
    try {
        const productoEliminado = await Producto.findByIdAndDelete(_id);

        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
//-------------------------------------------------------------------------------------
const guardarPedido = async (req, res) => {
    try {
        const productos = req.body;

        // Leer el archivo JSON que contiene los pedidos
        const pedidos = await fs.readFile(path.join(__dirname, '../../db/pedidos.json'));
        const pedidosJson = JSON.parse(pedidos);

        let maxId = 0;

        // Buscar el ID máximo actual
        for (const pedido of pedidosJson.pedidos) {
            if (pedido.id > maxId) {
                maxId = pedido.id;
            }
        }

        // Incrementar el ID máximo para asignar el nuevo ID
        maxId += 1;

        // Asignar IDs a los nuevos productos y agregarlos al array de pedidos existente
        const nuevosPedidos = productos.map(producto => ({
            id: maxId++, // Asignar el ID y luego incrementar maxId para el próximo producto
            ...producto
        }));
        pedidosJson.pedidos.push(...nuevosPedidos);

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(path.join(__dirname, '../../db/pedidos.json'), JSON.stringify(pedidosJson, null, 2));

        // Devolver una respuesta exitosa con los datos de los nuevos pedidos
        res.status(201).json({
            message: 'Pedidos agregados correctamente',
            pedidos: nuevosPedidos
        });
    } catch (error) {
        console.error('Error al agregar el pedido:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};



const obtenerPedidos = async (req, res) => {
    try {
        // Leer el archivo JSON que contiene los pedidos
        const pedidos = await fs.readFile(path.join(__dirname, '../../db/pedidos.json'));
        const pedidosJson = JSON.parse(pedidos);

        // Devolver los pedidos como respuesta
        res.status(200).json({
            pedidos: pedidosJson.pedidos
        });
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};
const marcarPedidoListo = async (req, res) => {
    try {
        const pedidoId = parseInt(req.params.id);
        // Leer el archivo JSON que contiene los pedidos
        const pedidos = await fs.readFile(path.join(__dirname, '../../db/pedidos.json'));
        const pedidosJson = JSON.parse(pedidos);

        // Encuentra el pedido en el array de pedidos
        const pedido = pedidosJson.pedidos.find(pedido => pedido.id === pedidoId);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Marcar el pedido como listo
        pedido.estado = 'listo';

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(path.join(__dirname, '../../db/pedidos.json'), JSON.stringify(pedidosJson, null, 2));

        // Devolver una respuesta exitosa
        res.status(200).json({
            message: 'Pedido marcado como listo',
            pedido: pedido
        });
    } catch (error) {
        console.error('Error al marcar el pedido como listo:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};
const obtenerPedidosPorMesero = async (req, res) => {
    try {
        const mesero = req.params.mesero;
        const pedidos = await fs.readFile(path.join(__dirname, '../../db/pedidos.json'));
        const pedidosJson = JSON.parse(pedidos);

        // Filtrar los pedidos por el nombre del mesero
        const pedidosPorMesero = pedidosJson.pedidos.filter(pedido => pedido.mesero === mesero);

        // Devolver los pedidos encontrados
        res.status(200).json({ pedidos: pedidosPorMesero });
    } catch (error) {
        console.error('Error al obtener pedidos por mesero:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

// --------------------------------------------------------------------------------------------------------------------------------------- 


module.exports = {

    obtenerUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    guardarPedido,
    obtenerPedidos,
    marcarPedidoListo,
    obtenerPedidosPorMesero,

    // ---------------------------------------------------------------------------------------------------------------------------------------
    consultarUsuario,
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto

    // ---------------------------------------------------------------------------------------------------------------------------------------
};