const express = require('express')
const Contenedor = require('./Contenedor.js')

const app = express()

const productos = new Contenedor('./productos.txt')

app.get('/productos', async (req, res) => {
    try {
        const todosProductos = await productos.getAll();
        res.send(todosProductos);
    } catch (error) {
        console.log(err);
    }
});


app.get('/productoRandom', async (req, res) => {
    try {
        const todosProductos = await productos.getAll();
        const productoRandom = parseInt(Math.random()* todosProductos.lenght)
        res.send(todosProductos[productoRandom])
    } catch (err) {
        console.log(err);
    }
});


const PORT = 8080;
const server = app.listen(8080, () => {
    console.log(`Servidor http esta escuchando en el puerto ${PORT}`)
})

server.on('error', (error) => console.log(error));