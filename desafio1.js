
let libros = [
    { title: "Harry Potter", autor: "JK Rowling" },
    { title: "Game of Thrones ", autor: "George R. R. Martin" }
];

class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = [1];
    }
    getFullName = () => {
        console.log(`Holis ${this.nombre} ${this.apellido}`)
    };
    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    };
    countMascotas = () => {
        console.log(this.mascotas);
    };
    getBookNames = () => {
        let bookNames = libros.map((libros) => {
            return `${libros.title}`
        })
        console.log(bookNames);
    }
}


let usuario = new Usuario("Carla", "Donoso");

usuario.getFullName();
usuario.addMascota("Faki");
usuario.countMascotas();
usuario.getBookNames();

