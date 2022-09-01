const express = require('express')
const { Router } = express
const Contenedor = require('../api/Contenedor.js')
const handlebars = require('express-handlebars')

const app = express()
app.use(express.static('./public'))
//app.use('./api/Contenedor.js', productosRouter)

const contenedor = new Contenedor('./productos.txt')

const productosRouter = new Router()


// DESAFIO MOTORES DE PLANTILLAS

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("views engine", "hbs");
app.set("views", "./views");

app.get('/productos', (req, res)=>{
    const producto = req.body
    contenedor.guardar(producto)
    res.redirect('/')
})

app.get('/productos', (req,res)=>{
    const producto = contenedor.getAll()
    res.render("vista", {
        producto: producto,
        subirProducto: producto.length
    });
});

/*

productosRouter.get('/', (req, res)=>{
    const respuesta = contenedor.getAll();
    if (!respuesta) res.send({error: "producto no encontrado"});
    res.render("productos", {productos: respuesta});
})

productosRouter.post('/', (req, res) =>{
    const {title,price,thumbnail} = req.body;
    contenedor.save({title,price,thumbnail})
    res.redirect('/productos');
})

export {productosRouter}

// DESAFIO ROUTER

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))
*/
//utilizo get

const productoGet = async (req,res) =>{
    try{
        const productosRouter = await contenedor.getAll()
        res.json({
            contenedor:productosRouter
        });
    } catch (error){
        res.send(error)
    }
}

productosRouter.get('/', productoGet);

//utilizo get by id

const productoGetById = async (req, res)=>{
    try{
        let id = req.params.id
        const productoEncontrado = await contenedor.getById(id)
        if (!productoEncontrado){
            return res.status(400).json({
                error : 'No se encontro el producto'
            });
        }
            res.json({productosRouter:productoEncontrado});
        } catch (error) {
            return res.send(error)
        }
    }

productosRouter.get('/:id', productoGetById);

//guardo con post

const productoPost = async (req, res) => {
    try {
        const { title , price, thumbnail} = req.body;
        const nuevoProducto = {
            title, price, thumbnail
        }
        await contenedor.save(nuevoProducto)
        res.json({productosRouter:nuevoProducto})
    } catch (error) {
        return res.send(error)
    }
}

productosRouter.post('/', productoPost);

//actualizo por id

productosRouter.put('/:id', (req, res) => {
    res.json(productos.actualizar(req.body, req.params.id))
})

//borro por id

productosRouter.delete('/:id', (req, res) => {
    res.json(productos.deleteById(req.params.id))
})



// ** SERVER **
const PORT = 8080;
const server = app.listen(8080, () => {
    console.log(`Servidor http esta escuchando en el puerto ${PORT}`)
})

server.on('error', (error) => console.log(error));
