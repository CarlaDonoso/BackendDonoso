const { promises: fs } = require('fs')

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    //obtener todos los datos que ya existen en el archivo
    async save(obj) {
        const objetos = await this.getAll()

        //hacer la logica para obtener el nuevo id, con un condicional
        let newId
        if (objetos.length == 0) {
            newId = 1
        } else {
            newId = objetos[objetos.length -1].id + 1
            /*const ultimoId = (objetos[objetos.lenght - 1].id)
            newId = ultimoId + 1; */
        }
        //agregar el nuevo objeto  al array que existe en el archivo

        const newObj = {...obj, id: newId}
        objetos.push(newObj)
       // objetos.push({ id: newId, ...nuevoObjeto })
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
        const objetos = await this.getAll()
        const eliminado = objetos.find(o => o.id == id)
        return eliminado
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

    guardar(prod) {
        const newProd = { ...prod, id: ++this.id }
        this.productos.push(newProd)
        return newProd
    }

//Filtrar datos para identificar el objeto a eliminar y eliminarlo
    async deleteById(id) {
        /* const nuevoObjeto =objetos.filter(elemento => elemento.id !== id)
        if(nuevoObjeto.lenght === objetos.lenght){
            throw new Error(`Error no se encontro el id ${id}`)
            */
        //otra manera explicada por la profe de resolverlo
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        } 
        objs.splice(index, 1)
        try { await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2)) }
        catch (error) { 
            throw new Error(`Error al borrar: ${error}`) }
    }
    /*
    try {
        await fs.readFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2))
    } catch (error) {
        throw new Error(`Error al borrar ${error}`)
    }
}*/

    async deleteAll() {
        await fs.writeFile(this.ruta, JSON.stringify([], null, 2));

    }

}

module.exports = Contenedor;

/*

//Listo los productos

async function main(){ 

    const listaProductos = new Contenedor('./productos.txt')

let objetos = await listaProductos.getAll();
console.log(objetos);

let objetoId1 = await listaProductos.save(producto1);
console.log(producto1);

let objetoId2 = await listaProductos.save(producto2);
console.log(producto2);

console.log('Busco un producto por su id')
let busquedaId = await listaProductos.getById(objetoId2);
console.log(busquedaId);

let objetoInexistente = await listaProductos.getById(666);
console.log(`listo un producto por id que no existe ${objetoInexistente}`);

let borrarId = await listaProductos.deleteById(objetoId1);
console.log(`Borro un producto por id ${borrarId}`);

await listaProductos.deleteAll();

}

main()
*/