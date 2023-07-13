import { Plan } from './plan';
import { Usuario } from './usuario';

export class Alumno {
  _id!: string;
  apellido!: string;
  nombre!: string;
  fechaNacimiento!: Date;
  dni!: string;
  email!: string;
  nroCelular!: string;
  domicilio!: string;
  fechaInicio!: string;
  plan!: Plan;
  usuario!: Usuario;
  constructor(
    nombre: string = '',
    apellido: string = '',
    email = '',
    domiclio = '',
    nroCelular = '',
    dni: string = '',
    usuario: Usuario = new Usuario()
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.usuario = usuario;
    this.domicilio = domiclio;
    this.nroCelular = nroCelular;
  }
}
