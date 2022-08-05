const { promises: fs } = require('fs')

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(nuevoObjeto) {
        //obtener todos los datos que ya existen en el archivo

        const objetos = await this.getAll()

        //hacer la logica para obtener el nuevo id, con un condicional
        let newId
        if (objetos.length == 0) {
            newId = 1
        } else {
            const ultimoId = (objetos[objetos.lenght - 1].id)
            newId = ultimoId + 1;
        }
        //agregar el nuevo objeto  al array que existe en el archivo

        objetos.push({ id: newId, ...nuevoObjeto })
        //({...nuevoObjeto,id:newId)

        //guardar el nuevo array con el agregado

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getById(id) {
        return ""
    }
    async getAll() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objetos)
        } catch (error) {
            //throw new Error(`Error al leer el archivo: ${error}`)
            return []
        }
    }


    async deleteById(id) {
        const objetos = await this.getAll()

        //Filtrar datos para identificar el objeto a eliminar y eliminarlo
        const nuevoObjeto =objetos.filter(elemento => elemento.id !== id)
        if(nuevoObjeto.lenght === objetos.lenght){
            throw new Error(`Error no se encontro el id ${id}`)

            /* otra manera explicada por la profe de resolverlo
        const objs = await this.getAll()const index = objs.findIndex(o => o.id == id)if (index == -1) {throw new Error(`Error al borrar: no se encontró el id ${id}`)}objs.splice(index, 1)try {await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))} catch (error) {throw new Error(`Error al borrar: ${error}`)}
        */
        }
        try {
            await fs.readFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar ${error}`)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2));
        } catch (error) {
            throw new Error(`Error al borrar todo`)
        }
    }

}

const listaProductos = new Contenedor('./productos.txt')

//Probando el codigo

listaProductos.save({ title: 'Monitor', price: '90000 ARS', thumbnail: 'https://www.lg.com/ar/images/monitores/md07520770/gallery/D_03.jpg', id: '2' })

listaProductos.deleteById(2);
listaProductos.deleteAll();