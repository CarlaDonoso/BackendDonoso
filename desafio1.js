class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = [1];
    }
    getFullName = () => {
        return` ${this.nombre} ${this.apellido}`
    };
    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    };
    countMascotas = () => {
        return this.mascotas;
    };
    getBookNames = () => {
        let bookNames = libros.map((libros) => {
            return `${libros.title}`
        })
        return bookNames;
    }
}

let libros = [
    { title: "Harry Potter", autor: "JK Rowling" },
    { title: "Game of Thrones ", autor: "George R. R. Martin" }
];

let usuario = new Usuario("Carla", "Donoso", [],[]);


usuario.addMascota("Faki");
usuario.getBookNames(libros);

console.log(`Usuario{
    nombre y apellido: ${usuario.getFullName()}
    mascotas: ${usuario.countMascotas()}
    libros:  ${usuario.getBookNames()}
}`);


