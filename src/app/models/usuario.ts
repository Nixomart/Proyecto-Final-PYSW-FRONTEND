import { Rol } from "./rol";

export class Usuario {
    _id!:string;
    nombreUsuario!: string;
    password!: string
    rol!: Rol
    // constructor(_id: string ='',nombreUsuario: string= '', password: string= '', rol: string = ''){
    //   this._id = _id;
    //   this.nombreUsuario = nombreUsuario;
    //     this.password = password;
    //     this.rol = new Rol();
    // }
}
