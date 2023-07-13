export class Usuario {
    nombreUsuario!: string;
    password!: string 
    rol!: string
    constructor(nombreUsuario: string= '', password: string= '', rol: string = ''){
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.rol = rol
    }
}
