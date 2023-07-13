import { Usuario } from "./usuario";
export class Entrenador {
    _id!:string;
    apellido!: string;
    nombre!: string;
    fechaNacimiento!: Date;
    dni!: number;
    email!: string;
    nroCelular!: string;
    domicilio!: string;
    usuario!: Usuario 
}
